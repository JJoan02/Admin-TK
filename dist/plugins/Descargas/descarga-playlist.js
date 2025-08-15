import { ICommand, IPluginModule } from '../../types/plugin';
import yts from 'yt-search';
import { YOUTUBE_PLAYLIST_NO_TEXT, YOUTUBE_PLAYLIST_SEARCH_HEADER, YOUTUBE_PLAYLIST_RESULTS_HEADER, YOUTUBE_PLAYLIST_SEARCH_TEXT, YOUTUBE_PLAYLIST_BUTTON_TEXT, YOUTUBE_PLAYLIST_AUDIO_HEADER, YOUTUBE_PLAYLIST_VIDEO_HEADER, YOUTUBE_PLAYLIST_AUDIO_DOC_HEADER, YOUTUBE_PLAYLIST_VIDEO_DOC_HEADER, YOUTUBE_PLAYLIST_ERROR_REPORT } from '../../content/descargas/youtube-playlist-responses';
class YoutubePlaylistPlugin {
    name = "YoutubePlaylistPlugin";
    commands = [
        {
            name: "playlist",
            alias: ["ytbuscar", "ytsearch"],
            desc: "Busca videos en YouTube y permite descargar audio/video.",
            category: "Descargas",
            react: "▶️",
            execute: async (Yaka, m, { conn, usedPrefix, text, command }) => {
                if (!text)
                    return conn.reply(m.chat, YOUTUBE_PLAYLIST_NO_TEXT(global.lenguajeGB.smsAvisoMG()), global.fkontak, m);
                try {
                    const internalApiUrl = `http://localhost:3000/api/youtube/search?query=${encodeURIComponent(text)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    let ytres = json.result;
                    let teskd = YOUTUBE_PLAYLIST_SEARCH_HEADER(text);
                    let listSections = [];
                    for (let index in ytres) {
                        let v = ytres[index];
                        listSections.push({
                            title: `${global.htki} ${YOUTUBE_PLAYLIST_RESULTS_HEADER(global.htki, global.htka)}`,
                            rows: [
                                {
                                    header: YOUTUBE_PLAYLIST_AUDIO_HEADER,
                                    title: "",
                                    description: `${v.title} | ${v.timestamp}\n`,
                                    id: `${usedPrefix}ytmp3 ${v.url}`
                                },
                                {
                                    header: YOUTUBE_PLAYLIST_VIDEO_HEADER,
                                    title: "",
                                    description: `${v.title} | ${v.timestamp}\n`,
                                    id: `${usedPrefix}ytmp4 ${v.url}`
                                },
                                {
                                    header: YOUTUBE_PLAYLIST_AUDIO_DOC_HEADER,
                                    title: "",
                                    description: `${v.title} | ${v.timestamp}\n`,
                                    id: `${usedPrefix}ytmp3doc ${v.url}`
                                },
                                {
                                    header: YOUTUBE_PLAYLIST_VIDEO_DOC_HEADER,
                                    title: "",
                                    description: `${v.title} | ${v.timestamp}\n`,
                                    id: `${usedPrefix}ytmp4doc ${v.url}`
                                }
                            ]
                        });
                    }
                    await conn.sendList(m.chat, `${global.htki} ${YOUTUBE_PLAYLIST_RESULTS_HEADER(global.htki, global.htka)}
`, `
${YOUTUBE_PLAYLIST_SEARCH_TEXT(text)}`, YOUTUBE_PLAYLIST_BUTTON_TEXT, listSections, global.fkontak);
                }
                catch (e) {
                    await conn.sendButton(m.chat, `
${global.wm}`, YOUTUBE_PLAYLIST_ERROR_REPORT(global.wm, global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError1(), global.lenguajeGB.smsMensError2(), usedPrefix, command), null, [[global.lenguajeGB.smsMensError1(), `#reporte ${global.lenguajeGB.smsMensError2()} *${usedPrefix + command}*`]], null, null, m);
                    console.log(e);
                }
            }
        }
    ];
}
export default YoutubePlaylistPlugin;
//# sourceMappingURL=descarga-playlist.js.map