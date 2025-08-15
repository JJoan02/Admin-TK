import Starlights from '@StarlightsTeam/Scraper';
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0])
        return m.reply(downloaderMessages.fbUsage(usedPrefix, command));
    await m.react('🕓');
    try {
        let { dl_url } = await Starlights.fbdl(args[0]);
        await m.conn.sendFile(m.chat, dl_url, 'fbdl.mp4', global.AdminTK_listo, m, null);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['fb *<link fb>*'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb|facebookdl|fbdl)$/i;
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-fb.js.map