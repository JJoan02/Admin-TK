import { ICommand, IPluginModule } from '../../types/plugin';
import axios from "axios";
import FormData from "form-data";
import * as cheerio from 'cheerio';
import { TIKTOK2_NO_LINK, TIKTOK2_NORMAL_QUALITY_CAPTION, TIKTOK2_HD_QUALITY_CAPTION, TIKTOK2_ERROR } from '../../content/descargas/tiktok2-responses';
async function tiktokdl(url) {
    let result = {};
    let form = new FormData();
    form.append("q", url);
    form.append("lang", "id");
    try {
        let { data } = await axios("https://savetik.co/api/ajaxSearch", {
            method: "post",
            data: form,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "User-Agent": "PostmanRuntime/7.32.2"
            }
        });
        let $ = cheerio.load(data.data);
        result.status = true;
        result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text();
        result.server1 = {
            quality: "MEDIUM",
            url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
        };
        result.serverHD = {
            quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
            url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
        };
        result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href");
    }
    catch (error) {
        result.status = false;
        result.message = error;
        console.log(result);
    }
    return result;
}
class Tiktok2Plugin {
    name = "Tiktok2Plugin";
    commands = [
        {
            name: "tiktok2",
            alias: [],
            desc: "Descarga videos de TikTok en calidad normal y HD.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text)
                    return conn.reply(m.chat, TIKTOK2_NO_LINK, m, rcanal);
                try {
                    const internalApiUrl = `http://localhost:3000/api/tiktok/video?url=${encodeURIComponent(text)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        return conn.reply(m.chat, TIKTOK2_ERROR, m);
                    }
                    const json = await response.json();
                    const normalQualityUrl = json.result.normalQuality;
                    const hdQualityUrl = json.result.hdQuality;
                    await m.react('🕓');
                    await conn.sendMessage(m.chat, {
                        video: { url: normalQualityUrl },
                        caption: TIKTOK2_NORMAL_QUALITY_CAPTION
                    }, {
                        quoted: m
                    });
                    await conn.sendMessage(m.chat, {
                        video: { url: hdQualityUrl },
                        caption: TIKTOK2_HD_QUALITY_CAPTION
                    }, {
                        quoted: m
                    });
                    await m.react('✅');
                }
                catch (e) {
                    await m.react('✖️');
                    conn.reply(m.chat, TIKTOK2_ERROR, m);
                }
            }
        }
    ];
}
export default Tiktok2Plugin;
//# sourceMappingURL=barboza-tiktok2.js.map