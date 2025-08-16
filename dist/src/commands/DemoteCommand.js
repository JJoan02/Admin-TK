// src/commands/DemoteCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para degradar a un administrador a miembro.
 */
export class DemoteCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=DemoteCommand.js.map