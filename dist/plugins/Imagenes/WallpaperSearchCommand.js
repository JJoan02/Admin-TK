import { Command } from '../../core/Command.js';
import { googleImage } from '@bochilteam/scraper';
import { wallpaperSearchMessages } from '../../lib/imagenes-content.js';
class WallpaperSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('wallpaper', 'Busca wallpapers en Google.');
        this.#logger = logger;
        this.commands = ['wallpaper', 'wallpapers', 'wp'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, wallpaperSearchMessages.noText(usedPrefix, command), m);
            return;
        }
        try {
            await m.react('🕓');
            const res = await (await googleImage('wallpaper' + text)).getRandom();
            await conn.sendFile(m.chat, res, 'thumbnail.jpg', wallpaperSearchMessages.result(text), m, null);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in WallpaperSearchCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, wallpaperSearchMessages.error, m);
        }
    }
}
export default WallpaperSearchCommand;
//# sourceMappingURL=WallpaperSearchCommand.js.map