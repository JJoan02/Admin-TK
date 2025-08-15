import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from "node-fetch";
import axios from 'axios';
import { YTMP4_USAGE, YTMP4_INVALID_URL, YTMP4_TOO_MANY_REQUESTS, YTMP4_PROCESSING_HEAVY_FILE, YTMP4_SIZE_UNKNOWN, YTMP4_SIZE_LIMIT_EXCEEDED, YTMP4_ERROR_GENERIC, YTMP4_DOWNLOADING_MESSAGE, YTMP4_CAPTION, YTMP4_MAX_FILE_SIZE, YTMP4_VIDEO_THRESHOLD, YTMP4_HEAVY_FILE_THRESHOLD, YTMP4_REQUEST_LIMIT, YTMP4_REQUEST_WINDOW_MS, YTMP4_COOLDOWN_MS } from '../../content/descargas/youtube-mp4-responses';
const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;
const isValidYouTubeUrl = (url) => /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);
function formatSize(bytes) {
    if (!bytes || isNaN(bytes))
        return 'Desconocido';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    bytes = Number(bytes);
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}
async function getSize(url) {
    try {
        const response = await axios.head(url, { timeout: 10000 });
        const size = parseInt(response.headers['content-length'], 10);
        if (!size)
            throw new Error('Tamaño no disponible');
        return size;
    }
    catch (e) {
        throw new Error('No se pudo obtener el tamaño del archivo');
    }
}
async function ytdl(url) {
    const headers = {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Chromium";v="132", "Not A(Brand";v="8"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        referer: 'https://id.ytmp3.mobi/',
        'referrer-policy': 'strict-origin-when-cross-origin'
    };
    try {
        const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers });
        if (!initRes.ok)
            throw new Error('Fallo al inicializar la solicitud');
        const init = await initRes.json();
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?/]+)/)?.[1];
        if (!videoId)
            throw new Error('ID de video no encontrado');
        const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers });
        if (!convertRes.ok)
            throw new Error('Fallo al convertir el video');
        const convert = await convertRes.json();
        let info;
        for (let i = 0; i < 3; i++) {
            const progressRes = await fetch(convert.progressURL, { headers });
            if (!progressRes.ok)
                throw new Error('Fallo al obtener el progreso');
            info = await progressRes.json();
            if (info.progress === 3)
                break;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        if (!info || !convert.downloadURL)
            throw new Error('No se pudo obtener la URL de descarga');
        return { url: convert.downloadURL, title: info.title || 'Video sin título' };
    }
    catch (e) {
        throw new Error(`Error en la descarga: ${e.message}`);
    }
}
const checkRequestLimit = () => {
    const now = Date.now();
    requestTimestamps.push(now);
    while (requestTimestamps.length > 0 && now - requestTimestamps[0] > YTMP4_REQUEST_WINDOW_MS) {
        requestTimestamps.shift();
    }
    if (requestTimestamps.length >= YTMP4_REQUEST_LIMIT) {
        isCooldown = true;
        setTimeout(() => {
            isCooldown = false;
            requestTimestamps.length = 0;
        }, YTMP4_COOLDOWN_MS);
        return false;
    }
    return true;
};
class Ytmp4Plugin {
    name = "Ytmp4Plugin";
    commands = [
        {
            name: "ytmp4",
            alias: [],
            desc: "Descarga videos de YouTube.",
            category: "Descargas",
            react: "🎥",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, YTMP4_USAGE(usedPrefix, command), m);
                }
                if (!isValidYouTubeUrl(text)) {
                    await m.react('🔴');
                    return m.reply(YTMP4_INVALID_URL);
                }
                try {
                    await m.react('📀');
                    const internalApiUrl = `http://localhost:3000/api/youtube/video?url=${encodeURIComponent(text)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    const videoUrl = json.result.url;
                    const title = json.result.title;
                    const caption = YTMP4_CAPTION(title, "Tamaño desconocido", text);
                    await conn.sendFile(m.chat, { url: videoUrl }, `${title}.mp4`, caption, m, null, {
                        mimetype: 'video/mp4',
                        asDocument: true,
                        filename: `${title}.mp4`
                    });
                    await m.react('🟢');
                }
                catch (e) {
                    await m.react('🔴');
                    await m.reply(YTMP4_ERROR_GENERIC(e.message));
                }
            }
        }
    ];
}
export default Ytmp4Plugin;
//# sourceMappingURL=barbozx-ytmp4.js.map