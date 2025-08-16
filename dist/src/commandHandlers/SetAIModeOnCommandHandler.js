// src/commandHandlers/SetAIModeOnCommandHandler.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import Auth from '../utils/auth.js';
export class SetAIModeOnCommandHandler {
    #groupManager;
    #chatManager;
    constructor(groupManager, chatManager) {
        this.#groupManager = groupManager;
        this.#chatManager = chatManager;
    }
    async handle(command) {
        const { context } = command;
        const { reply, args, chat, isGroup, user } = context;
        if (args[0].toLowerCase() !== 'ia' && args[0].toLowerCase() !== 'ai') {
            return reply('⚠️ Modo desconocido. El único modo disponible actualmente es "ia".');
        }
        // Lógica de permisos
        if (isGroup) {
            if (!Auth.isGroupAdmin(user.role) && !Auth.isOwner(user.role)) {
                return reply('❌ Solo los administradores del grupo o el dueño del bot pueden activar el modo IA en grupos.');
            }
        }
        else {
            if (!Auth.isUser(user.role) && !Auth.isOwner(user.role)) {
                return reply('❌ Solo los usuarios o el dueño del bot pueden activar el modo IA en chats privados.');
            }
        }
        try {
            if (isGroup) {
                await this.#groupManager.updateGroup(chat.id, { isAiEnabled: true });
                reply('🤖 ¡Modo IA autónomo ACTIVADO en este grupo!');
                logger.info(`🤖 IA: Modo autónomo activado en grupo ${chat.id}.`);
            }
            else {
                await this.#chatManager.updateChat(chat.id, { isAiEnabled: true });
                reply('🤖 ¡Modo IA autónomo ACTIVADO en este chat!');
                logger.info(`🤖 IA: Modo autónomo activado en chat privado ${chat.id}.`);
            }
        }
        catch (error) {
            logger.error({ err: error }, '❌ Error al activar el modo IA autónomo.');
            reply('❌ Ocurrió un error al intentar activar el modo IA.');
        }
    }
}
export default SetAIModeOnCommandHandler;
//# sourceMappingURL=SetAIModeOnCommandHandler.js.map