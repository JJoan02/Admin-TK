import hispamemes from 'hispamemes';
import axios from 'axios';
import { AUTOPOST_CHANNEL_JID, AUTOPOST_QUERY_KEYWORDS, AUTOPOST_MEME_CAPTION, AUTOPOST_MEME_SENT_MESSAGE, AUTOPOST_VIDEO_ERROR, AUTOPOST_VIDEO_SENT_MESSAGE, AUTOPOST_ERROR_GENERAL } from '../../content/utilidades/autopost-responses';
import { TIKWM_API_URL } from '../../../config/redes_sociales/socialMediaConfig';
class AutopostPlugin {
    name = "AutopostPlugin";
    commands = [
        {
            name: "publicar",
            alias: ["publicar"],
            desc: "Publica un meme o video aleatorio en un canal de WhatsApp.",
            category: "Propietario",
            react: "📤",
            execute: async (Yaka, m, { conn, isOwner }) => {
                if (!isOwner) {
                    return m.reply("Este comando solo puede ser usado por el propietario.");
                }
                const tipo = Math.random() < 0.5 ? 'meme' : 'video';
                try {
                    if (tipo === 'meme') {
                        const meme = hispamemes.meme();
                        await conn.sendMessage(AUTOPOST_CHANNEL_JID, {
                            image: { url: meme },
                            caption: AUTOPOST_MEME_CAPTION
                        });
                        m.reply(AUTOPOST_MEME_SENT_MESSAGE);
                    }
                    else {
                        const video = await this.obtenerVideo();
                        if (!video) {
                            return m.reply(AUTOPOST_VIDEO_ERROR);
                        }
                        await conn.sendMessage(AUTOPOST_CHANNEL_JID, {
                            video: { url: video.url },
                            caption: video.title
                        });
                        m.reply(AUTOPOST_VIDEO_SENT_MESSAGE);
                    }
                }
                catch (e) {
                    console.error('Error en autopost:', e);
                    m.reply(AUTOPOST_ERROR_GENERAL);
                }
            }
        }
    ];
    async obtenerVideo() {
        try {
            const keywords = AUTOPOST_QUERY_KEYWORDS[Math.floor(Math.random() * AUTOPOST_QUERY_KEYWORDS.length)];
            const res = await axios.post(TIKWM_API_URL, new URLSearchParams({
                keywords, count: 10, cursor: 0, HD: 1
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            const videos = res.data?.data?.videos;
            if (!videos || videos.length === 0)
                return null;
            const random = videos[Math.floor(Math.random() * videos.length)];
            return {
                url: random.play,
                title: random.title || '🪐'
            };
        }
        catch (e) {
            console.error('🪐 Error al obtener video:', e);
            return null;
        }
    }
}
export default AutopostPlugin;
//# sourceMappingURL=autopost_plugin.js.map