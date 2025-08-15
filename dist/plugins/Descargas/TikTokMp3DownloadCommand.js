import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class TikTokMp3DownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('tiktokmp3', 'Descarga el audio de un video de TikTok. Uso: !tiktokmp3 <url>');
        this.#logger = logger;
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `Ingresa un link de Tiktok\n*✧ Ejemplo:* ${usedPrefix}${command} https://vm.tiktok.com/ZMhAk8tLx/`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`);
            const dp = await d2.json();
            if (!dp.results || !dp.results.audio) {
                await conn.reply(m.chat, `No se pudo obtener el audio del video de TikTok.`, m);
                await m.react('✖️');
                return;
            }
            const doc = {
                audio: { url: dp.results.audio },
                mimetype: 'audio/mp4',
                fileName: `ttbykeni.mp3`,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: text,
                        title: dp.results.title,
                        sourceUrl: text,
                        thumbnail: await (await conn.getFile(dp.results.thumbnail)).data
                    }
                }
            };
            await conn.sendMessage(m.chat, doc, { quoted: m });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar audio de TikTok: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
            await m.react('✖️');
        }
    }
}
export default TikTokMp3DownloadCommand;
//# sourceMappingURL=TikTokMp3DownloadCommand.js.map