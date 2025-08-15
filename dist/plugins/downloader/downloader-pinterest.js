import Starlights from '@StarlightsTeam/Scraper';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0])
        return m.reply(downloaderMessages.pinterestUsage(usedPrefix, command));
    await m.react('🕓');
    try {
        let { dl_url, quality, size, duration, url } = await Starlights.pinterestdl(args[0]);
        let txt = `${downloaderMessages.pinterestDownloadHeader}\n\n`;
        txt += `  ✩   ${downloaderMessages.pinterestQuality} : ${quality}\n`;
        txt += `  ✩   ${downloaderMessages.pinterestSize} : ${size}\n`;
        txt += `  ✩   ${downloaderMessages.pinterestDuration} : ${duration}\n`;
        txt += `  ✩   ${downloaderMessages.pinterestUrl} : ${url}\n\n`;
        txt += `${downloaderMessages.pinterestBotName}`;
        await m.conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt, mimetype: 'video/mp4', fileName: `pinterest.mp4` }, { quoted: m });
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['pinterestdl *<url pin>*'];
handler.tags = ['downloader'];
handler.command = ['pinterestdl', 'pindl'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-pinterest.js.map