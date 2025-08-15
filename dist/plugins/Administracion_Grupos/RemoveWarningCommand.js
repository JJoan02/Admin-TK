import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class RemoveWarningCommand extends Command {
    #dbService;
    #config;
    #logger;
    constructor(dbService, config, logger) {
        super('delwarn', adminGroupsContent.removeWarning.description);
        this.#dbService = dbService;
        this.#config = config;
        this.#logger = logger;
        this.isGroupOnly = true;
        this.adminOnly = true;
        this.botAdmin = true;
        this.content = adminGroupsContent.removeWarning;
    }
    async execute(context) {
        const { m, conn, text, mentionedJid, usedPrefix, command } = context;
        let targetUserJid = null;
        if (mentionedJid && mentionedJid[0]) {
            targetUserJid = mentionedJid[0];
        }
        else if (m.quoted && m.quoted.sender) {
            targetUserJid = m.quoted.sender;
        }
        else if (text) {
            const numberMatch = text.match(/\d{10,15}/);
            if (numberMatch) {
                targetUserJid = numberMatch[0] + '@s.whatsapp.net';
            }
        }
        if (!targetUserJid) {
            await conn.reply(m.chat, this.content.noTarget(global.lenguajeTK.smsMalused3(), usedPrefix, command), m);
            return;
        }
        try {
            const user = await this.#dbService.getUser(targetUserJid);
            if (!user) {
                await conn.reply(m.chat, this.content.userNotFound(targetUserJid.split('@')[0]), m);
                return;
            }
            if (user.warnings === undefined || user.warnings <= 0) {
                await conn.reply(m.chat, this.content.noWarnings(targetUserJid.split('@')[0]), m);
                return;
            }
            const newWarnCount = user.warnings - 1;
            await this.#dbService.updateUser(targetUserJid, { warnings: newWarnCount });
            const successMessage = this.content.success(targetUserJid.split('@')[0], newWarnCount, global.lenguajeTK.smsAdveu10(), global.lenguajeTK.smsAdveu5(), global.lenguajeTK.smsAdveu11(), global.lenguajeTK.smsAdveu12());
            await conn.reply(m.chat, successMessage, m, { mentions: [targetUserJid] });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al eliminar advertencia: ${e.message}`);
            const errorMessage = this.content.error(global.lenguajeTK.smsMalError3(), global.lenguajeTK.smsMensError2(), usedPrefix, command, global.wm);
            await conn.reply(m.chat, errorMessage, m);
            await m.react('✖️');
        }
    }
}
export default RemoveWarningCommand;
//# sourceMappingURL=RemoveWarningCommand.js.map