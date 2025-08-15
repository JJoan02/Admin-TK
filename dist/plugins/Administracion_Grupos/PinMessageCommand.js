import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class PinMessageCommand extends Command {
    #logger;
    constructor(logger) {
        super('pin', adminGroupsContent.pinMessage.description);
        this.#logger = logger;
        this.isGroupOnly = true;
        this.adminOnly = true;
        this.botAdmin = true;
        this.content = adminGroupsContent.pinMessage;
    }
    async execute(context) {
        const { m, conn, command } = context;
        if (!m.quoted) {
            const action = command === 'pin' || command === 'fijar' ? 'fijarlo' : 'desfijarlo';
            await conn.reply(m.chat, this.content.noQuoted(action), m);
            return;
        }
        try {
            const messageKey = {
                remoteJid: m.chat,
                fromMe: m.quoted.fromMe,
                id: m.quoted.id,
                participant: m.quoted.sender,
            };
            switch (command) {
                case 'pin':
                case 'fijar':
                    await conn.sendMessage(m.chat, { pin: messageKey, type: 1, time: 604800 });
                    await m.react("✅️");
                    break;
                case 'unpin':
                case 'desfijar':
                    await conn.sendMessage(m.chat, { pin: messageKey, type: 2, time: 86400 });
                    await m.react("✅️");
                    break;
                case 'destacar':
                    await conn.sendMessage(m.chat, { keep: messageKey, type: 1, time: 15552000 });
                    await m.react("✅️");
                    break;
                case 'desmarcar':
                    await conn.sendMessage(m.chat, { keep: messageKey, type: 2, time: 86400 });
                    await m.react("✅️");
                    break;
                default:
                    await conn.reply(m.chat, this.content.unrecognized, m);
                    await m.react('✖️');
                    break;
            }
        }
        catch (e) {
            this.#logger.error(`Error al ejecutar ${command}: ${e.message}`);
            await conn.reply(m.chat, this.content.error(command), m);
            await m.react('✖️');
        }
    }
}
export default PinMessageCommand;
//# sourceMappingURL=PinMessageCommand.js.map