// src/commands/SetWelcomeCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para establecer el mensaje de bienvenida de un grupo.
 */
export class SetWelcomeCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=SetWelcomeCommand.js.map