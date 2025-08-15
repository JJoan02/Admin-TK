import { Router } from 'express';
import axios from "axios";
import FormData from "form-data";
import * as cheerio from 'cheerio';
const tiktokRouter = Router();
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
tiktokRouter.get('/video', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        let data = await tiktokdl(url);
        if (!data.status) {
            return res.status(500).json({ error: data.message || 'Failed to download TikTok video' });
        }
        res.json({
            status: true,
            result: {
                normalQuality: data.server1.url,
                hdQuality: data.serverHD.url,
                caption: data.caption
            }
        });
    }
    catch (error) {
        console.error('TikTok Video API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
tiktokRouter.get('/audio', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        let api = `https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${encodeURIComponent(url)}`;
        let response = await fetch(api);
        if (!response.ok) {
            const errorJson = await response.json();
            return res.status(response.status).json({ error: errorJson.message || 'API error' });
        }
        let json = await response.json();
        let audioUrl = json.results?.audio;
        let title = json.results?.title || 'TikTok Audio';
        if (!audioUrl) {
            return res.status(500).json({ error: 'No audio found for this TikTok URL.' });
        }
        res.json({
            status: true,
            result: {
                audioUrl,
                title
            }
        });
    }
    catch (error) {
        console.error('TikTok Audio API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default tiktokRouter;
//# sourceMappingURL=tiktok.js.map