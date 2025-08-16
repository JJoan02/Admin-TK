// src/commands/SetAIModeOffCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para desactivar el modo IA en un chat/grupo.
 */
export class SetAIModeOffCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=SetAIModeOffCommand.js.map