import { IPluginModule, ICommand } from '../../types/plugin';
import Starlights from '@StarlightsTeam/Scraper';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { YOUTUBE_VIDEO_NO_QUOTED, YOUTUBE_VIDEO_INVALID_QUOTED, YOUTUBE_VIDEO_NOT_FOUND, YOUTUBE_VIDEO_SIZE_LIMIT_EXCEEDED, YOUTUBE_VIDEO_CAPTION } from '../../content/descargas/youtube-video-responses';
const limit = 300;
class YoutubeVideoPlugin {
    name = "YoutubeVideoPlugin";
    commands = [
        {
            name: "youtube_video",
            alias: ["video", "vídeo"],
            desc: "Descarga el video de un video de YouTube.",
            category: "Descargas",
            react: "🎥",
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                conn.reply(m.chat, "Este comando funciona automáticamente al detectar frases clave.", m);
            }
        }
    ];
    async all(m, { conn, isPrems, isOwner }) {
        if (!m.quoted) {
            await conn.reply(m.chat, YOUTUBE_VIDEO_NO_QUOTED, m);
            return false;
        }
        if (!m.quoted.text?.includes("乂  Y O U T U B E  -  P L A Y")) {
            await conn.reply(m.chat, YOUTUBE_VIDEO_INVALID_QUOTED, m);
            return false;
        }
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));
        if (!urls) {
            await conn.reply(m.chat, YOUTUBE_VIDEO_NOT_FOUND, m, rcanal);
            return false;
        }
        const targetUrl = urls[0];
        let user = global.db.data.users[m.sender] || {};
        await m.react('🕓');
        try {
            let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp4(targetUrl);
            if (parseFloat(size.split('MB')[0]) >= limit) {
                return m.reply(YOUTUBE_VIDEO_SIZE_LIMIT_EXCEEDED(limit));
            }
            await conn.sendFile(m.chat, dl_url, title + '.mp4', YOUTUBE_VIDEO_CAPTION(title, quality), m, false, { asDocument: user.useDocument });
            await m.react('✅');
        }
        catch (err) {
            console.error(err);
            await m.react('✖️');
        }
        return true;
    }
}
export default YoutubeVideoPlugin;
//# sourceMappingURL=_youtube-video.js.map