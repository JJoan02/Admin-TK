import { File } from "megajs";
import path from "path";
import { downloaderMessages } from '../../content/downloader-content.js';
import { formatBytes } from '../../utils/helpers.js';
let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!text)
            return m.reply(downloaderMessages.megaUsage(usedPrefix, command));
        const file = File.fromURL(text);
        await file.loadAttributes();
        if (file.size >= 300000000)
            return m.reply(downloaderMessages.megaSizeLimit);
        const downloadingMessage = downloaderMessages.megaDownloading;
        m.reply(downloadingMessage);
        const caption = `${downloaderMessages.megaDownloadSuccess}${downloaderMessages.megaFile}: ${file.name}\n${downloaderMessages.megaSize}: ${formatBytes(file.size)}`;
        const data = await file.downloadBuffer();
        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };
        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";
        await m.conn.sendFile(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });
    }
    catch (error) {
        return m.reply(downloaderMessages.megaError(error));
    }
};
handler.help = ["mega"];
handler.tags = ["downloader"];
handler.command = /^(mega)$/i;
export default handler;
//# sourceMappingURL=dl-mega.js.map