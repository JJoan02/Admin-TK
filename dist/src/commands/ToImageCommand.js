// src/commands/ToImageCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para convertir un sticker a imagen.
 */
export class ToImageCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=ToImageCommand.js.map