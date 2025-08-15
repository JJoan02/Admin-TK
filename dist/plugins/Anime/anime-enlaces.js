import { ICommand, IPluginModule } from '../../types/plugin';
import { ANIME_LINKS_HEADER, ANIME_LINKS_FOOTER, ANIME_WEBSITES } from '../../content/anime/anime-links-responses';
class AnimeLinksPlugin {
    name = "AnimeLinksPlugin";
    commands = [
        {
            name: "animelink",
            alias: [],
            desc: "Muestra una lista de enlaces relacionados con el anime.",
            category: "Anime",
            react: "🔗",
            execute: async (Yaka, m, { conn }) => {
                const websiteList = ANIME_WEBSITES.map(link => `┃ ❖ ${link}`).join('\n');
                const message = `${ANIME_LINKS_HEADER}\n${websiteList}\n${ANIME_LINKS_FOOTER}\n`;
                conn.reply(m.chat, message, m, rcanal);
            }
        }
    ];
}
export default AnimeLinksPlugin;
//# sourceMappingURL=anime-enlaces.js.map