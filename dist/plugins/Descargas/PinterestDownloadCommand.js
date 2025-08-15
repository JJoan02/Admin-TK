import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import Starlights from '@StarlightsTeam/Scraper';
class PinterestDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('pinterestdl', 'Descarga imágenes y videos de Pinterest. Uso: !pinterestdl <url>');
        this.#logger = logger;
        this.commands = ['pinterestdl', 'pindl'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, '❀ Ingresa el link de un video/imagen de pinterest', m);
            return;
        }
        try {
            await m.react(global.rwait);
            let downloaded = false;
            try {
                const api = await fetch(`https://api.giftedtech.my.id/api/download/pinterestdl?apikey=gifted&url=${text}`);
                const res = await api.json();
                const json = res.result;
                if (json && json.media && json.media.length > 0) {
                    const mediaArray = Array.isArray(json.media) ? json.media : [json.media];
                    for (const media of mediaArray) {
                        if (media.format === "JPG") {
                            await conn.sendFile(m.chat, media.download_url, 'pinterest.jpg', `✰ ${json.title || ''}`, m);
                        }
                        else if (media.format === "MP4") {
                            await conn.sendFile(m.chat, media.download_url, 'pinterest.mp4', `✰ ${json.title || ''}`, m);
                        }
                    }
                    downloaded = true;
                }
            }
            catch (e) {
                this.#logger.warn(`api.giftedtech.my.id falló para Pinterest: ${e.message}`);
            }
            if (!downloaded) {
                try {
                    const { dl_url, quality, size, duration, url } = await Starlights.pinterestdl(text);
                    if (dl_url) {
                        let txt = '`乂 P I N T E R E S T - D L`\n\n';
                        txt += `  ✩   *Calidad* : ${quality || 'N/A'}\n`;
                        txt += `  ✩   *Tamaño* : ${size || 'N/A'}\n`;
                        txt += `  ✩   *Duracion* : ${duration || 'N/A'}\n`;
                        txt += `  ✩   *Url* : ${url || 'N/A'}\n\n`;
                        txt += `> 🚩 *${global.textbot}*`;
                        await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt, mimetype: 'video/mp4', fileName: `pinterest.mp4` }, { quoted: m });
                        downloaded = true;
                    }
                }
                catch (e) {
                    this.#logger.warn(`@StarlightsTeam/Scraper falló para Pinterest: ${e.message}`);
                }
            }
            if (downloaded) {
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, `No se pudo descargar el contenido de Pinterest.`, m);
                await m.react('✖️');
            }
        }
        catch (error) {
            this.#logger.error(`Error general al descargar de Pinterest: ${error.message}`);
            await conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
            await m.react('✖️');
        }
    }
}
export default PinterestDownloadCommand;
//# sourceMappingURL=PinterestDownloadCommand.js.map