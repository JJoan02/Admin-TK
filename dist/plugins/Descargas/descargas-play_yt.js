import { ICommand, IPluginModule } from '../../types/plugin';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import fetch from 'node-fetch';
import { YOUTUBE_PLAY_NO_TEXT, YOUTUBE_PLAY_AUDIO_CARD_CAPTION, YOUTUBE_PLAY_VIDEO_CARD_CAPTION, YOUTUBE_PLAY_AUDIO_DOC_CARD_CAPTION, YOUTUBE_PLAY_VIDEO_DOC_CARD_CAPTION, YOUTUBE_PLAY_VIDEO_CAPTION, YOUTUBE_PLAY_ERROR, YOUTUBE_PLAY_FILE_TOO_HEAVY } from '../../content/descargas/youtube-play-download-responses';
const LimitAud = 725 * 1024 * 1024;
const LimitVid = 425 * 1024 * 1024;
async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}
function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}
function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
const getBuffer = async (url) => {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return Buffer.from(buffer);
    }
    catch (error) {
        console.error("Error al obtener el buffer", error);
        throw new Error("Error al obtener el buffer");
    }
};
async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    }
    catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}
async function fetchY2mate(url) {
    const baseUrl = 'https://www.y2mate.com/mates/en60';
    const videoInfo = await fetch(`${baseUrl}/analyze/ajax`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url, q_auto: '0' })
    }).then(res => res.json());
    const id = videoInfo.result.id;
    const downloadInfo = await fetch(`${baseUrl}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ type: 'youtube', _id: id, v_id: url, token: '', ftype: 'mp4', fquality: '360p' })
    }).then(res => res.json());
    return downloadInfo.result.url;
}
async function fetchInvidious(url) {
    const apiUrl = `https://invidious.io/api/v1/get_video_info`;
    const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data && data.video) {
        const videoInfo = data.video;
        return videoInfo;
    }
    else {
        throw new Error("No se pudo obtener información del video desde Invidious");
    }
}
async function fetch9Convert(url) {
    const apiUrl = `https://9convert.com/en429/api`;
    const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data.status === 'ok') {
        return data.result.mp3;
    }
    else {
        throw new Error("No se pudo obtener la descarga desde 9Convert");
    }
}
class YoutubePlayDownloadPlugin {
    name = "YoutubePlayDownloadPlugin";
    commands = [
        {
            name: "ytmp3",
            alias: ["musica"],
            desc: "Descarga el audio de un video de YouTube.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, text, args, command }) => {
                if (!text)
                    return m.reply(YOUTUBE_PLAY_NO_TEXT);
                const yt_play = await search(args.join(' '));
                const ytplay2 = await yts(text);
                let imgUrl = `https://random-apis.shop/generate-card?titulo=${yt_play[0].title}&autor=${yt_play[0].author.name}&thumbnail=${yt_play[0].thumbnail}&tempo=${secondString(yt_play[0].duration.seconds)}`;
                await conn.sendFile(m.chat, imgUrl, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*

*Duración:* ${secondString(yt_play[0].duration.seconds)}
*Aguarde un momento en lo que envío su audio*`, m);
                try {
                    const internalApiUrl = `http://localhost:3000/api/youtube/audio?url=${encodeURIComponent(yt_play[0].url)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    const audioUrl = json.result.download;
                    await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg' }, { quoted: m || null });
                }
                catch (e) {
                    console.error(e);
                    await m.react('❌');
                }
            }
        },
        {
            name: "ytmp4",
            alias: ["video"],
            desc: "Descarga el video de un video de YouTube.",
            category: "Descargas",
            react: "🎥",
            execute: async (Yaka, m, { conn, text, args, command }) => {
                if (!text)
                    return m.reply(YOUTUBE_PLAY_NO_TEXT);
                const yt_play = await search(args.join(' '));
                const ytplay2 = await yts(text);
                let imgUrl = `https://random-apis.shop/generate-card?titulo=${yt_play[0].title}&autor=${yt_play[0].author.name}&thumbnail=${yt_play[0].thumbnail}&tempo=${secondString(yt_play[0].duration.seconds)}`;
                await conn.sendFile(m.chat, imgUrl, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*

*Duración:* ${secondString(yt_play[0].duration.seconds)}
*Aguarde un momento en lo que envío su video*`, m);
                try {
                    const internalApiUrl = `http://localhost:3000/api/youtube/video?url=${encodeURIComponent(yt_play[0].url)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    const videoUrl = json.result.url;
                    await conn.sendMessage(m.chat, { video: { url: videoUrl }, fileName: `video.mp4`, mimetype: 'video/mp4', caption: `Aquí está tu video 
Título: ${yt_play[0].title}` }, { quoted: m || null });
                }
                catch (e) {
                    console.error(e);
                    await m.react('❌');
                }
            }
        },
        {
            name: "ytmp3doc",
            alias: ["playdoc"],
            desc: "Descarga el audio de un video de YouTube como documento.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, text, args, usedPrefix, command }) => {
                if (!text)
                    return m.reply(YOUTUBE_PLAY_NO_TEXT);
                const yt_play = await search(args.join(' '));
                const ytplay2 = await yts(text);
                let imgUrl = `https://random-apis.shop/generate-card?titulo=${yt_play[0].title}&autor=${yt_play[0].author.name}&thumbnail=${yt_play[0].thumbnail}&tempo=${secondString(yt_play[0].duration.seconds)}`;
                const texto1 = YOUTUBE_PLAY_AUDIO_DOC_CARD_CAPTION(yt_play[0].title, secondString(yt_play[0].duration.seconds), usedPrefix, yt_play[0].url);
                await conn.sendFile(m.chat, imgUrl, 'error.jpg', texto1, m);
                try {
                    const internalApiUrl = `http://localhost:3000/api/youtube/audio?url=${encodeURIComponent(yt_play[0].url)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    const audioUrl = json.result.download;
                    await conn.sendMessage(m.chat, { document: { url: audioUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
                }
                catch (e) {
                    console.error(e);
                    await m.react('❌');
                }
            }
        },
        {
            name: "ytmp4doc",
            alias: ["playdoc2"],
            desc: "Descarga el video de un video de YouTube como documento.",
            category: "Descargas",
            react: "🎥",
            execute: async (Yaka, m, { conn, text, args, usedPrefix, command }) => {
                if (!text)
                    return m.reply(YOUTUBE_PLAY_NO_TEXT);
                const yt_play = await search(args.join(' '));
                const ytplay2 = await yts(text);
                let imgUrl = `https://random-apis.shop/generate-card?titulo=${yt_play[0].title}&autor=${yt_play[0].author.name}&thumbnail=${yt_play[0].thumbnail}&tempo=${secondString(yt_play[0].duration.seconds)}`;
                const texto1 = YOUTUBE_PLAY_VIDEO_DOC_CARD_CAPTION(yt_play[0].title, secondString(yt_play[0].duration.seconds), usedPrefix, yt_play[0].url);
                await conn.sendFile(m.chat, imgUrl, 'error.jpg', texto1, m);
                try {
                    const internalApiUrl = `http://localhost:3000/api/youtube/video?url=${encodeURIComponent(yt_play[0].url)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    const videoUrl = json.result.url;
                    await conn.sendMessage(m.chat, { document: { url: videoUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `${global.wm}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
                }
                catch (e) {
                    console.error(e);
                    await m.react('❌');
                }
            }
        }
    ];
}
export default YoutubePlayDownloadPlugin;
//# sourceMappingURL=descargas-play_yt.js.map