import { Command } from '../../core/Command.js';
import axios from 'axios';
import { busquedaContent } from '../../content/busqueda-content.js';
class TwitterSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('tweetposts', busquedaContent.twitterSearch.description);
        this.#logger = logger;
        this.commands = ['tweetposts'];
        this.content = busquedaContent.twitterSearch;
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, this.content.noText, m);
            return;
        }
        try {
            await m.react(global.AdminTK_rwait);
            const json = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(text)}`, { headers: { 'Content-Type': 'application/json' } });
            const result = json.data.result;
            if (!result || result.length === 0) {
                await conn.reply(m.chat, this.content.notFound, m);
                await m.react('✖️');
                return;
            }
            let txt = this.content.header;
            result.forEach(({ user, post, profile, user_link }, index) => {
                txt += this.content.resultFormat(index + 1, user, post, profile, user_link);
            });
            await conn.reply(m.chat, txt, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`${this.content.errorSearch} ${e.message}`);
            await conn.react('✖️');
            await conn.reply(m.chat, this.content.error, m);
        }
    }
}
export default TwitterSearchCommand;
//# sourceMappingURL=TwitterSearchCommand.js.map