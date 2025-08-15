import { Command } from '../../core/Command.js';
import { autoresponderMessages } from '../../lib/informacion-content.js';
class AutoresponderCommand extends Command {
    #dbService;
    constructor(dbService) {
        super('autoresponder', 'Configura el autoresponder del chat.');
        this.#dbService = dbService;
        this.commands = ['editautoresponder', 'autoresponder'];
        this.permissions = ['owner', 'admin'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command, isOwner, isAdmin, isROwner } = context;
        const chatData = this.#dbService.chats[m.chat];
        if (text) {
            if (chatData.sAutoresponder) {
                await conn.reply(m.chat, autoresponderMessages.promptAlreadySet(usedPrefix, command), m);
                return;
            }
            chatData.sAutoresponder = text;
            await conn.reply(m.chat, autoresponderMessages.configSuccess(usedPrefix), m);
        }
        else {
            if (chatData.sAutoresponder) {
                chatData.sAutoresponder = '';
                await conn.reply(m.chat, autoresponderMessages.promptDeleted, m, global.fake);
            }
            else {
                await conn.reply(m.chat, autoresponderMessages.noPromptSet(usedPrefix, command), m);
            }
        }
    }
}
export default AutoresponderCommand;
//# sourceMappingURL=AutoresponderCommand.js.map