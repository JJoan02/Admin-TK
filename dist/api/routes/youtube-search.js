import { Router } from 'express';
import yts from 'yt-search';
const youtubeSearchRouter = Router();
youtubeSearchRouter.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    try {
        const searchResults = await yts(query);
        res.json({
            status: true,
            result: searchResults.videos
        });
    }
    catch (error) {
        console.error('YouTube Search API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default youtubeSearchRouter;
//# sourceMappingURL=youtube-search.js.map