import { ICommand, IPluginModule } from '../../types/plugin';
import { igdl } from "ruhend-scraper";
import { INSTAGRAM_NO_LINK, INSTAGRAM_SENDING_VIDEO, INSTAGRAM_VIDEO_CAPTION, INSTAGRAM_ERROR_FETCHING_DATA, INSTAGRAM_ERROR_GENERIC } from '../../content/descargas/instagram-download-responses';
class InstagramDownloadPlugin {
    name = "InstagramDownloadPlugin";
    commands = [
        {
            name: "instagram",
            alias: ["ig"],
            desc: "Descarga videos e imágenes de Instagram.",
            category: "Descargas",
            react: "📸",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args[0]) {
                    return conn.reply(m.chat, INSTAGRAM_NO_LINK, m, global.fake);
                }
                await m.react(global.rwait);
                conn.reply(m.chat, INSTAGRAM_SENDING_VIDEO, m, {
                    contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                            title: global.packname,
                            body: global.wm,
                            previewType: 0, thumbnail: global.icons,
                            sourceUrl: global.channel } }
                });
                let res;
                try {
                    res = await igdl(args[0]);
                }
                catch (error) {
                    return conn.reply(m.chat, INSTAGRAM_ERROR_FETCHING_DATA, m);
                }
                let data = res.data;
                if (!data || data.length === 0) {
                    return conn.reply(m.chat, INSTAGRAM_ERROR_FETCHING_DATA, m);
                }
                for (let media of data) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await conn.sendFile(m.chat, media.url, 'instagram.mp4', INSTAGRAM_VIDEO_CAPTION(global.textbot), global.fkontak);
                }
                await m.react('✅');
            }
        }
    ];
}
export default InstagramDownloadPlugin;
//# sourceMappingURL=descargas-ig.js.map