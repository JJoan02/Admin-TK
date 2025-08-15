import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { XVIDEOS_NSFW_DISABLED, XVIDEOS_NO_LINK, XVIDEOS_PROCESSING_MESSAGE, XVIDEOS_ERROR_GENERIC } from '../../content/descargas/xvideos-download-responses';
async function xvideosdl(url) {
    return new Promise((resolve, reject) => {
        fetch(`${url}`, { method: 'get' })
            .then(res => res.text())
            .then(res => {
            let $ = cheerio.load(res, { xmlMode: false });
            const title = $("meta[property='og:title']").attr("content");
            const keyword = $("meta[name='keywords']").attr("content");
            const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views";
            const vote = $("div.rate-infos > span.rating-total-txt").text();
            const likes = $("span.rating-good-nbr").text();
            const deslikes = $("span.rating-bad-nbr").text();
            const thumb = $("meta[property='og:image']").attr("content");
            const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");
            resolve({ status: 200, result: { title, url: videoUrl, keyword, views, vote, likes, deslikes, thumb } });
        })
            .catch(err => reject(err));
    });
}
class XvideosDownloadPlugin {
    name = "XvideosDownloadPlugin";
    commands = [
        {
            name: "xvideosdl",
            alias: [],
            desc: "Descarga videos de Xvideos.com.",
            category: "Descargas",
            react: "🔞",
            execute: async (Yaka, m, { conn, args, command, usedPrefix, text }) => {
                if (!global.db.data.chats[m.chat]?.nsfw && m.isGroup) {
                    return m.reply(XVIDEOS_NSFW_DISABLED);
                }
                if (!args[0]) {
                    return conn.reply(m.chat, XVIDEOS_NO_LINK(usedPrefix, command), m);
                }
                try {
                    conn.reply(m.chat, XVIDEOS_PROCESSING_MESSAGE, m);
                    const internalApiUrl = `http://localhost:3000/api/xvideos/download?url=${encodeURIComponent(args[0])}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        throw new Error(errorJson.error || 'Error desconocido de la API interna');
                    }
                    const json = await response.json();
                    const videoUrl = json.result.url;
                    const title = json.result.title;
                    conn.sendMessage(m.chat, { document: { url: videoUrl }, mimetype: 'video/mp4', fileName: title }, { quoted: m });
                }
                catch (e) {
                    console.error(e);
                    throw XVIDEOS_ERROR_GENERIC;
                }
            }
        }
    ];
}
export default XvideosDownloadPlugin;
//# sourceMappingURL=descarga-xvideosdl.js.map