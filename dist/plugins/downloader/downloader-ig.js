import Starlights from '@StarlightsTeam/Scraper';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0])
        return m.reply(downloaderMessages.igUsage(usedPrefix, command));
    await m.react('🕓');
    try {
        let { dl_url } = await Starlights.igdl(args[0]);
        await m.conn.sendFile(m.chat, dl_url, 'igdl.mp4', global.AdminTK_listo, m, null);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['instagram *<link ig>*'];
handler.tags = ['downloader'];
handler.command = /^(instagramdl|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig3)$/i;
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-ig.js.map