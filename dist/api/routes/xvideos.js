import { Router } from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
const xvideosRouter = Router();
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
xvideosRouter.get('/download', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        const result = await xvideosdl(url);
        if (result.status !== 200) {
            return res.status(500).json({ error: 'Failed to download xvideos' });
        }
        res.json({
            status: true,
            result: result.result
        });
    }
    catch (error) {
        console.error('Xvideos API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default xvideosRouter;
//# sourceMappingURL=xvideos.js.map