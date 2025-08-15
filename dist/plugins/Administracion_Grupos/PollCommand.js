import { Command } from '../../core/Command.js';
import { adminGroupsContent } from '../../content/administracion-grupos-content.js';
class PollCommand extends Command {
    #logger;
    constructor(logger) {
        super('poll', adminGroupsContent.poll.description);
        this.#logger = logger;
        this.isGroupOnly = true;
        this.content = adminGroupsContent.poll;
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, this.content.noText(usedPrefix, command), m);
            return;
        }
        const parts = text.split(`|`);
        const question = parts[0].trim();
        const options = parts.slice(1).map(opt => opt.trim()).filter(opt => opt.length > 0);
        if (options.length < 2) {
            await conn.reply(m.chat, this.content.minOptions, m);
            return;
        }
        if (options.length > 12) {
            await conn.reply(m.chat, this.content.maxOptions, m);
            return;
        }
        try {
            await conn.sendPoll(m.chat, question, options);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al crear encuesta: ${e.message}`);
            await conn.reply(m.chat, this.content.error, m);
            await m.react('✖️');
        }
    }
}
export default PollCommand;
//# sourceMappingURL=PollCommand.js.map