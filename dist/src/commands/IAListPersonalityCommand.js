// src/commands/IAListPersonalityCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para listar la personalidad de la IA en un chat.
 */
export class IAListPersonalityCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=IAListPersonalityCommand.js.map