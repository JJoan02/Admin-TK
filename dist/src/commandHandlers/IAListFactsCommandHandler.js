// src/commandHandlers/IAListFactsCommandHandler.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
export class IAListFactsCommandHandler {
    #memoryService;
    constructor(memoryService) {
        this.#memoryService = memoryService;
    }
    async handle(command) {
        const { context } = command;
        const { reply, chat } = context;
        try {
            const facts = await this.#memoryService.getFactsForChat(chat.id);
            if (facts && facts.length > 0) {
                let responseText = 'Hechos aprendidos sobre este chat:\n';
                facts.forEach(fact => {
                    responseText += `- *${fact.fact_key}*: ${fact.fact_value}\n`;
                });
                reply(responseText.trim());
            }
            else {
                reply('No he aprendido ningún hecho específico sobre este chat aún.');
            }
        }
        catch (error) {
            logger.error({ err: error }, '❌ IA: Error al listar los hechos aprendidos.');
            reply('❌ Ocurrió un error al intentar listar los hechos.');
        }
    }
}
export default IAListFactsCommandHandler;
//# sourceMappingURL=IAListFactsCommandHandler.js.map