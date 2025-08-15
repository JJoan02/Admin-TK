import express from 'express';
import youtubeRouter from './youtube';
import tiktokRouter from './routes/tiktok';
import danbooruRouter from './routes/danbooru';
import tiktokSearchRouter from './routes/tiktok-search';
import youtubeSearchRouter from './routes/youtube-search';
import xvideosRouter from './routes/xvideos';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/api/youtube', youtubeRouter);
app.use('/api/tiktok', tiktokRouter);
app.use('/api/danbooru', danbooruRouter);
app.use('/api/tiktok/search', tiktokSearchRouter);
app.use('/api/youtube/search', youtubeSearchRouter);
app.use('/api/xvideos', xvideosRouter);
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'API is running', timestamp: new Date() });
});
export const startApiServer = () => {
    app.listen(port, () => {
        console.log(`API listening on port ${port}`);
    });
};
//# sourceMappingURL=index.js.map