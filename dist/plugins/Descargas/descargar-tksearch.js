import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from "node-fetch";
import { TIKTOK_SEARCH_NO_QUERY, TIKTOK_SEARCH_SEARCHING, TIKTOK_SEARCH_NO_VIDEOS_FOUND, TIKTOK_SEARCH_NEXT_NO_SESSION, TIKTOK_SEARCH_NEXT_END_RESULTS, TIKTOK_SEARCH_VIDEO_CAPTION, TIKTOK_SEARCH_SEND_VIDEO_ERROR, TIKTOK_SEARCH_NEXT_BUTTON, TIKTOK_SEARCH_NO_SESSION_VIDEOS, TIKTOK_SEARCH_API_ERROR } from '../../content/descargas/tiktok-search-download-responses';
const tiktokSessions = new Map < string, { videos: any, []:  };
currentIndex: number;
query: string;
 > ();
class TiktokSearchDownloadPlugin {
    name = "TiktokSearchDownloadPlugin";
    commands = [
        {
            name: "tiktoksearch",
            alias: [],
            desc: "Busca videos de TikTok por nombre y permite navegar por los resultados.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                const query = args.join(' ').trim();
                if (!query) {
                    return m.reply(TIKTOK_SEARCH_NO_QUERY);
                }
                try {
                    await conn.reply(m.chat, TIKTOK_SEARCH_SEARCHING(query), m);
                    const apiUrl = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (!data.meta || data.meta.length === 0) {
                        return conn.reply(m.chat, TIKTOK_SEARCH_NO_VIDEOS_FOUND, m);
                    }
                    tiktokSessions.set(m.chat, {
                        videos: data.meta,
                        currentIndex: 0,
                        query: query
                    });
                    await TiktokSearchDownloadPlugin.sendTikTokVideo(m, conn);
                }
                catch (error) {
                    console.error('Error en tiktokSearchHandler:', error);
                    return conn.reply(m.chat, TIKTOK_SEARCH_API_ERROR, m);
                }
            }
        },
        {
            name: "tiktoknext",
            alias: [],
            desc: "Muestra el siguiente video de TikTok en la búsqueda actual.",
            category: "Descargas",
            react: "➡️",
            execute: async (Yaka, m, { conn }) => {
                const session = tiktokSessions.get(m.chat);
                if (!session || !session.videos || session.videos.length === 0) {
                    return conn.reply(m.chat, TIKTOK_SEARCH_NEXT_NO_SESSION, m);
                }
                if (session.currentIndex + 1 >= session.videos.length) {
                    return conn.reply(m.chat, TIKTOK_SEARCH_NEXT_END_RESULTS, m);
                }
                session.currentIndex += 1;
                tiktokSessions.set(m.chat, session);
                await TiktokSearchDownloadPlugin.sendTikTokVideo(m, conn);
            }
        }
    ];
    static async sendTikTokVideo(m, conn) {
        const session = tiktokSessions.get(m.chat);
        if (!session || !session.videos || session.videos.length === 0) {
            return conn.reply(m.chat, TIKTOK_SEARCH_NO_SESSION_VIDEOS, m);
        }
        const video = session.videos[session.currentIndex];
        const caption = TIKTOK_SEARCH_VIDEO_CAPTION(session.currentIndex + 1, session.videos.length, session.query, video.title || 'Sin título', video.author || 'Desconocido');
        try {
            const buttons = [];
            if (session.currentIndex + 1 < session.videos.length) {
                buttons.push({
                    buttonId: '.tiktoknext',
                    buttonText: { displayText: TIKTOK_SEARCH_NEXT_BUTTON },
                    type: 1
                });
            }
            await conn.sendMessage(m.chat, {
                video: { url: video.hd },
                caption: caption,
                buttons: buttons,
                viewOnce: true
            }, { quoted: m });
        }
        catch (error) {
            console.error('Error al enviar el video de TikTok:', error);
            conn.reply(m.chat, TIKTOK_SEARCH_SEND_VIDEO_ERROR, m);
        }
    }
}
export default TiktokSearchDownloadPlugin;
//# sourceMappingURL=descargar-tksearch.js.map