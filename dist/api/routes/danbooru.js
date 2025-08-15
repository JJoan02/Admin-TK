import { Router } from 'express';
import Starlights from "@StarlightsTeam/Scraper";
const danbooruRouter = Router();
danbooruRouter.get('/download', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        const { dl_url } = await Starlights.danbooru(url);
        if (!dl_url) {
            return res.status(500).json({ error: 'No image found for this Danbooru URL.' });
        }
        res.json({
            status: true,
            result: {
                url: dl_url
            }
        });
    }
    catch (error) {
        console.error('Danbooru API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default danbooruRouter;
//# sourceMappingURL=danbooru.js.map