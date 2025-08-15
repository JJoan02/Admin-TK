import { Router } from 'express';
import fetch from "node-fetch";
const tiktokSearchRouter = Router();
tiktokSearchRouter.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status && data.data && data.data.length > 0) {
            res.json({
                status: true,
                result: data.data.slice(0, 5)
            });
        }
        else {
            res.json({ status: false, error: 'No results found' });
        }
    }
    catch (error) {
        console.error('TikTok Search API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default tiktokSearchRouter;
//# sourceMappingURL=tiktok-search.js.map