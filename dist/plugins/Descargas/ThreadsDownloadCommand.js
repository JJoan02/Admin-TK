import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class ThreadsDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('threads', 'Descarga videos de Threads.net. Uso: !threads <url>');
        this.#logger = logger;
        this.commands = ['thread', 'threads', 'threaddl'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsMalused7}\n${usedPrefix + command} https://www.threads.net/@adri_leclerc_/post/C_dSNIOOlpy?xmt=AQGzxbmyveDB91QgFo_KQWzqL6PT2yCy2eg8BkhPTO-6Kw`, global.fkontak);
            return;
        }
        const key = (await conn.sendMessage(m.chat, { text: global.wait }, { quoted: m })).key;
        try {
            await m.react(global.rwait);
            await this.#delay(1000);
            await conn.sendMessage(m.chat, { text: global.waitt, edit: key });
            await conn.sendMessage(m.chat, { text: global.waittt, edit: key });
            await this.#delay(1000);
            await conn.sendMessage(m.chat, { text: global.waitttt, edit: key });
            const apiUrl = `${global.apis}/download/threads?url=${encodeURIComponent(text)}`;
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            if (!jsonData || !jsonData.data || !jsonData.data.media || jsonData.data.media.length === 0) {
                await conn.reply(m.chat, `No se pudo descargar el video de Threads. Verifica el enlace.`, m);
                await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
                await m.react('✖️');
                return;
            }
            const threadTitle = jsonData.data.description;
            const threadVideoUrl = jsonData.data.media[0].url;
            const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${text}`)).text();
            const txt1 = `🖤 ${threadTitle}\n\n🔗 *URL:*\n• _${shortUrl1}_`.trim();
            await conn.sendFile(m.chat, threadVideoUrl, 'threads.mp4', txt1, global.fkontak);
            await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar de Threads: ${e.message}`);
            await conn.sendMessage(m.chat, { text: `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, edit: key });
            await m.react('✖️');
        }
    }
    #delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}
export default ThreadsDownloadCommand;
//# sourceMappingURL=ThreadsDownloadCommand.js.map