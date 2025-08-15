import fetch from 'node-fetch';
import yts from 'yt-search';
let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m);
    }
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|v\/|e\/|u\/\w\/|.+\/videoseries\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s]*)/;
    if (!urlRegex.test(text)) {
        return conn.reply(m.chat, `❀ El link de YouTube es inválido.`, m);
    }
    try {
        const video = await yts(text);
        const { title, thumbnail, url, author, timestamp, views } = video.videos[0];
        let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`);
        let json = await api.json();
        if (!json.result) {
            return conn.reply(m.chat, `❀ No se pudo obtener el archivo de audio de YouTube.`, m);
        }
        let dl_url = json.result.download.url;
        let quality = json.result.download.quality;
        if (!dl_url) {
            return conn.reply(m.chat, `❀ Error: No se pudo obtener el archivo de audio.`, m);
        }
        await m.react('✅');
        let imageK = await fetch(thumbnail);
        let imageB = await imageK.buffer();
        await conn.sendMessage(m.chat, {
            document: { url: dl_url },
            fileName: `${title}.mp3`,
            fileLength: quality,
            caption: `❀ ${title}`,
            mimetype: 'audio/mpeg',
            jpegThumbnail: imageB,
        }, { quoted: m });
        await conn.sendMessage(m.chat, {
            audio: { url: dl_url },
            fileName: `${title}.mp3`,
            mimetype: 'audio/mp4'
        }, { quoted: m });
    }
    catch (error) {
        console.error(error);
        conn.reply(m.chat, `❀ Ocurrió un error al procesar la solicitud.`, m);
    }
};
handler.command = ['ytmp3v2'];
export default handler;
//# sourceMappingURL=search-youtube.js.map