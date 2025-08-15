import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { load } from 'cheerio';
import { APPLE_MUSIC_NO_TEXT, APPLE_MUSIC_NOT_FOUND, APPLE_MUSIC_RESULT_FORMAT, APPLE_MUSIC_ERROR_SEARCH, APPLE_MUSIC_ERROR_GENERIC } from '../../content/busqueda/apple-music-responses';
class AppleMusicSearchPlugin {
    name = "AppleMusicSearchPlugin";
    commands = [
        {
            name: "applemusicsearch",
            alias: ["applemusic", "amusic"],
            desc: "Busca música en Apple Music.",
            category: "Busqueda",
            react: "🎵",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, APPLE_MUSIC_NO_TEXT(usedPrefix, command), m);
                }
                try {
                    await m.react(global.AdminTK_rwait);
                    const searchResults = await AppleMusicSearchPlugin.appleMusicSearch(text);
                    if (!searchResults || searchResults.length === 0) {
                        await conn.reply(m.chat, APPLE_MUSIC_NOT_FOUND(text), m);
                        await m.react('✖️');
                        return;
                    }
                    const formattedResults = searchResults.map((v, i) => APPLE_MUSIC_RESULT_FORMAT(i + 1, v.title, v.link)).join('\n\n');
                    await conn.reply(m.chat, formattedResults, m);
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`${APPLE_MUSIC_ERROR_SEARCH} ${e.message}`);
                    await conn.reply(m.chat, APPLE_MUSIC_ERROR_GENERIC, m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static async appleMusicSearch(query) {
        const url = `https://music.apple.com/us/search?term=${encodeURIComponent(query)}`;
        try {
            const { data } = await axios.get(url);
            const $ = load(data);
            const results = [];
            $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
                const title = $(element).find('.top-search-lockup__primary__title').text().trim();
                const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
                const link = $(element).find('.click-action').attr('href');
                results.push({
                    title,
                    subtitle,
                    link
                });
            });
            return results;
        }
        catch (error) {
            console.error(`Error en #appleMusicSearch: ${error.response ? error.response.data : error.message}`);
            throw error;
        }
    }
}
export default AppleMusicSearchPlugin;
//# sourceMappingURL=AppleMusicSearchCommand.js.map