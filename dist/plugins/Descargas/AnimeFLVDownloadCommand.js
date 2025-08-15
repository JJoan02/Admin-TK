import { ICommand, IPluginModule } from '../../types/plugin';
import { File } from 'megajs';
import fetch from 'node-fetch';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ANIMEFLV_DOWNLOAD_USAGE, ANIMEFLV_DOWNLOAD_API_ERROR, ANIMEFLV_DOWNLOAD_MEGA_LINK_UNAVAILABLE, ANIMEFLV_DOWNLOAD_FILE_SIZE_EXCEEDED, ANIMEFLV_DOWNLOAD_STARTING, ANIMEFLV_DOWNLOAD_CAPTION, ANIMEFLV_DOWNLOAD_SENDING, ANIMEFLV_DOWNLOAD_ERROR_GENERIC, ANIMEFLV_DOWNLOAD_MAX_FILE_SIZE_MB } from '../../content/descargas/animeflv-download-responses';
class AnimeFLVDownloadPlugin {
    name = "AnimeFLVDownloadPlugin";
    commands = [
        {
            name: "animedl",
            alias: ["animeflvdl", "anidl"],
            desc: "Descarga episodios de anime de AnimeFLV.",
            category: "Descargas",
            react: "📥",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (args.length < 2) {
                    return conn.reply(m.chat, ANIMEFLV_DOWNLOAD_USAGE(usedPrefix, command), m);
                }
                const animeId = args[0];
                const episodeNumber = args[1];
                try {
                    await m.react(global.rwait);
                    const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episodeNumber}`;
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error(ANIMEFLV_DOWNLOAD_API_ERROR);
                    }
                    const { servers } = await response.json();
                    const megaLink = servers[0].find((server) => server.server === 'mega')?.url;
                    if (!megaLink) {
                        throw new Error(ANIMEFLV_DOWNLOAD_MEGA_LINK_UNAVAILABLE);
                    }
                    const file = File.fromURL(megaLink);
                    await file.loadAttributes();
                    if (file.size >= ANIMEFLV_DOWNLOAD_MAX_FILE_SIZE_MB * 1024 * 1024) {
                        await conn.reply(m.chat, ANIMEFLV_DOWNLOAD_FILE_SIZE_EXCEEDED(ANIMEFLV_DOWNLOAD_MAX_FILE_SIZE_MB), m);
                        await m.react('✖️');
                        return;
                    }
                    const tempDir = path.join(process.cwd(), 'tmp', 'animes');
                    await fs.mkdir(tempDir, { recursive: true });
                    const episodePath = path.join(tempDir, `${animeId}_ep${episodeNumber}.mp4`);
                    await conn.reply(m.chat, ANIMEFLV_DOWNLOAD_STARTING(file.name), m);
                    const dataBuffer = await file.downloadBuffer();
                    await fs.writeFile(episodePath, dataBuffer);
                    const caption = ANIMEFLV_DOWNLOAD_CAPTION(file.name, AnimeFLVDownloadPlugin.formatBytes(file.size));
                    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
                    await conn.sendFile(m.chat, episodePath, file.name, ANIMEFLV_DOWNLOAD_SENDING(file.name), m, null, { mimetype: 'video/mp4', asDocument: true });
                    await fs.unlink(episodePath).catch(err => console.error(`Error al eliminar archivo temporal: ${err.message}`));
                    await m.react('✅');
                }
                catch (error) {
                    console.error(`Error en AnimeFLVDownloadPlugin: ${error.message}`);
                    await conn.reply(m.chat, ANIMEFLV_DOWNLOAD_ERROR_GENERIC(error.message), m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static formatBytes(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
export default AnimeFLVDownloadPlugin;
//# sourceMappingURL=AnimeFLVDownloadCommand.js.map