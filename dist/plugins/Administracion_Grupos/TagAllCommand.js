import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class TagAllCommand extends Command {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        super('tagall', adminGroupsContent.tagAll.description);
        this.#dbService = dbService;
        this.#logger = logger;
        this.isGroupOnly = true;
        this.adminOnly = true;
        this.commands = ['tagall', 'invocar', 'marcar', 'todos', 'invocación'];
        this.content = adminGroupsContent.tagAll;
    }
    async execute(context) {
        const { m, conn, participants, text } = context;
        const messageText = m.quoted ? m.quoted.text : text;
        if (!messageText) {
            await conn.reply(m.chat, this.content.noMessage, m);
            return;
        }
        try {
            const chat = await this.#dbService.getChat(m.chat);
            const customEmoji = chat?.customEmoji || '🤍';
            const users = participants.map(u => u.id);
            let mentionText = this.content.header(participants.length, messageText);
            mentionText += this.content.bodyTop;
            for (const userJid of users) {
                mentionText += this.content.userLine(customEmoji, userJid.split('@')[0]);
            }
            mentionText += this.content.footer(global.AdminTK_vs);
            await conn.sendMessage(m.chat, { text: mentionText, mentions: users });
            await m.react(customEmoji);
        }
        catch (e) {
            this.#logger.error(`Error al etiquetar a todos: ${e.message}`);
            await conn.reply(m.chat, this.content.error, m);
            await m.react('✖️');
        }
    }
}
export default TagAllCommand;
//# sourceMappingURL=TagAllCommand.js.map