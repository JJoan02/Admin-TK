import { ICommand, IPluginModule } from '../../types/plugin';
import translate from '@vitalets/google-translate-api';
import { Anime } from '@shineiichijo/marika';
import { ANIME_INFO_SEARCH_NO_TEXT, ANIME_INFO_SEARCH_HEADER, ANIME_INFO_SEARCH_TITLE, ANIME_INFO_SEARCH_EPISODES, ANIME_INFO_SEARCH_SOURCE, ANIME_INFO_SEARCH_AIRED, ANIME_INFO_SEARCH_POPULARITY, ANIME_INFO_SEARCH_FAVORITES, ANIME_INFO_SEARCH_DURATION, ANIME_INFO_SEARCH_RATING, ANIME_INFO_SEARCH_TRAILER, ANIME_INFO_SEARCH_URL, ANIME_INFO_SEARCH_BUTTON_SEARCHES, ANIME_INFO_SEARCH_BUTTON_FULL_MENU, ANIME_INFO_SEARCH_BUTTON_BACK_TO_MENU, ANIME_INFO_SEARCH_ERROR_REPORT } from '../../content/busqueda/anime-info-search-responses';
const client = new Anime();
class BuscadorAnimeInfoPlugin {
    name = "BuscadorAnimeInfoPlugin";
    commands = [
        {
            name: "anime",
            alias: ["animeinfo"],
            desc: "Busca información sobre un anime.",
            category: "Busqueda",
            react: "🔍",
            execute: async (Yaka, m, { conn, text, command, usedPrefix }) => {
                if (!text)
                    return m.reply(ANIME_INFO_SEARCH_NO_TEXT);
                try {
                    const anime = await client.searchAnime(text);
                    const result = anime.data[0];
                    const resultes = await translate(`${result.background}`, { to: 'es', autoCorrect: true });
                    const resultes2 = await translate(`${result.synopsis}`, { to: 'es', autoCorrect: true });
                    const AnimeInfo = `${ANIME_INFO_SEARCH_HEADER}\n` +
                        `${ANIME_INFO_SEARCH_TITLE} ${result.title}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈   \n` +
                        `${ANIME_INFO_SEARCH_EPISODES} ${result.episodes}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_SOURCE} ${result.source.toUpperCase()}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_AIRED} ${result.aired.from}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_POPULARITY} ${result.popularity}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_FAVORITES} ${result.favorites}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_DURATION} ${result.duration}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_RATING} ${result.rating}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_TRAILER} ${result.trailer.url}\n` +
                        `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n` +
                        `${ANIME_INFO_SEARCH_URL} ${result.url}`;
                    conn.sendButton(m.chat, AnimeInfo, null, result.images.jpg.image_url, [
                        [ANIME_INFO_SEARCH_BUTTON_SEARCHES, '#buscarmenu'],
                        [ANIME_INFO_SEARCH_BUTTON_FULL_MENU, '.allmenu'],
                        [ANIME_INFO_SEARCH_BUTTON_BACK_TO_MENU, '/menu']
                    ], null, [['Instagram', global.ig]], m);
                }
                catch (e) {
                    await conn.reply(m.chat, ANIME_INFO_SEARCH_ERROR_REPORT(usedPrefix, command), global.fkontak, m);
                    console.log(`❗❗ ${ANIME_INFO_SEARCH_ERROR_REPORT(usedPrefix, command)} ❗❗`);
                    console.log(e);
                }
            }
        }
    ];
}
export default BuscadorAnimeInfoPlugin;
//# sourceMappingURL=buscador-animeinfo.js.map