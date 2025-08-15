import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class UnbanBotCommand extends Command {
    #dbService;
    #config;
    #logger;
    constructor(dbService, config, logger) {
        super('desbanearbot', adminGroupsContent.unbanBot.description);
        this.commands = ['unbanchat', 'desbanearbot', 'desbanearchat', 'desbanchat'];
        this.#dbService = dbService;
        this.#config = config;
        this.#logger = logger;
        this.isGroupOnly = true;
        this.adminOnly = true;
        this.ownerOnly = false;
        this.content = adminGroupsContent.unbanBot;
    }
    async execute(context) {
        const { m, conn, isAdmin, isOwner, isROwner } = context;
        if (!(isAdmin || isOwner || isROwner)) {
            await conn.reply(m.chat, this.content.notAdmin, m);
            return;
        }
        try {
            const chat = await this.#dbService.getChat(m.chat);
            if (chat && !chat.isBanned) {
                await conn.reply(m.chat, this.content.alreadyActive, m);
                return;
            }
            await this.#dbService.updateChat(m.chat, { isBanned: false });
            await conn.reply(m.chat, this.content.success, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al activar bot en chat: ${e.message}`);
            await conn.reply(m.chat, this.content.error, m);
            await m.react('✖️');
        }
    }
}
export default UnbanBotCommand;
//# sourceMappingURL=UnbanBotCommand.js.map