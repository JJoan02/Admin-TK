import { Command } from '../../core/CommandBus.js';
import fetch from 'node-fetch';
export class YouTubeVideoDownloadCommand extends Command {
    constructor() {
        super();
        this.name = 'ytv';
        this.description = 'Descarga videos de YouTube.';
        this.commands = ['ytv'];
        this.tags = ['descargas'];
        this.help = ['ytv <url>'];
    }
    async execute(context) {
        const { conn, m, text, usedPrefix } = context;
        if (!text || !/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(text)) {
            return conn.sendMessage(m.chat, {
                text: `⚠️ *¡Atención!*\n\n💡 *Por favor ingresa un enlace válido de YouTube para descargar el video.*\n\n📌 *Ejemplo:* ${usedPrefix}ytv https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
            });
        }
        try {
            await conn.sendMessage(m.chat, {
                text: `\n╭━━━🌐📡━━━╮  \n   🔍 *Procesando con ☆sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀☆* 🔍  \n╰━━━🌐📡━━━╯  \n\n✨ *Estamos descargando tu video...*  \n📥 *Por favor espera unos instantes mientras procesamos tu solicitud.*  \n\n⏳ *Esto puede tardar unos segundos.*  \n      `,
            });
            const encodedApiUrl = "aHR0cHM6Ly9yZXN0YXBpLmFwaWJvdHdhLmJpei5pZC9hcGkveXRtcDQ=";
            const apiUrl = `${Buffer.from(encodedApiUrl, 'base64').toString('utf-8')}?url=${encodeURIComponent(text)}`;
            const fetchWithRetries = async (url, maxRetries = 2) => {
                let attempt = 0;
                while (attempt <= maxRetries) {
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        if (data && data.status === 200 && data.data && data.data.download && data.data.download.url) {
                            return data.data;
                        }
                    }
                    catch (error) {
                        console.error(`Error en el intento ${attempt + 1}:`, error.message);
                    }
                    attempt++;
                }
                throw new Error("No se pudo obtener una respuesta válida después de varios intentos.");
            };
            const apiData = await fetchWithRetries(apiUrl);
            const { metadata, download } = apiData;
            const { title, duration, thumbnail, description } = metadata;
            const { url: downloadUrl, quality, filename } = download;
            const fileResponse = await fetch(downloadUrl, { method: "HEAD" });
            const fileSize = parseInt(fileResponse.headers.get("content-length") || '0');
            const fileSizeInMB = fileSize / (1024 * 1024);
            const videoInfo = `\n📥 **Video Encontrado**  \n━━━━━━━━━━━━━━━━━━━  \n🎵 **Título:** ${title}  \n⏱️ **Duración:** ${duration.timestamp || "No disponible"}  \n📦 **Tamaño:** ${fileSizeInMB.toFixed(2)} MB  \n📽️ **Calidad:** ${quality || "No disponible"}  \n\n📌 **Descripción:**  \n${description || "No hay descripción disponible"}  \n━━━━━━━━━━━━━━━━━━━  \n    `;
            await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: videoInfo });
            if (fileSizeInMB > 80) {
                await conn.sendMessage(m.chat, {
                    document: { url: downloadUrl },
                    mimetype: "video/mp4",
                    fileName: filename || `${title}.mp4`,
                    caption: `📂 *Video en Formato Documento:* \n🎵 *Título:* ${title}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
                }, { quoted: m });
            }
            else {
                await conn.sendMessage(m.chat, {
                    video: { url: downloadUrl },
                    mimetype: "video/mp4",
                    fileName: filename || `${title}.mp4`,
                    caption: `🎥 *Video Reproducible:* \n🎵 *Título:* ${title}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
                }, { quoted: m });
            }
        }
        catch (error) {
            console.error("Error al descargar el video:", error);
            await conn.sendMessage(m.chat, {
                text: `❌ *Ocurrió un error al intentar procesar tu solicitud:*
${error.message || "Error desconocido"}`,
            });
        }
    }
}
//# sourceMappingURL=YouTubeVideoDownloadCommand.js.map