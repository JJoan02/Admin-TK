// src/commands/ToUrlCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para subir un archivo a un servicio de hosting y obtener la URL.
 */
export class ToUrlCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     */
    constructor(context) {
        super();
        this.context = context;
    }
}
//# sourceMappingURL=ToUrlCommand.js.map