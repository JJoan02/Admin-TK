// src/handlers/GroupHandler.js
import { WAMessageStubType } from '@whiskeysockets/baileys';
import { getBuffer } from '../utils/helpers.js';
import path from 'path';
import fs from 'fs/promises';
import { ApiError } from '../core/ErrorHandler.js';
export class GroupHandler {
    #groupManager;
    #logger;
    #config;
    #errorHandler;
    constructor(groupManager, logger, config, errorHandler) {
        this.#groupManager = groupManager;
        this.#logger = logger;
        this.#config = config;
        this.#errorHandler = errorHandler;
    }
    /**
     * Envía un mensaje de bienvenida a un nuevo participante del grupo.
     * @private
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
     * @param {string} chatId - El JID del grupo.
     * @param {string} participantJid - El JID del participante que se unió.
     * @param {string} groupSubject - El nombre del grupo.
     * @param {string} welcomeMessageTemplate - La plantilla del mensaje de bienvenida.
     */
    async #sendWelcomeMessage(sock, chatId, participantJid, groupSubject, welcomeMessageTemplate) {
        const participantName = await sock.getName(participantJid) || `@${participantJid.split('@')[0]}`;
        const welcomeText = welcomeMessageTemplate
            .replace(/{user}/g, participantName)
            .replace(/{group}/g, groupSubject);
        let imgBuffer;
        const defaultRemoteFallback = 'https://qu.ax/TJkec.jpg'; // Fallback remota
        const localFallbackPath = path.resolve(process.cwd(), 'tmp', 'welcome_fallback.png'); // Local fallback
        try {
            // Intentar obtener la PFP del usuario
            const ppUrl = await sock.profilePictureUrl(participantJid, 'image').catch(() => null);
            if (ppUrl) {
                const result = await getBuffer(ppUrl);
                if (result?.data)
                    imgBuffer = result.data;
            }
        }
        catch (err) {
            this.#logger.warn(`Error obteniendo PFP para ${participantJid}: ${err.message}`);
            this.#errorHandler.handleError(err, { context: 'GroupHandler.#sendWelcomeMessage - PFP', participantJid });
        }
        // Si no se obtuvo PFP, intentar fallback remota
        if (!imgBuffer) {
            try {
                const result = await getBuffer(defaultRemoteFallback);
                if (result?.data)
                    imgBuffer = result.data;
            }
            catch (err) {
                this.#logger.warn(`Error descargando fallback remota: ${err.message}`);
                this.#errorHandler.handleError(err, { context: 'GroupHandler.#sendWelcomeMessage - Remote Fallback' });
            }
        }
        // Si aún no hay imagen, intentar fallback local
        if (!imgBuffer) {
            try {
                // Asegurarse de que el directorio tmp exista
                await fs.mkdir(path.dirname(localFallbackPath), { recursive: true });
                // Crear un placeholder si no existe
                try {
                    await fs.access(localFallbackPath);
                }
                catch {
                    this.#logger.info(`Creando imagen de bienvenida local de fallback en ${localFallbackPath}`);
                    // Crear una imagen PNG simple (cuadrado blanco)
                    const Jimp = (await import('jimp')).default;
                    const image = new Jimp(256, 256, 0xFFFFFFFF); // Blanco
                    await image.writeAsync(localFallbackPath);
                }
                const result = await getBuffer(localFallbackPath);
                if (result?.data)
                    imgBuffer = result.data;
            }
            catch (err) {
                this.#logger.error(`Error leyendo fallback local: ${err.message}`);
                this.#errorHandler.handleError(err, { context: 'GroupHandler.#sendWelcomeMessage - Local Fallback' });
            }
        }
        const messageOptions = {
            text: welcomeText,
            mentions: [participantJid],
        };
        if (imgBuffer) {
            messageOptions.image = imgBuffer;
            messageOptions.caption = welcomeText; // Usar el texto como caption si hay imagen
            delete messageOptions.text; // Eliminar la propiedad text si se usa caption
        }
        try {
            await sock.sendMessage(chatId, messageOptions);
            this.#logger.info(`✅ Mensaje de bienvenida enviado a ${participantJid} en ${groupSubject}.`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'GroupHandler.#sendWelcomeMessage - SendMessage', participantJid });
            throw new ApiError(`Error al enviar mensaje de bienvenida a ${participantJid}.`, error);
        }
    }
    /**
     * Maneja las actualizaciones de participantes en un grupo.
     * @param {object} event - El objeto del evento de Baileys ({ id, participants, action, messageStubType }).
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
     */
    async handleParticipantUpdate(event, sock) {
        const { id, participants, action, messageStubType } = event;
        try {
            const group = await this.#groupManager.getGroup(id);
            if (!group || !group.isBotEnabled) {
                this.#logger.debug(`🔇 Evento de participante ignorado en grupo ${id} (bot desactivado).`);
                return;
            }
            const participantJid = participants[0];
            const participantName = await sock.getName(participantJid) || `@${participantJid.split('@')[0]}`;
            if (action === 'remove' && participantJid.startsWith(this.#config.botNumber.split('@')[0])) {
                this.#logger.warn(`🤖 El bot ha sido eliminado del grupo ${group.subject || id}. Limpiando datos...`);
                await this.#groupManager.removeGroup(id);
                return;
            }
            // Lógica para el mensaje de bienvenida (solo para 'add' y stubType específico)
            if (action === 'add' && group.welcomeMessage && messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
                await this.#sendWelcomeMessage(sock, id, participantJid, group.subject, group.welcomeMessage);
                return; // Ya manejado, salir
            }
            // Lógica para otros tipos de acciones (promote, demote, etc.)
            switch (action) {
                case 'add': // Si no fue manejado por el welcome message (ej. stubType diferente)
                    this.#logger.info(`➕ Usuario ${participantJid} añadido al grupo ${id}.`);
                    // Si no hay welcomeMessage configurado, o si el stubType no es el esperado,
                    // se podría enviar un mensaje de texto simple aquí si se desea.
                    break;
                case 'remove':
                    this.#logger.info(`➖ Usuario ${participantJid} eliminado del grupo ${id}.`);
                    if (group.goodbyeMessage) {
                        const goodbyeText = group.goodbyeMessage
                            .replace(/{user}/g, participantName)
                            .replace(/{group}/g, group.subject);
                        await sock.sendMessage(id, { text: goodbyeText });
                    }
                    break;
                case 'promote':
                    this.#logger.info(`⬆️ Usuario ${participantJid} promovido a admin en el grupo ${id}.`);
                    break;
                case 'demote':
                    this.#logger.info(`⬇️ Usuario ${participantJid} degradado a miembro en el grupo ${id}.`);
                    break;
            }
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'GroupHandler.handleParticipantUpdate', event });
            throw new Error('Fallo al manejar la actualización de participantes del grupo.', error);
        }
    }
    /**
     * Maneja las actualizaciones de los metadatos de un grupo.
     * @param {Array<object>} updates - Un array con las actualizaciones del grupo.
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
     */
    async handleGroupUpdate(updates, sock) {
        for (const update of updates) {
            const { id } = update;
            try {
                const group = await this.#groupManager.getGroup(id);
                if (!group || !group.isBotEnabled) {
                    this.#logger.debug(`🔇 Evento de actualización de grupo ignorado en ${id} (bot desactivado).`);
                    return;
                }
                const newMetadata = await sock.groupMetadata(id);
                await this.#groupManager.syncGroup(id, newMetadata);
                if (update.subject) {
                    this.#logger.info(`✏️ El nombre del grupo ${id} cambió a: ${update.subject}`);
                }
            }
            catch (error) {
                this.#errorHandler.handleError(error, { context: 'GroupHandler.handleGroupUpdate', update });
                throw new Error('Fallo al manejar la actualización de metadatos del grupo.', error);
            }
        }
    }
}
export default GroupHandler;
//# sourceMappingURL=GroupHandler.js.map