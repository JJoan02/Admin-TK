// src/commandHandlers/IACommandHandler.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
export class IACommandHandler {
    #aiService;
    constructor(aiService) {
        this.#aiService = aiService;
    }
    async handle(command) {
        const { context } = command;
        const { reply, sock, message } = context;
        const reactionKey = {
            remoteJid: message.key.remoteJid,
            id: message.key.id,
            fromMe: message.key.fromMe,
            participant: context.isGroup ? message.key.participant : sock.user.id,
        };
        try {
            await sock.sendMessage(context.chat.id, { react: { text: '🧠', key: reactionKey } });
            const { text: aiResponse, reaction: aiReaction } = await this.#aiService.generateResponse(context);
            if (aiResponse) {
                await reply(aiResponse);
            }
            else {
                reply('❌ Admin-TK no pudo generar una respuesta.');
            }
            if (aiReaction) {
                await sock.sendMessage(context.chat.id, { react: { text: aiReaction, key: reactionKey } });
            }
        }
        catch (e) {
            logger.error({ err: e }, '❌ IA: Error en el flujo del comando IA.');
            reply('❌ Ocurrió un error al procesar tu solicitud con la IA.');
        }
    }
}
export default IACommandHandler;
//# sourceMappingURL=IACommandHandler.js.map