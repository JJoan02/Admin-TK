import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class TikTokImageDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('tiktokimagen', 'Descarga presentaciones de imágenes de TikTok. Uso: !tiktokimagen <url>');
        this.#logger = logger;
        this.commands = ['tiktokimagen', 'ttimagen'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsMalused7}\n${usedPrefix + command} https://vm.tiktok.com/`, m);
            return;
        }
        if (!(text.includes('http://') || text.includes('https://'))) {
            await conn.reply(m.chat, `${global.mid.smsTikTok3}`, m);
            return;
        }
        if (!text.includes('tiktok.com')) {
            await conn.reply(m.chat, `${global.mid.smsTikTok3}`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${global.lolkeysapi}&url=${text}`);
            let anu = await res.json();
            if (anu.status !== '200' || !anu.result || anu.result.length === 0) {
                throw new Error(anu.message || 'No se encontraron imágenes en la presentación de TikTok.');
            }
            anu = anu.result;
            let c = 0;
            for (let x of anu) {
                if (c === 0) {
                    await conn.sendMessage(m.chat, { image: { url: x }, caption: `✅ ${global.mid.smsTikTok5(anu)}` }, { quoted: m });
                }
                else {
                    await conn.sendMessage(m.chat, { image: { url: x } }, { quoted: m });
                }
                c += 1;
            }
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar imágenes de TikTok: ${e.message}`);
            await conn.reply(m.chat, `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, global.fkontak);
            await m.react('✖️');
        }
    }
}
export default TikTokImageDownloadCommand;
//# sourceMappingURL=TikTokImageDownloadCommand.js.map