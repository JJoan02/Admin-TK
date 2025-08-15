import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { urlShortenerMessages } from '../../lib/herramientas-content.js';
class UrlShortenerCommand extends Command {
    #logger;
    constructor(logger) {
        super('acortar', 'Acorta URLs. Uso: !acortar <link>');
        this.#logger = logger;
        this.commands = ['tinyurl', 'short', 'acortar', 'corto'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (!args[0]) {
            await conn.reply(m.chat, urlShortenerMessages.noLink, m);
            return;
        }
        const url = args[0];
        try {
            await m.react(global.rwait);
            const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`)).text();
            if (!shortUrl || shortUrl.startsWith('Error')) {
                throw new Error('No se pudo acortar la URL.');
            }
            await conn.reply(m.chat, urlShortenerMessages.success(url, shortUrl), m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al acortar URL: ${e.message}`);
            await conn.reply(m.chat, urlShortenerMessages.error(usedPrefix, command), m);
            await m.react('✖️');
        }
    }
}
export default UrlShortenerCommand;
//# sourceMappingURL=UrlShortenerCommand.js.map