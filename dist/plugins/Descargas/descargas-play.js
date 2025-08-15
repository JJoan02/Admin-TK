import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { PLAY_NO_TEXT, PLAY_NO_RESULTS, PLAY_INFO_HEADER, PLAY_INFO_TITLE, PLAY_INFO_DURATION, PLAY_INFO_VIEWS, PLAY_INFO_AUTHOR, PLAY_INFO_LINK, PLAY_INFO_SERVER, PLAY_INFO_FOOTER, PLAY_NO_AUDIO, PLAY_ERROR, PLAY_SERVERS } from '../../content/descargas/play-download-responses';
function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}
async function tryServers(servers, endpoint, queryParam) {
    const shuffledServers = shuffleArray(servers);
    for (const server of shuffledServers) {
        try {
            const url = `${server.baseUrl}${endpoint}${encodeURIComponent(queryParam)}`;
            const res = await fetch(url);
            if (!res.ok)
                throw new Error(`Error HTTP ${res.status}`);
            const json = await res.json();
            if (!json || Object.keys(json).length === 0)
                throw new Error('Respuesta vacía');
            return { json, server: server.name };
        }
        catch (err) {
            console.error(`❌ ${server.name} falló:`, err.message || err);
            continue;
        }
    }
    throw '❌ Todos los servidores fallaron. Intenta más tarde.';
}
class PlayDownloadPlugin {
    name = "PlayDownloadPlugin";
    commands = [
        {
            name: "play",
            alias: ["mp3", "ytmp3", "playmp3"],
            desc: "Busca y descarga música de YouTube.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, text, command }) => {
                if (!text)
                    return m.reply(PLAY_NO_TEXT);
                try {
                    const { json: searchJson, server: searchServer } = await tryServers(PLAY_SERVERS, '/search_youtube?query=', text);
                    if (!searchJson.results?.length)
                        return m.reply(PLAY_NO_RESULTS);
                    const video = searchJson.results[0];
                    const thumb = video.thumbnails.find((t) => t.width === 720)?.url || video.thumbnails[0]?.url;
                    const videoTitle = video.title;
                    const videoUrl = video.url;
                    const duration = Math.floor(video.duration);
                    const msgInfo = `${PLAY_INFO_HEADER}\n` +
                        `${PLAY_INFO_TITLE(videoTitle)}\n` +
                        `━━━━━━━━━━━━━━━━━━━━━━━\n` +
                        `${PLAY_INFO_DURATION(duration)}\n` +
                        `${PLAY_INFO_VIEWS(video.views.toLocaleString())}\n` +
                        `${PLAY_INFO_AUTHOR(video.channel)}\n` +
                        `${PLAY_INFO_LINK(videoUrl)}\n` +
                        `${PLAY_INFO_SERVER(searchServer)}\n` +
                        `${PLAY_INFO_FOOTER}`;
                    await conn.sendMessage(m.chat, { image: { url: thumb }, caption: msgInfo }, { quoted: m });
                    const { json: downloadJson } = await tryServers(PLAY_SERVERS, '/download_audioV2?url=', videoUrl);
                    if (!downloadJson.file_url)
                        return m.reply(PLAY_NO_AUDIO);
                    await conn.sendMessage(m.chat, {
                        audio: { url: downloadJson.file_url },
                        mimetype: 'audio/mpeg',
                        fileName: `${downloadJson.title}.mp3`
                    }, { quoted: m });
                }
                catch (e) {
                    console.error(e);
                    m.reply(PLAY_ERROR);
                }
            }
        }
    ];
}
export default PlayDownloadPlugin;
//# sourceMappingURL=descargas-play.js.map