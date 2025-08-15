import fetch from 'node-fetch';
import axios from 'axios';
import { downloaderMessages } from '../../content/downloader-content.js';
import { getBuffer } from '../../utils/helpers.js';
let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text)
        return m.reply(downloaderMessages.soundcloudUsage, m);
    await m.react('🕒');
    try {
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
        let json = await api.json();
        let { url } = json[0];
        let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
        let json2 = await api2.json();
        let { link: dl_url, quality, image } = json2;
        let audio = await getBuffer(dl_url);
        let txt = `${downloaderMessages.soundcloudDownloadHeader}`;
        txt += `	✩  ${downloaderMessages.soundcloudTitle} : ${json[0].title}\n`;
        txt += `	✩  ${downloaderMessages.soundcloudQuality} : ${quality}\n`;
        txt += `	✩  ${downloaderMessages.soundcloudUrl} : ${url}\n\n`;
        txt += `> 🚩 *${global.AdminTK_botInfo.botName}*`;
        await m.conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, null);
        await m.conn.sendMessage(m.chat, { audio: audio, fileName: `${json[0].title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['soundcloud *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['soundcloud', 'sound'];
export default handler;
//# sourceMappingURL=downloader-soundcloud.js.map