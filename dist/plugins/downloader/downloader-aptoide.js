import Starlights from "@StarlightsTeam/Scraper";
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text)
        return m.reply(downloaderMessages.aptoideUsage(usedPrefix, command), m, global.AdminTK_botInfo.rcanal);
    await m.react('🕓');
    try {
        let { name, packname, update, size, thumbnail, dl_url } = await Starlights.aptoide(text);
        if (size.includes('GB') || parseFloat(size.replace(' MB', '')) > 300) {
            return await m.reply(downloaderMessages.aptoideSizeLimit);
        }
        let txt = `${downloaderMessages.aptoideDownloadHeader}\n\n`;
        txt += `\t✩   ${downloaderMessages.aptoideName} : ${name}\n`;
        txt += `\t✩   ${downloaderMessages.aptoidePackage} : ${packname}\n`;
        txt += `\t✩   ${downloaderMessages.aptoideUpdate} : ${update}\n`;
        txt += `\t✩   ${downloaderMessages.aptoideSize} :  ${size}\n\n`;
        txt += `${downloaderMessages.aptoideSending}`;
        await m.conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m, null);
        await m.conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'application/vnd.android.package-archive', fileName: name + '.apk', caption: null }, { quoted: m });
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['aptoide *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['aptoide', 'apk'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-aptoide.js.map