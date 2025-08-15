import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import axios from 'axios';
class TwitterDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('twitter', 'Descarga videos e imágenes de Twitter. Uso: !twitter <url>');
        this.#logger = logger;
        this.commands = ['tw', 'twitter', 'twitdl', 'twitx', 'x', 'ttx'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        const twitterUrlRegex = /^https?:\/\/(www\.)?twitter\.com\/(\w+)\/status\/(\d+)$/i;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsMalused7}\n${usedPrefix + command} https://twitter.com/Animalesybichos/status/1564616107159330816?t=gKqUsstvflSp7Dhpe_nmDg&s=19`, global.fkontak);
            return;
        }
        if (!twitterUrlRegex.test(text)) {
            await conn.reply(m.chat, `Por favor, introduce una URL de Twitter válida.`, m);
            await m.react('✖️');
            return;
        }
        const key = (await conn.sendMessage(m.chat, { text: global.wait }, { quoted: m })).key;
        try {
            await m.react(global.rwait);
            let downloaded = false;
            try {
                const apiResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/download/twitterdl?url=${encodeURIComponent(text)}`);
                const res = apiResponse.data;
                if (res?.type === 'video') {
                    const caption = res.caption ? res.caption : '*TWITTER - VIDEO*';
                    for (let i = 0; i < res.media.length; i++) {
                        await conn.sendMessage(m.chat, { video: { url: res.media[i].url }, caption: caption }, { quoted: m });
                    }
                    downloaded = true;
                }
                else if (res?.type === 'image') {
                    const caption = res.caption ? res.caption : '*TWITTER - IMAGEN*';
                    for (let i = 0; i < res.media.length; i++) {
                        await conn.sendMessage(m.chat, { image: { url: res.media[i].url }, caption: caption }, { quoted: m });
                    }
                    downloaded = true;
                }
            }
            catch (e) {
                this.#logger.warn(`deliriussapi-oficial.vercel.app falló: ${e.message}`);
            }
            if (!downloaded) {
                await this.#delay(1000);
                await conn.sendMessage(m.chat, { text: global.waitt, edit: key });
                await conn.sendMessage(m.chat, { text: global.waittt, edit: key });
                await this.#delay(1000);
                await conn.sendMessage(m.chat, { text: global.waitttt, edit: key });
                const apiUrl = `${global.apis}/download/twitterv2?url=${encodeURIComponent(text)}`;
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                if (jsonData && jsonData.data && jsonData.data.media && jsonData.data.media.length > 0 && jsonData.data.media[0].videos && jsonData.data.media[0].videos.length > 0) {
                    const tweetTitle = jsonData.data.description;
                    const tweetVideoUrl = jsonData.data.media[0].videos[0].url;
                    const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${text}`)).text();
                    const tweetTitleWithoutUrl = tweetTitle.replace(/https?:\/\/t\.co\/\w+/i, '').trim();
                    const txt1 = `🖤 ${tweetTitleWithoutUrl}\n\n🔗 *URL:*
• _${shortUrl1}_`.trim();
                    await conn.sendFile(m.chat, tweetVideoUrl, 'twitter.mp4', txt1, global.fkontak);
                    downloaded = true;
                }
            }
            if (downloaded) {
                await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, `No se pudo descargar el contenido de Twitter. Verifica el enlace o inténtalo de nuevo más tarde.`, m);
                await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
                await m.react('✖️');
            }
        }
        catch (e) {
            this.#logger.error(`Error general al descargar de Twitter: ${e.message}`);
            await conn.sendMessage(m.chat, { text: `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, edit: key });
            await m.react('✖️');
        }
    }
    #delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}
export default TwitterDownloadCommand;
//# sourceMappingURL=TwitterDownloadCommand.js.map