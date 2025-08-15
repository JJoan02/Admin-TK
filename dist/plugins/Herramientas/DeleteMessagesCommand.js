import { Command } from '../../core/Command.js';
import { deleteMessages } from '../../lib/herramientas-content.js';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
class DeleteMessagesCommand extends Command {
    #logger;
    constructor(logger) {
        super('del', 'Elimina mensajes en el chat. Uso: !del (respondiendo a un mensaje) o !del @mencion');
        this.#logger = logger;
        this.commands = ['del', 'delete'];
        this.groupOnly = true;
        this.adminOnly = true;
        this.botAdmin = true;
    }
    async execute(context) {
        const { m, conn, args } = context;
        if (!m.quoted && !m.mentionedJid?.length && !args[0]) {
            await conn.reply(m.chat, deleteMessages.noTarget, m);
            return;
        }
        try {
            if (m.quoted) {
                let delet = m.quoted.sender;
                let bang = m.quoted.id;
                return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            }
            let target = '';
            let targetType = '';
            let targetValue = '';
            if (m.mentionedJid?.length) {
                target = m.mentionedJid[0];
                targetType = 'mention';
                targetValue = conn.getName(target);
            }
            else if (args[0] && args[0].startsWith('+')) {
                target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                targetType = 'number';
                targetValue = args[0];
            }
            else {
                await conn.reply(m.chat, deleteMessages.mentionOrReplyRequired, m);
                return;
            }
            let chats = await conn.chats[m.chat]?.messages || [];
            let messagesToDelete = Object.values(chats).filter(msg => (msg.key.participant === target || msg.key.remoteJid === target));
            if (!messagesToDelete.length) {
                await conn.reply(m.chat, deleteMessages.noRecentMessages, m);
                return;
            }
            let totalToDelete = Math.min(messagesToDelete.length, 200);
            let deletedCount = 0;
            for (let i = 0; i < totalToDelete; i++) {
                let message = messagesToDelete[i];
                try {
                    await conn.sendMessage(m.chat, { delete: message.key });
                    deletedCount++;
                    await delay(100);
                }
                catch (err) {
                    this.#logger.error(`Error al eliminar un mensaje: ${err.message}`);
                }
            }
            await conn.reply(m.chat, deleteMessages.success(deletedCount, targetType, targetValue), m);
        }
        catch (err) {
            this.#logger.error(`Error general al eliminar mensajes: ${err.message}`);
            await conn.reply(m.chat, deleteMessages.error, m);
        }
    }
}
export default DeleteMessagesCommand;
//# sourceMappingURL=DeleteMessagesCommand.js.map