// src/handlers/MessageHandler.js
import { getContentType, jidNormalizedUser } from '@whiskeysockets/baileys';
import { ProcessTextCommand } from '../commands/ProcessTextCommand.js';
import Metrics from '../utils/Metrics.js';
export default ;
export class MessageHandler {
    #config;
    #logger;
    #errorHandler;
    #commandBus;
    #rateLimiter;
    #breaker;
    #permValidator;
    #aiInterventionService;
    #userManager;
    #groupManager;
    #chatManager;
    #aiService;
    #pluginLoader;
    #dbService;
    #notificationService;
    #cache;
    #printEvent;
    constructor(config, logger, errorHandler, commandBus, rateLimiter, breaker, permValidator, aiInterventionService, userManager, groupManager, chatManager, aiService, pluginLoader, dbService, notificationService, cache, printEvent) {
        this.#config = config;
        this.#logger = logger;
        this.#errorHandler = errorHandler;
        this.#commandBus = commandBus;
        this.#rateLimiter = rateLimiter;
        this.#breaker = breaker;
        this.#permValidator = permValidator;
        this.#aiInterventionService = aiInterventionService;
        this.#userManager = userManager;
        this.#groupManager = groupManager;
        this.#chatManager = chatManager;
        this.#aiService = aiService;
        this.#pluginLoader = pluginLoader;
        this.#dbService = dbService;
        this.#notificationService = notificationService;
        this.#cache = cache;
        this.#printEvent = printEvent;
        // ¡IMPORTANTE! Asignar el procesador de trabajos a la cola
        // La jobQueue se inyecta en app.js y se le asigna este procesador
        // this.jobQueue.processor = this._processJob.bind(this);
    }
    /**
     * Punto de entrada principal para todos los mensajes.
     * Su única responsabilidad es construir el contexto y añadirlo a la cola de trabajos.
     */
    async handle(event, sock) {
        const correlationId = this.#errorHandler.startCorrelation();
        if (!event || !event.messages || event.messages.length === 0) {
            this.#errorHandler.endCorrelation(correlationId);
            return;
        }
        const message = event.messages[0];
        if (message.key.fromMe || event.type !== 'notify') {
            this.#errorHandler.endCorrelation(correlationId);
            return;
        }
        try {
            const context = await this._buildContext(message, sock, correlationId);
            if (!context) {
                this.#logger.warn({ correlationId, msgId: message.key.id }, 'Contexto no pudo ser construido. Ignorando mensaje.');
                return;
            }
            // En lugar de procesar, añadimos el contexto a la cola.
            // Asumimos que jobQueue ya está disponible en el contexto o se inyecta de otra forma.
            // Si MessageHandler es resuelto por el contenedor, jobQueue será una de sus dependencias.
            this.#pluginLoader.getDependencies().jobQueue.add(context);
        }
        catch (err) {
            this.#errorHandler.handleError(err, { context: 'MessageHandler.handle (fase de encolado)', correlationId, msgId: message.key.id });
            Metrics.errorsTotalCounter.inc({ context: 'message_handler_enqueue' });
        }
        finally {
            this.#errorHandler.endCorrelation(correlationId);
        }
    }
    /**
     * Esta función es ejecutada por la JobQueue para cada trabajo.
     * Contiene la lógica de procesamiento que antes estaba en handle().
     * @private
     */
    async _processJob(context) {
        try {
            if (this._shouldIgnore(context)) {
                this.#logger.debug(`Trabajo ignorado para ${context.user.jid} en ${context.chat.id} (criterios de ignorado).`);
                return;
            }
            await this.#rateLimiter.consume(context.user.jid);
            Metrics.messagesReceivedCounter.inc();
            if (context.isCommand) {
                // En lugar de llamar a un manejador, despachamos un comando
                await this.#commandBus.dispatch(new ProcessTextCommand(context));
            }
            else {
                await this._handleAutonomousAI(context);
            }
        }
        catch (err) {
            this.#errorHandler.handleError(err, { context: 'MessageHandler._processJob', correlationId: context.correlationId, msgId: context.message.key.id });
            await this._safeReply(context.sock, context.chat.id, '🤖 Fallo interno, inténtalo más tarde.', context.message);
            Metrics.errorsTotalCounter.inc({ context: 'message_handler_process_job' });
        }
    }
    async _buildContext(message, sock, correlationId) {
        try {
            const chatId = message.key.remoteJid;
            const userJid = jidNormalizedUser(message.key.participant || chatId);
            const isGroup = chatId.endsWith('@g.us');
            const type = message.message ? getContentType(message.message) : 'unknown';
            const text = this._extractText(message, type) || '';
            let sentiment = 'neutral';
            try {
                sentiment = await this.#aiService.analyzeSentiment(text);
            }
            catch (err) {
                this.#logger.warn({ err, correlationId }, 'Fallo al analizar el sentimiento del texto.');
            }
            let groupMetadata = null;
            if (isGroup) {
                try {
                    groupMetadata = await sock.groupMetadata(chatId);
                }
                catch (err) {
                    this.#logger.error({ err, correlationId, chatId }, '❌ Error al obtener metadatos del grupo. Continuando sin ellos.');
                }
            }
            let audioBufferBase64 = null;
            let audioMimeType = null;
            if (type === 'audioMessage' && message.message?.audioMessage) {
                try {
                    const { downloadMediaMessage } = await import('@whiskeysockets/baileys');
                    const bufferResult = await downloadMediaMessage(message, 'buffer', {}, { logger: this.#logger });
                    if (bufferResult) {
                        audioBufferBase64 = bufferResult.toString('base64');
                        audioMimeType = message.message.audioMessage.mimetype;
                    }
                }
                catch (err) {
                    this.#logger.error({ err, correlationId, msgId: message.key.id }, '❌ Error al descargar audio.');
                }
            }
            const [userDataResult, groupDataResult, chatDataResult] = await Promise.allSettled([
                this.#userManager.getUser(userJid, message.pushName),
                isGroup ? this.#groupManager.getGroup(chatId, groupMetadata) : Promise.resolve(null),
                this.#chatManager.getChat(chatId),
            ]);
            const userData = userDataResult.status === 'fulfilled' ? userDataResult.value : { jid: userJid, name: message.pushName || 'Desconocido', role: 'user' };
            const groupData = groupDataResult.status === 'fulfilled' ? groupDataResult.value : null;
            const chatData = chatDataResult.status === 'fulfilled' ? chatDataResult.value : {};
            const { command, args, isCommand } = this._parseCommand(text);
            if (!isGroup && chatData?.proactive_message_level > 0) {
                await this.#chatManager.updateChat(chatId, { proactive_message_level: 0 });
                this.#logger.debug(`Nivel proactivo reseteado para ${chatId}.`);
            }
            return {
                sock, message, user: { ...userData }, group: groupData, chat: { ...chatData }, isGroup,
                messageText: text, messageType: type, isCommand, command, args, correlationId, sentiment,
                audioBufferBase64, audioMimeType,
                reply: (txt, opts) => sock.sendMessage(chatId, { text: String(txt) }, { quoted: message, ...opts }),
                pluginLoader: this.#pluginLoader, userManager: this.#userManager, groupManager: this.#groupManager,
                chatManager: this.#chatManager, aiService: this.#aiService, config: this.#config, db: this.#dbService,
                notificationService: this.#notificationService,
            };
        }
        catch (err) {
            this.#errorHandler.handleError(err, { context: 'MessageHandler._buildContext', correlationId, msgId: message?.key?.id });
            Metrics.errorsTotalCounter.inc({ context: 'message_handler_build_context' });
            return null;
        }
    }
    _extractText(msg, type) {
        if (!msg || !msg.message)
            return '';
        const messageContentMap = {
            conversation: msg.message.conversation,
            extendedTextMessage: msg.message.extendedTextMessage?.text,
            imageMessage: msg.message.imageMessage?.caption,
            videoMessage: msg.message.videoMessage?.caption,
            documentMessage: msg.message.documentMessage?.fileName,
        };
        return messageContentMap[type] || '';
    }
    _shouldIgnore({ user, isGroup, group, chat }) {
        if (user?.isBanned)
            return true;
        if (isGroup && !group?.isBotEnabled)
            return true;
        if (!isGroup && chat?.isBotMuted)
            return true;
        return false;
    }
    _parseCommand(text = '') {
        if (!text.startsWith(this.#config.prefix))
            return { isCommand: false };
        const [cmd, ...rest] = text.slice(this.#config.prefix.length).trim().split(/ +/);
        return { isCommand: true, command: cmd.toLowerCase(), args: rest };
    }
    async _handleAutonomousAI(context) {
        const { chat, isGroup, user, sock, message, sentiment, correlationId } = context;
        const enabled = isGroup ? context.group?.isAiEnabled : context.chat?.isAiEnabled;
        if (!enabled)
            return;
        if (sentiment === 'negative') {
            await context.reply('Lo siento, parece que no te encuentras bien. ¿Necesitas ayuda?');
            Metrics.errorsTotalCounter.inc({ context: 'ai_moderation_negative_sentiment' });
            return;
        }
        const cacheKey = `ai:${context.messageText}`;
        if (this.#cache.has(cacheKey)) {
            await context.reply(this.#cache.get(cacheKey));
            // Metrics.increment('cache.ai'); // No hay métrica específica para cache hits en Metrics.js
            return;
        }
        if (!this.#breaker.ok()) {
            this.#logger.warn(`CircuitBreaker está en estado OPEN para la IA. Bloqueando petición de ${user.jid}.`);
            // Solo enviar el mensaje una vez para no spamear
            if (this.#breaker.lastWarningSent < Date.now() - 60000) { // Enviar advertencia max 1 vez por minuto
                await context.reply('🧠 El servicio de IA está experimentando problemas y se encuentra temporalmente desactivado. Por favor, inténtalo de nuevo en unos minutos.');
                this.#breaker.lastWarningSent = Date.now();
            }
            Metrics.errorsTotalCounter.inc({ context: 'ai_circuit_breaker_open' });
            return;
        }
        if (isGroup && !(await this.#aiInterventionService.shouldIntervene(context)))
            return;
        try {
            if (!isGroup) {
                try {
                    const reactionKey = { remoteJid: message.key.remoteJid, id: message.key.id, fromMe: message.key.fromMe, participant: message.key.participant || sock.user.id };
                    await sock.sendMessage(chat.id, { react: { text: '🧠', key: reactionKey } });
                }
                catch (e) {
                    this.#logger.error({ err: e, correlationId }, '❌ IA: Error al enviar reacción inicial.');
                    Metrics.errorsTotalCounter.inc({ context: 'ai_reaction_initial_send_error' });
                }
            }
            const aiResponse = await this.#breaker.fire(() => this.#aiService.generateResponse(context));
            if (aiResponse && aiResponse.text) {
                this.#cache.set(cacheKey, aiResponse.text, 600000);
                await context.reply(aiResponse.text);
            }
            else {
                this.#logger.warn({ correlationId }, 'AI: generateResponse no devolvió texto válido.');
                await context.reply('No pude generar una respuesta de IA en este momento.');
                Metrics.errorsTotalCounter.inc({ context: 'ai_empty_response' });
            }
            if (aiResponse && aiResponse.reaction) {
                try {
                    const reactionKey = { remoteJid: message.key.remoteJid, id: message.key.id, fromMe: message.key.fromMe, participant: message.key.participant || sock.user.id };
                    await sock.sendMessage(chat.id, { react: { text: aiResponse.reaction, key: reactionKey } });
                }
                catch (e) {
                    this.#logger.error({ err: e, correlationId }, '❌ IA: Error al enviar reacción final.');
                    Metrics.errorsTotalCounter.inc({ context: 'ai_reaction_final_send_error' });
                }
            }
        }
        catch (err) {
            this.#errorHandler.handleError(err, { context: 'MessageHandler._handleAutonomousAI', correlationId });
            await context.reply('Lo siento, estoy teniendo problemas para procesar tu solicitud de IA.');
            Metrics.errorsTotalCounter.inc({ context: 'ai_autonomous_handle_error' });
        }
    }
    async _safeReply(sock, jid, text, message) {
        try {
            await sock.sendMessage(jid, { text }, { quoted: message });
        }
        catch (err) {
            this.#logger.warn({ err }, 'Fallo enviando reply');
            Metrics.errorsTotalCounter.inc({ context: 'safe_reply_error' });
        }
    }
}
//# sourceMappingURL=MessageHandler.js.map