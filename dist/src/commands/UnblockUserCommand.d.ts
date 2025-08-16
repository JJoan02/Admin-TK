import { Command } from '../core/CommandBus.js';
/**
 * Comando para desbloquear a un usuario.
 */
export declare class UnblockUserCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     * @param {string} targetJid - El JID del usuario a desbloquear.
     */
    constructor(context: any, targetJid: any);
}
//# sourceMappingURL=UnblockUserCommand.d.ts.map