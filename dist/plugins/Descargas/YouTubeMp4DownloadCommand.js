import { Command } from '../../core/CommandBus.js';
import fetch from 'node-fetch';
import axios from 'axios';
const VIDEO_THRESHOLD = 70 * 1024 * 1024;
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024;
const REQUEST_LIMIT = 3;
const REQUEST_WINDOW_MS = 10000;
const COOLDOWN_MS = 120000;
const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;
const isValidYouTubeUrl = (url) => /^(?:https?:\/\/(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|)([\\w\\-_]+)&?)/.test(url);
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
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?\/]+)/)?.[1];
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
    while (requestTimestamps.length > 0 && now - requestTimestamps[0] > REQUEST_WINDOW_MS) {
        requestTimestamps.shift();
    }
    if (requestTimestamps.length >= REQUEST_LIMIT) {
        isCooldown = true;
        setTimeout(() => {
            isCooldown = false;
            requestTimestamps.length = 0;
        }, COOLDOWN_MS);
        return false;
    }
    return true;
};
export class YouTubeMp4DownloadCommand extends Command {
    constructor() {
        super();
        this.name = 'ytmp4';
        this.description = 'Descarga videos de YouTube en formato MP4.';
        this.commands = ['ytmp4'];
        this.tags = ['descargas'];
        this.help = ['ytmp4 <url>'];
        this.diamond = true;
    }
    async execute(context) {
        const { conn, m, text, usedPrefix, command } = context;
        if (!text) {
            return conn.reply(m.chat, `👉 Uso: ${usedPrefix}${command} https://youtube.com/watch?v=iQEVguV71sI`, m);
        }
        if (!isValidYouTubeUrl(text)) {
            await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } });
            return m.reply('🚫 Enlace de YouTube inválido');
        }
        if (isCooldown || !checkRequestLimit()) {
            await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } });
            return conn.reply(m.chat, '⏳ Demasiadas solicitudes rápidas. Por favor, espera 2 minutos.', m);
        }
        if (isProcessingHeavy) {
            await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } });
            return conn.reply(m.chat, '⏳ Espera, estoy procesando un archivo pesado.', m);
        }
        await conn.sendMessage(m.chat, { react: { text: '📀', key: m.key } });
        try {
            const { url, title } = await ytdl(text);
            const size = await getSize(url);
            if (!size) {
                await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } });
                throw new Error('No se pudo determinar el tamaño del video');
            }
            if (size > HEAVY_FILE_THRESHOLD) {
                isProcessingHeavy = true;
                await conn.reply(m.chat, '🤨 Espera, estoy lidiando con un archivo pesado', m);
            }
            await conn.sendMessage(m.chat, { react: { text: '✅️', key: m.key } });
            const caption = `*💌 ${title}*
> ⚖️ Peso: ${formatSize(size)}
> 🌎 URL: ${text}`;
            const isSmallVideo = size < VIDEO_THRESHOLD;
            const buffer = await (await fetch(url)).buffer();
            await conn.sendFile(m.chat, buffer, `${title}.mp4`, caption, m, null, {
                mimetype: 'video/mp4',
                asDocument: !isSmallVideo,
                filename: `${title}.mp4`
            });
            await conn.sendMessage(m.chat, { react: { text: '🟢', key: m.key } });
            isProcessingHeavy = false;
        }
        catch (e) {
            await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } });
            await m.reply(`❌ Error: ${e.message || 'No se pudo procesar la solicitud'}`);
            isProcessingHeavy = false;
        }
    }
}
//# sourceMappingURL=YouTubeMp4DownloadCommand.js.map