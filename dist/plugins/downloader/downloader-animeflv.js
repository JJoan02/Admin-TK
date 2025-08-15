import { File } from 'megajs';
import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs';
import { downloaderMessages } from '../../content/downloader-content.js';
import { formatBytes } from '../../utils/helpers.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0] || !args[1]) {
            return m.reply(downloaderMessages.animeflvUsage(usedPrefix, command));
        }
        const animeId = args[0];
        const episodeNumber = args[1];
        const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episodeNumber}`;
        const response = await fetch(apiUrl);
        if (!response.ok)
            throw new Error(downloaderMessages.animeflvApiError);
        const { servers } = await response.json();
        const megaLink = servers[0].find(server => server.server === 'mega')?.url;
        if (!megaLink)
            throw new Error(downloaderMessages.animeflvLinkNotAvailable);
        const file = File.fromURL(megaLink);
        await file.loadAttributes();
        if (file.size >= 300000000) {
            return m.reply(downloaderMessages.animeflvSizeLimit);
        }
        const animeFolder = path.join(process.cwd(), 'tmp', 'animes');
        if (!fs.existsSync(animeFolder)) {
            fs.mkdirSync(animeFolder, { recursive: true });
        }
        const episodePath = path.join(animeFolder, `${animeId}_ep${episodeNumber}.mp4`);
        const dataBuffer = await file.downloadBuffer();
        fs.writeFileSync(episodePath, dataBuffer);
        const caption = `${downloaderMessages.animeflvDownloadSuccess} ${file.name}
${downloaderMessages.animeflvSize} ${formatBytes(file.size)}

${downloaderMessages.animeflvLoading}`;
        await m.conn.sendMessage(m.chat, { text: caption }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await m.conn.sendFile(m.chat, episodePath, file.name, downloaderMessages.animeflvDownloading(file.name), m, null, { mimetype: 'video/mp4', asDocument: true });
        fs.unlink(episodePath, (err) => {
            if (err)
                console.error(err);
        });
    }
    catch (error) {
        console.error(error);
        m.reply(downloaderMessages.animeflvGeneralError(error));
    }
};
handler.help = ['animedl <anime-id> <episode-number>'];
handler.tags = ['downloader'];
handler.command = ['animedl', 'animeflvdl', 'anidl'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-animeflv.js.map