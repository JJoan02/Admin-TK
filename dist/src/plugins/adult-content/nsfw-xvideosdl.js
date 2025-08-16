// nsfw-xvideosdl.ts - Plugin mejorado y optimizado
// Categoría: adult-content
// Funcionalidad: Contenido para adultos
// Convertido automáticamente a TypeScript con mejoras
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
const handler = async (m, { conn, args, command, usedPrefix, text }) => {
    // Verificar si el comando NSFW está habilitado en el grupo
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('*[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.*\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw');
    }
    // Verificar si se recibió un argumento (enlace)
    if (!args[0]) {
        return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗]*\n\n📝 *Instrucciones:* \nPara descargar un video de Xvideos, por favor ingresa un enlace válido.\nEjemplo: \n*${usedPrefix + command} https://www.xvideos.com/video70389849/pequena_zorra_follada_duro*`, m);
    }
    try {
        conn.reply(m.chat, `[❗] 𝐸𝑙 𝑣𝑖𝑑𝑒𝑜 𝑒𝑠𝑡𝑎 𝑠𝑖𝑒𝑛𝑑𝑜 𝑝𝑟𝑜𝑐𝑒𝑠𝑎𝑑𝑜, 𝑒𝑠𝑝𝑒𝑟𝑒 𝑢𝑛 𝑚𝑜𝑚𝑒𝑛𝑡𝑜 𝑒𝑛 𝑙𝑜 𝑞𝑢𝑒 𝑒𝑠 𝑒𝑛𝑣𝑖𝑎𝑑𝑜.. \n\n﹣ ᴇʟ ᴛɪᴇᴍᴘᴏ ᴅᴇ ᴇɴᴠɪᴏ ᴅᴜᴇɴᴛᴇ ᴅᴇʟ ᴘᴇsᴏ ʏ ᴅᴜʀᴀᴄɪᴏ́ɴ ᴅᴇʟ ᴠɪᴅᴇᴏ`, m);
        const res = await xvideosdl(args[0]);
        conn.sendMessage(m.chat, { document: { url: res.result.url }, mimetype: 'video/mp4', fileName: res.result.title }, { quoted: m });
    }
    catch (e) {
        throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝚁𝚁𝙾𝚁, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*\n\n*- 𝙲𝙾𝚁𝚁𝙾𝙱𝙾𝚁𝙴 𝚀𝚄𝙴 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 𝚂𝙴𝙰 𝚂𝙸𝙼𝙸𝙻𝙰𝚁 𝙰:*\n*◉ https://www.xvideos.com/video70389849/pequena_zorra_follada_duro*`;
    }
};
handler.command = ['xvideosdl'];
handler.register = false;
handler.group = false;
export default handler;
async function xvideosdl(url) {
    return new Promise((resolve, reject) => {
        fetch(`${url}`, { method: 'get' })
            .then(res => res.text())
            .then(res => {
            let $ = cheerio.load(res, { xmlMode: false });
            const title = $("meta[property='og:title']").attr("content");
            const keyword = $("meta[name='keywords']").attr("content");
            const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views";
            const vote = $("div.rate-infos > span.rating-total-txt").text();
            const likes = $("span.rating-good-nbr").text();
            const deslikes = $("span.rating-bad-nbr").text();
            const thumb = $("meta[property='og:image']").attr("content");
            const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");
            resolve({ status: 200, result: { title, url: videoUrl, keyword, views, vote, likes, deslikes, thumb } });
        })
            .catch(err => reject(err));
    });
}
//# sourceMappingURL=nsfw-xvideosdl.js.map