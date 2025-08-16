// src/commands/UnblockUserCommand.js
import { Command } from '../core/CommandBus.js';
/**
 * Comando para desbloquear a un usuario.
 */
export class UnblockUserCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     * @param {string} targetJid - El JID del usuario a desbloquear.
     */
    constructor(context, targetJid) {
        super();
        this.context = context;
        this.targetJid = targetJid;
    }
}
//# sourceMappingURL=UnblockUserCommand.js.map