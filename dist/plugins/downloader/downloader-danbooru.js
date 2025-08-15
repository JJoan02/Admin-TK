import Starlights from "@StarlightsTeam/Scraper";
import { downloaderMessages } from '../../content/downloader-content.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0])
        return m.reply(downloaderMessages.danbooruUsage(usedPrefix, command));
    await m.react('🕓');
    try {
        let { dl_url } = await Starlights.danbooru(args[0]);
        await m.conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', global.AdminTK_listo, m, null);
        await m.react('✅');
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.help = ['danbooru *<url>*'];
handler.tags = ['downloader'];
handler.command = ['danbooru'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-danbooru.js.map