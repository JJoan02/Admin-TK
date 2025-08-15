import { Command } from '../../core/CommandBus.js';
import fetch from 'node-fetch';
import { busquedaContent } from '../content/busqueda-content.js';
export class TikTokSearchCommand extends Command {
    constructor() {
        super();
        this.name = 'ttsearch';
        this.description = 'Busca videos en TikTok.';
        this.commands = ['ttsearch', 'tiktoksearch'];
        this.tags = ['buscador'];
        this.help = ['ttsearch <query>'];
    }
    async execute(context) {
        const { conn, m, text, command, usedPrefix } = context;
        if (!text) {
            return m.reply(busquedaContent.tiktokSearch.noText(usedPrefix, command));
        }
        await conn.sendMessage(m.chat, { react: { text: "⏰", key: m.key } });
        try {
            let res = await fetch(`https://www.sankavolereii.my.id/search/tiktok?apikey=planaai&q=${encodeURIComponent(text)}`);
            let json = await res.json();
            if (!json.status || !json.result.length) {
                return m.reply(busquedaContent.tiktokSearch.notFound(text));
            }
            let random = json.result[Math.floor(Math.random() * json.result.length)];
            let { title, duration, play, digg_count, comment_count, share_count, author } = random;
            let caption = `🎬 *${title}*
👤 *${author.nickname}* (@${author.unique_id})
⏱️ *Duración:* ${duration}s
❤️ *Me gusta:* ${digg_count.toLocaleString()}
💬 *Comentarios:* ${comment_count.toLocaleString()}
🔁 *Compartir:* ${share_count.toLocaleString()}`;
            await conn.sendFile(m.chat, play, 'tiktok.mp4', caption, m);
        }
        catch (e) {
            console.error(e);
            m.reply(busquedaContent.tiktokSearch.error);
        }
    }
}
//# sourceMappingURL=TikTokSearchCommand.js.map