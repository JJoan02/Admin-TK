// src/commandHandlers/IAListPersonalityCommandHandler.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
export class IAListPersonalityCommandHandler {
    #chatManager;
    constructor(chatManager) {
        this.#chatManager = chatManager;
    }
    async handle(command) {
        const { context } = command;
        const { reply, chat } = context;
        try {
            const chatData = await this.#chatManager.getChat(chat.id);
            const personality = chatData?.personality_profile;
            if (personality) {
                reply(`Mi personalidad actual en este chat es: *${personality}*.`);
            }
            else {
                reply('No hay una personalidad específica configurada para este chat. Estoy usando mi personalidad por defecto.');
            }
        }
        catch (error) {
            logger.error({ err: error }, '❌ IA: Error al listar la personalidad del chat.');
            reply('❌ Ocurrió un error al intentar listar mi personalidad.');
        }
    }
}
export default IAListPersonalityCommandHandler;
//# sourceMappingURL=IAListPersonalityCommandHandler.js.map