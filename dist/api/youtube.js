import { Router } from 'express';
import crypto from "crypto";
import axios from "axios";
import fetch from "node-fetch";
const youtubeRouter = Router();
const decryptData = async (enc) => {
    try {
        const key = Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12', 'hex');
        const data = Buffer.from(enc, 'base64');
        const iv = data.slice(0, 16);
        const content = data.slice(16);
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        let decrypted = decipher.update(content);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    }
    catch (error) {
        return null;
    }
};
const requestApi = async (endpoint, data = {}, method = 'post') => {
    const apiBase = "https://media.savetube.me/api";
    try {
        const { data: response } = await axios({
            method,
            url: `${endpoint.startsWith('http') ? '' : apiBase}${endpoint}`,
            data: method === 'post' ? data : undefined,
            params: method === 'get' ? data : undefined,
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'origin': 'https://yt.savetube.me',
                'referer': 'https://yt.savetube.me/',
                'user-agent': 'Postify/1.0.0'
            }
        });
        return { status: true, data: response };
    }
    catch (error) {
        return { status: false, error: error.message };
    }
};
youtubeRouter.get('/audio', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const youtubeID = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    if (!youtubeID) {
        return res.status(400).json({ error: "Failed to extract video ID from URL." });
    }
    const qualityOptions = ['1080', '720', '480', '360', '240'];
    try {
        const cdnRes = await requestApi("/random-cdn", {}, 'get');
        if (!cdnRes.status)
            return res.status(500).json(cdnRes);
        const cdn = cdnRes.data.cdn;
        const infoRes = await requestApi(`https://${cdn}/v2/info`, { url: `https://www.youtube.com/watch?v=${youtubeID[1]}` });
        if (!infoRes.status)
            return res.status(500).json(infoRes);
        const decrypted = await decryptData(infoRes.data.data);
        if (!decrypted)
            return res.status(500).json({ error: "Failed to decrypt video data." });
        let downloadUrl = null;
        for (const quality of qualityOptions) {
            const downloadRes = await requestApi(`https://${cdn}/download`, {
                id: youtubeID[1],
                downloadType: 'audio',
                quality: quality,
                key: decrypted.key
            });
            if (downloadRes.status && downloadRes.data.data.downloadUrl) {
                downloadUrl = downloadRes.data.data.downloadUrl;
                break;
            }
        }
        if (!downloadUrl) {
            return res.status(500).json({ error: "No se pudo encontrar un enlace de descarga de audio disponible para el video." });
        }
        const fileResponse = await axios.head(downloadUrl);
        const size = fileResponse.headers['content-length'];
        res.json({
            status: true,
            result: {
                title: decrypted.title || "Unknown",
                type: 'audio',
                format: 'mp3',
                download: downloadUrl,
                size: size ? `${(parseInt(size) / 1024 / 1024).toFixed(2)} MB` : 'Unknown'
            }
        });
    }
    catch (error) {
        console.error('YouTube Audio API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
youtubeRouter.get('/video', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!id) {
        return res.status(400).json({ error: "Failed to extract video ID from URL." });
    }
    try {
        const headers = {
            "accept": "*/*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "Referer": "https://id.ytmp3.mobi/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        };
        const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
        const init = await initial.json();
        const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;
        const converts = await fetch(convertURL, { headers });
        const convert = await converts.json();
        let info = {};
        for (let i = 0; i < 3; i++) {
            const progressResponse = await fetch(convert.progressURL, { headers });
            info = await progressResponse.json();
            if (info.progress === 3)
                break;
        }
        res.json({
            status: true,
            result: {
                url: convert.downloadURL,
                title: info.title || "Unknown"
            }
        });
    }
    catch (error) {
        console.error('YouTube Video API Error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default youtubeRouter;
//# sourceMappingURL=youtube.js.map