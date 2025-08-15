import Starlights from '@StarlightsTeam/Scraper';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0])
        return m.reply(downloaderMessages.tiktokUsage(usedPrefix, command), m, global.AdminTK_botInfo.rcanal);
    if (!args[0].match(/tiktok/gi))
        return m.reply(downloaderMessages.tiktokInvalidLink, m).then(_ => m.react('✖️'));
    await m.react('🕓');
    try {
        let { title, author, duration, views, likes, comment, share, published, downloads, dl_url } = await Starlights.tiktokdl(args[0]);
        let txt = `${downloaderMessages.tiktokDownloadHeader}\n\n`;
        txt += `\t✩  ${downloaderMessages.tiktokTitle} : ${title}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokAuthor} : ${author}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokDuration} : ${duration} segundos\n`;
        txt += `\t✩  ${downloaderMessages.tiktokViews} : ${views}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokLikes} : ${likes}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokComments} : ${comment}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokShares} : ${share}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokPublished} : ${published}\n`;
        txt += `\t✩  ${downloaderMessages.tiktokDownloads} : ${downloads}\n\n`;
        txt += `> 🚩 *${global.AdminTK_botInfo.botName}*`;
        await m.conn.sendFile(m.chat, dl_url, 'tiktok.mp4', txt, m, null);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['tiktok *<url tt>*'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i;
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-tiktok.js.map