import Starlights from '@StarlightsTeam/Scraper';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text)
        return m.reply(downloaderMessages.tiktokUserUsage(usedPrefix, command));
    await m.react('🕓');
    try {
        let data = await Starlights.tiktokuser(text);
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let video = data[i];
                let txt = `${downloaderMessages.tiktokDownloadHeader}\n\n`;
                txt += `    ✩  ${downloaderMessages.tiktokUserVideoNumber} : ${video.nro}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokTitle} : ${video.title}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokAuthor} : ${video.author}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokDuration} : ${video.duration} segundos\n`;
                txt += `    ✩  ${downloaderMessages.tiktokViews} : ${video.views}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokLikes} : ${video.likes}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokComments} : ${video.comments_count}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokShares} : ${video.share_count}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokPublished} : ${video.published}\n`;
                txt += `    ✩  ${downloaderMessages.tiktokDownloads} : ${video.download_count}\n\n`;
                txt += `> 🚩 ${global.AdminTK_botInfo.botName}`;
                await m.conn.sendFile(m.chat, video.dl_url, `video_${i + 1}.mp4`, txt, m, null);
            }
            await m.react('✅');
        }
        else {
            await m.react('✖️');
        }
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.tags = ['downloader'];
handler.help = ['tiktokuser *<usuario>*'];
handler.command = ['tiktokuser', 'tiktokus'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-tiktokuser.js.map