import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import * as cheerio from 'cheerio';
import qs from 'qs';
import { APPLE_MUSIC_DOWNLOAD_USAGE, APPLE_MUSIC_DOWNLOAD_NO_RESULTS, APPLE_MUSIC_DOWNLOAD_ERROR_PROCESSING, APPLE_MUSIC_DOWNLOAD_NO_MUSIC_DATA, APPLE_MUSIC_DOWNLOAD_ERROR_FETCHING_DATA, APPLE_MUSIC_DOWNLOAD_ERROR_DOWNLOADING_MUSIC, APPLE_MUSIC_DOWNLOAD_ERROR_GETTING_AUDIO } from '../../content/descargas/apple-music-download-responses';
class AppleMusicDownloadPlugin {
    name = "AppleMusicDownloadPlugin";
    commands = [
        {
            name: "applemusic",
            alias: [],
            desc: "Busca y descarga música de Apple Music.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, APPLE_MUSIC_DOWNLOAD_USAGE(usedPrefix, command), m);
                }
                try {
                    await m.react('🕒');
                    const searchResults = await AppleMusicDownloadPlugin.appleMusicSearch(text);
                    if (!searchResults.length) {
                        await conn.reply(m.chat, APPLE_MUSIC_DOWNLOAD_NO_RESULTS, m);
                        await m.react('✖️');
                        return;
                    }
                    const musicData = await AppleMusicDownloadPlugin.appleMusicDownload(searchResults[0].link);
                    if (!musicData.success) {
                        await conn.reply(m.chat, `Error: ${musicData.message}`, m);
                        await m.react('✖️');
                        return;
                    }
                    const { name, albumname, artist, url, thumb, download } = musicData;
                    const doc = {
                        audio: { url: download },
                        mimetype: 'audio/mp4',
                        fileName: `${name}.mp3`,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                mediaType: 2,
                                mediaUrl: url,
                                title: name,
                                sourceUrl: url,
                                thumbnail: await (await conn.getFile(thumb)).data
                            }
                        }
                    };
                    await conn.sendMessage(m.chat, doc, { quoted: m });
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al descargar de Apple Music: ${e.message}`);
                    await conn.reply(m.chat, APPLE_MUSIC_DOWNLOAD_ERROR_PROCESSING, m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static async appleMusicSearch(query) {
        const url = `https://music.apple.com/us/search?term=${encodeURIComponent(query)}`;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const results = [];
            $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
                const title = $(element).find('.top-search-lockup__primary__title').text().trim();
                const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
                const link = $(element).find('.click-action').attr('href');
                results.push({ title, subtitle, link });
            });
            return results;
        }
        catch (error) {
            console.error(`Error en #appleMusicSearch: ${error.message}`);
            throw error;
        }
    }
    static async appleMusicDownload(url) {
        const appledownApiUrl = `https://aaplmusicdownloader.com/api/applesearch.php?url=${url}`;
        try {
            const response = await axios.get(appledownApiUrl, {
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': 'MyApp/1.0',
                    'Referer': 'https://aaplmusicdownloader.com/'
                }
            });
            const musicData = response.data;
            if (!musicData || !musicData.name) {
                return { success: false, message: APPLE_MUSIC_DOWNLOAD_NO_MUSIC_DATA };
            }
            const encodedData = encodeURIComponent(JSON.stringify([
                musicData.name,
                musicData.albumname,
                musicData.artist,
                musicData.thumb,
                musicData.duration,
                musicData.url
            ]));
            const downloadUrl = 'https://aaplmusicdownloader.com/song.php';
            const headers = {
                'authority': 'aaplmusicdownloader.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'content-type': 'application/x-www-form-urlencoded',
                'origin': 'https://aaplmusicdownloader.com',
                'referer': 'https://aaplmusicdownloader.com/',
                'user-agent': 'MyApp/1.0'
            };
            const postResponse = await axios.post(downloadUrl, `data=${encodedData}`, { headers });
            const $ = cheerio.load(postResponse.data);
            const trackName = $('td:contains("Track Name:")').next().text();
            const albumName = $('td:contains("Album:")').next().text();
            const artist = $('td:contains("Artist:")').next().text();
            const thumb = $('figure.image img').attr('src');
            const urlMusic = url;
            const token = $('a#download_btn').attr('token');
            const downloadLink = await AppleMusicDownloadPlugin.getAudio(trackName, artist, urlMusic, token);
            return {
                success: true,
                name: trackName,
                albumname: albumName,
                artist: artist,
                thumb: thumb,
                duration: $('td:contains("Duration:")').next().text(),
                download: downloadLink
            };
        }
        catch (error) {
            console.error(APPLE_MUSIC_DOWNLOAD_ERROR_DOWNLOADING_MUSIC, error.message);
            return { success: false, message: error.message };
        }
    }
    static async getAudio(trackName, artist, urlMusic, token) {
        const url = 'https://aaplmusicdownloader.com/api/composer/swd.php';
        const data = {
            song_name: trackName,
            artist_name: artist,
            url: urlMusic,
            token: token
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'MyApp/1.0',
            'Referer': 'https://aaplmusicdownloader.com/song.php#'
        };
        try {
            const response = await axios.post(url, qs.stringify(data), { headers });
            return response.data.dlink;
        }
        catch (error) {
            console.error(APPLE_MUSIC_DOWNLOAD_ERROR_GETTING_AUDIO, error.message);
            return { success: false, message: error.message };
        }
    }
}
export default AppleMusicDownloadPlugin;
//# sourceMappingURL=AppleMusicDownloadCommand.js.map