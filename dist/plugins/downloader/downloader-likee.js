import fetch from 'node-fetch';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, text }) => {
    if (!text)
        return m.reply(downloaderMessages.likeeUsage, m);
    await m.react('🕓');
    try {
        let app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' } });
        let json = await app.json();
        let video = json.links['no watermark'];
        await m.conn.sendFile(m.chat, video, 'samu.mp4', `${json.caption}`, m, null);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['likeedl *<url>*'];
handler.tags = ['downloader'];
handler.command = /^(likeedl)$/i;
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-likee.js.map