import { IPluginModule, ICommand } from '../../types/plugin';
import Starlights from '@StarlightsTeam/Scraper';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { YOUTUBE_AUDIO_NO_QUOTED, YOUTUBE_AUDIO_INVALID_QUOTED, YOUTUBE_AUDIO_NOT_FOUND, YOUTUBE_AUDIO_SIZE_LIMIT_EXCEEDED, YOUTUBE_AUDIO_DOWNLOAD_ERROR, YOUTUBE_AUDIO_CAPTION } from '../../content/descargas/youtube-audio-responses';
const limit = 200;
class YoutubeAudioPlugin {
    name = "YoutubeAudioPlugin";
    commands = [
        {
            name: "youtube_audio",
            alias: ["audio"],
            desc: "Descarga el audio de un video de YouTube.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                conn.reply(m.chat, "Este comando funciona automáticamente al detectar frases clave.", m);
            }
        }
    ];
    async all(m, { conn, isPrems, isOwner }) {
        if (!m.quoted) {
            await conn.reply(m.chat, YOUTUBE_AUDIO_NO_QUOTED, m);
            return false;
        }
        if (!m.quoted.text?.includes("乂  Y O U T U B E  -  P L A Y")) {
            await conn.reply(m.chat, YOUTUBE_AUDIO_INVALID_QUOTED, m);
            return false;
        }
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));
        if (!urls) {
            await conn.reply(m.chat, YOUTUBE_AUDIO_NOT_FOUND, m);
            return false;
        }
        const targetUrl = urls[0];
        let user = global.db.data.users[m.sender] || {};
        await m.react('🕓');
        try {
            let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(targetUrl);
            let sizeMB = parseFloat(size.split('MB')[0]);
            if (sizeMB >= limit) {
                await conn.reply(m.chat, YOUTUBE_AUDIO_SIZE_LIMIT_EXCEEDED(limit), m);
                await m.react('✖️');
                return false;
            }
            await conn.sendFile(m.chat, dl_url, `${title}.mp3`, YOUTUBE_AUDIO_CAPTION(title, quality), m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
            await m.react('✅');
        }
        catch (err) {
            console.error(err);
            await conn.reply(m.chat, YOUTUBE_AUDIO_DOWNLOAD_ERROR, m);
            await m.react('✖️');
        }
        return true;
    }
}
export default YoutubeAudioPlugin;
//# sourceMappingURL=_youtube-audio.js.map