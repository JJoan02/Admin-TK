import { ICommand, IPluginModule } from '../../types/plugin';
import { igdl } from 'ruhend-scraper';
import { FACEBOOK_NO_LINK, FACEBOOK_ERROR_FETCHING_DATA, FACEBOOK_NO_RESULTS, FACEBOOK_ERROR_PROCESSING_DATA, FACEBOOK_NO_ADEQUATE_RESOLUTION, FACEBOOK_ERROR_SENDING_VIDEO } from '../../content/descargas/facebook-download-responses';
class FacebookDownloadPlugin {
    name = "FacebookDownloadPlugin";
    commands = [
        {
            name: "fb",
            alias: ["facebook", "fbdl"],
            desc: "Descarga videos de Facebook.",
            category: "Descargas",
            react: "📘",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args[0]) {
                    return conn.reply(m.chat, FACEBOOK_NO_LINK, m, global.fake);
                }
                await m.react('🕒');
                let res;
                try {
                    res = await igdl(args[0]);
                }
                catch (error) {
                    return conn.reply(m.chat, FACEBOOK_ERROR_FETCHING_DATA, m);
                }
                let result = res.data;
                if (!result || result.length === 0) {
                    return conn.reply(m.chat, FACEBOOK_NO_RESULTS, m);
                }
                let data;
                try {
                    data = result.find((i) => i.resolution === "720p (HD)") || result.find((i) => i.resolution === "360p (SD)");
                }
                catch (error) {
                    return conn.reply(m.chat, FACEBOOK_ERROR_PROCESSING_DATA, m);
                }
                if (!data) {
                    return conn.reply(m.chat, FACEBOOK_NO_ADEQUATE_RESOLUTION, m);
                }
                await m.react('✅');
                let video = data.url;
                try {
                    await conn.sendMessage(m.chat, { video: { url: video }, caption: global.dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
                }
                catch (error) {
                    return conn.reply(m.chat, FACEBOOK_ERROR_SENDING_VIDEO, m);
                    await m.react('❌');
                }
            }
        }
    ];
}
export default FacebookDownloadPlugin;
//# sourceMappingURL=descargas-facebook.js.map