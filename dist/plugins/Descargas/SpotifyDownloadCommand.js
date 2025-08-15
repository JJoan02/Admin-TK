import { Command } from '../../core/CommandBus.js';
import fetch from 'node-fetch';
import { downloaderMessages } from '../content/descargas-content.js';
export class SpotifyDownloadCommand extends Command {
    constructor() {
        super();
        this.name = 'spotify';
        this.description = 'Descarga música de Spotify.';
        this.commands = ['spotify'];
        this.tags = ['descargas'];
        this.help = ['spotify <song name>'];
    }
    async execute(context) {
        const { conn, m, args, command, usedPrefix } = context;
        const text = args.join(" ");
        if (!text) {
            return m.reply(downloaderMessages.spotifyDownload.noText(usedPrefix, command));
        }
        await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
        try {
            const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
            const json = await res.json();
            if (!json.status || !json.result?.downloadUrl) {
                return m.reply(downloaderMessages.spotifyDownload.notFound(text));
            }
            const { title, artist, duration, cover, url } = json.result.metadata;
            const audio = json.result.downloadUrl;
            await conn.sendMessage(m.chat, {
                image: { url: cover },
                caption: `╭─⬣「 ${downloaderMessages.spotifyDownload.title} 」⬣\n│ ≡◦ 🎵 *Título:* ${title}\n│ ≡◦ 👤 *Artista:* ${artist}\n│ ≡◦ ⏱️ *Duración:* ${duration}\n│ ≡◦ 🌐 *Spotify:* ${url}\n╰─⬣`
            }, { quoted: m });
            await conn.sendMessage(m.chat, {
                audio: { url: audio },
                mimetype: 'audio/mp4',
                ptt: false,
                fileName: `${title}.mp3`
            }, { quoted: m });
            await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
        }
        catch (e) {
            console.error(e);
            await m.reply(downloaderMessages.spotifyDownload.errorProcessing);
            await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        }
    }
}
//# sourceMappingURL=SpotifyDownloadCommand.js.map