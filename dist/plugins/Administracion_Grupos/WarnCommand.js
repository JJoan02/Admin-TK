import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class WarnCommand extends Command {
    #dbService;
    #config;
    #logger;
    constructor(dbService, config, logger) {
        super('warn', adminGroupsContent.warn.description);
        this.#dbService = dbService;
        this.#config = config;
        this.#logger = logger;
        this.isGroupOnly = true;
        this.adminOnly = true;
        this.botAdmin = true;
        this.content = adminGroupsContent.warn;
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
            await conn.reply(m.chat, this.content.noTarget(usedPrefix, command), m);
            return;
        }
        if (this.#config.ownerJids.includes(targetUserJid)) {
            await conn.reply(m.chat, this.content.cantWarnOwner, m);
            return;
        }
        try {
            const user = await this.#dbService.getUser(targetUserJid);
            if (!user) {
                await conn.reply(m.chat, this.content.userNotFound(targetUserJid.split('@')[0]), m);
                return;
            }
            const dReason = 'Sin motivo';
            const reason = text ? text.replace(/@\d+-?\d* /g, '').trim() : dReason;
            const newWarnCount = (user.warnings || 0) + 1;
            await this.#dbService.updateUser(targetUserJid, { warnings: newWarnCount });
            await conn.reply(m.chat, this.content.warnMessage(targetUserJid.split('@')[0], reason, newWarnCount), m, { mentions: [targetUserJid] });
            if (newWarnCount >= 4) {
                await this.#dbService.updateUser(targetUserJid, { warnings: 0 });
                await conn.reply(m.chat, this.content.kickMessage(targetUserJid.split('@')[0]), m, { mentions: [targetUserJid] });
                if (this.botAdmin) {
                    await conn.groupParticipantsUpdate(m.chat, [targetUserJid], 'remove');
                }
                else {
                    this.#logger.warn(this.content.botNotAdmin(targetUserJid));
                }
            }
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al advertir usuario: ${e.message}`);
            await conn.reply(m.chat, this.content.error, m);
            await m.react('✖️');
        }
    }
}
export default WarnCommand;
//# sourceMappingURL=WarnCommand.js.map