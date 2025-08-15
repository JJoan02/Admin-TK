import Starlights from "@StarlightsTeam/Scraper";
import fetch from 'node-fetch';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0])
        return m.reply(downloaderMessages.mediafireUsage, m);
    if (!args[0].match(/mediafire/gi))
        return m.reply(downloaderMessages.mediafireInvalidLink, m);
    await m.react('🕓');
    try {
        let { title, ext, aploud, size, dl_url } = await Starlights.mediafire(args[0]);
        let txt = `${downloaderMessages.mediafireDownloadHeader}\n\n`;
        txt += `\t✩  ${downloaderMessages.mediafireName} : ${title}\n`;
        txt += `\t✩  ${downloaderMessages.mediafireSize} : ${size}\n`;
        txt += `\t✩  ${downloaderMessages.mediafirePublished} : ${aploud}\n`;
        txt += `\t✩  ${downloaderMessages.mediafireMimeType} : ${ext}\n\n`;
        txt += `${downloaderMessages.mediafireSending}`;
        let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer();
        await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null);
        await m.conn.sendFile(m.chat, dl_url, title, null, m, null, { mimetype: ext, asDocument: true });
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        try {
            let { title, ext, aploud, size, dl_url } = await Starlights.mediafireV2(args[0]);
            let txt = `${downloaderMessages.mediafireDownloadHeader}\n\n`;
            txt += `\t✩  ${downloaderMessages.mediafireName} : ${title}\n`;
            txt += `\t✩  ${downloaderMessages.mediafireSize} : ${size}\n`;
            txt += `\t✩  ${downloaderMessages.mediafirePublished} : ${aploud}\n`;
            txt += `\t✩  ${downloaderMessages.mediafireMimeType} : ${ext}\n\n`;
            txt += `${downloaderMessages.mediafireSending}`;
            let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer();
            await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null);
            await m.conn.sendFile(m.chat, dl_url, title, null, m, null, { mimetype: ext, asDocument: true });
            await m.react('✅');
        }
        catch (e2) {
            console.error(e2);
            await m.react('✖️');
        }
    }
};
handler.help = ['mediafire'].map(v => v + ' *<url>*');
handler.tags = ['downloader', 'premium'];
handler.command = ['mediafire', 'mdfire', 'mf'];
handler.premium = true;
export default handler;
//# sourceMappingURL=downloader-mediafire.js.map