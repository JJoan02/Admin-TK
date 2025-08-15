import { ICommand, IPluginModule } from '../../types/plugin';
import { File } from "megajs";
import * as path from "path";
import { MEGA_NO_URL, MEGA_FILE_TOO_LARGE, MEGA_CAPTION_HEADER, MEGA_CAPTION_FILE, MEGA_CAPTION_SIZE, MEGA_CAPTION_FOOTER, MEGA_ERROR } from '../../content/descargas/mega-download-responses';
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
class MegaDownloadPlugin {
    name = "MegaDownloadPlugin";
    commands = [
        {
            name: "mega",
            alias: [],
            desc: "Descarga archivos de Mega.nz.",
            category: "Descargas",
            react: "☁️",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0])
                    return conn.reply(m.chat, MEGA_NO_URL(usedPrefix, command), m);
                try {
                    const file = File.fromURL(args[0]);
                    await file.loadAttributes();
                    if (file.size >= 300000000)
                        return m.reply(MEGA_FILE_TOO_LARGE);
                    m.react('✅');
                    const caption = `${MEGA_CAPTION_HEADER}` +
                        `${MEGA_CAPTION_FILE(file.name)}` +
                        `${MEGA_CAPTION_SIZE(formatBytes(file.size))}` +
                        `${MEGA_CAPTION_FOOTER}`;
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
                    await conn.sendFile(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });
                }
                catch (error) {
                    return m.reply(MEGA_ERROR(error.message));
                }
            }
        }
    ];
}
export default MegaDownloadPlugin;
//# sourceMappingURL=descargas-mega.js.map