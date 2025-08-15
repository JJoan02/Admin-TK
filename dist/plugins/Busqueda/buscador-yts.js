import { ICommand, IPluginModule } from '../../types/plugin';
import yts from 'yt-search';
import { YOUTUBE_SEARCH_NO_TEXT, YOUTUBE_SEARCH_SEARCHING, YOUTUBE_SEARCH_NO_RESULTS, YOUTUBE_SEARCH_VIDEO_HEADER, YOUTUBE_SEARCH_VIDEO_TITLE, YOUTUBE_SEARCH_VIDEO_DURATION, YOUTUBE_SEARCH_DOWNLOAD_INSTRUCTIONS, YOUTUBE_SEARCH_DOWNLOAD_AUDIO_COMMAND, YOUTUBE_SEARCH_DOWNLOAD_VIDEO_COMMAND, YOUTUBE_SEARCH_FOOTER, YOUTUBE_SEARCH_ERROR } from '../../content/busqueda/youtube-search-responses';
class YoutubeSearchPlugin {
    name = "YoutubeSearchPlugin";
    commands = [
        {
            name: "yts",
            alias: ["ytsearch"],
            desc: "Busca videos en YouTube.",
            category: "Busqueda",
            react: "▶️",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text || !text.trim()) {
                    return conn.reply(m.chat, YOUTUBE_SEARCH_NO_TEXT(usedPrefix, command), m);
                }
                text = text.trim();
                await conn.reply(m.chat, YOUTUBE_SEARCH_SEARCHING(text), m);
                try {
                    const searchResults = await yts(text);
                    if (!searchResults?.videos?.length)
                        throw new Error(YOUTUBE_SEARCH_NO_RESULTS);
                    const videos = searchResults.videos.slice(0, 5);
                    for (const video of videos) {
                        let caption = YOUTUBE_SEARCH_VIDEO_HEADER;
                        caption += YOUTUBE_SEARCH_VIDEO_TITLE(video.title);
                        caption += YOUTUBE_SEARCH_VIDEO_DURATION(video.timestamp || "Desconocida");
                        caption += YOUTUBE_SEARCH_DOWNLOAD_INSTRUCTIONS;
                        caption += YOUTUBE_SEARCH_DOWNLOAD_AUDIO_COMMAND(video.url);
                        caption += YOUTUBE_SEARCH_DOWNLOAD_VIDEO_COMMAND(video.url);
                        caption += YOUTUBE_SEARCH_FOOTER;
                        await conn.sendMessage(m.chat, { image: { url: video.image }, caption }, { quoted: m });
                    }
                }
                catch (error) {
                    console.error("❌ Error:", error);
                    await conn.reply(m.chat, YOUTUBE_SEARCH_ERROR(error.message || "Error desconocido"), m);
                }
            }
        }
    ];
}
export default YoutubeSearchPlugin;
//# sourceMappingURL=buscador-yts.js.map