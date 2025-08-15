import { Command } from '../../core/Command.js';
import { wallpaper } from '@bochilteam/scraper';
class WallpaperSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('wallpaper', 'Busca fondos de pantalla. Uso: !wallpaper <texto>');
        this.#logger = logger;
        this.commands = ['wp', 'wallpaper', 'wallpaper2'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsMalused7}\n${usedPrefix + command} Gata | cat`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const res = await (/2/.test(command) ? wallpaper : wallpaper)(text);
            const img = res[Math.floor(Math.random() * res.length)];
            const link = img;
            await conn.sendButton(m.chat, `💞 ${global.mid.buscador} ${text}\n`, `𝙁𝙤𝙣𝙙𝙤 | 𝙒𝙥 | ${global.wm}`, img, [
                ['🔄 𝙎𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 | 𝙉𝙚𝙭𝙩', `${usedPrefix + command} ${text}`],
                ['🔍 𝙋𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 ', `#pinterest ${text}`],
                ['🔍 𝙂𝙤𝙤𝙜𝙡𝙚 ', `#image ${text}`]
            ], null, null, global.fkontak);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al buscar wallpaper: ${e.message}`);
            await conn.reply(m.chat, `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, m);
            await m.react('✖️');
        }
    }
}
export default WallpaperSearchCommand;
//# sourceMappingURL=WallpaperSearchCommand.js.map