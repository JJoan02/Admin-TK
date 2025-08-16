// src/commands/ProcessTextCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para procesar un mensaje de texto que podría ser un comando del bot.
 */
export class ProcessTextCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=ProcessTextCommand.js.map