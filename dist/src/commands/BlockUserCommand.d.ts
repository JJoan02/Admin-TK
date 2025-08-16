import { Command } from '../core/CommandBus.js';
/**
 * Comando para bloquear a un usuario.
 */
export declare class BlockUserCommand extends Command {
    /**
     * @param {object} context - El objeto de contexto completo del MessageHandler.
     * @param {string} targetJid - El JID del usuario a bloquear.
     */
    constructor(context: any, targetJid: any);
}
//# sourceMappingURL=BlockUserCommand.d.ts.map