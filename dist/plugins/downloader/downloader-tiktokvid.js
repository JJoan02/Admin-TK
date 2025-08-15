import Starlights from '@StarlightsTeam/Scraper';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
    if (!text)
        return m.reply(downloaderMessages.tiktokVidUsage(usedPrefix, command));
    await m.react('🕓');
    try {
        let { title, author, duration, views, likes, comments_count, share_count, download_count, published, dl_url } = await Starlights.tiktokvid(text);
        let txt = `${downloaderMessages.tiktokDownloadHeader}\n\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidTitle} : ${title}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidAuthor} : ${author}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidDuration} : ${duration} segundos\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidViews} : ${views}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidLikes} : ${likes}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidComments} : ${comments_count}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidShares} : ${share_count}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidPublished} : ${published}\n`;
        txt += `    ✩  ${downloaderMessages.tiktokVidDownloads} : ${download_count}\n\n`;
        txt += `> 🚩 ${global.AdminTK_botInfo.botName}`;
        await m.conn.sendFile(m.chat, dl_url, `thumbnail.mp4`, txt, m);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['tiktokvid *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['ttvid', 'tiktokvid'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-tiktokvid.js.map