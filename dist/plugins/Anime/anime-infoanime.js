import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { ANIME_INFO_NO_TEXT, ANIME_INFO_FETCH_ERROR, ANIME_INFO_HEADER, ANIME_INFO_TITLE, ANIME_INFO_CHAPTERS, ANIME_INFO_TYPE, ANIME_INFO_STATUS, ANIME_INFO_VOLUMES, ANIME_INFO_FAVORITES, ANIME_INFO_SCORE, ANIME_INFO_MEMBERS, ANIME_INFO_URL, ANIME_INFO_AUTHOR, ANIME_INFO_BACKGROUND, ANIME_INFO_SYNOPSIS } from '../../content/anime/anime-info-responses';
class AnimeInfoPlugin {
    name = "AnimeInfoPlugin";
    commands = [
        {
            name: "infoanime",
            alias: ["animeinfo"],
            desc: "Obtiene información detallada sobre un anime.",
            category: "Anime",
            react: "ℹ️",
            execute: async (Yaka, m, { conn, usedPrefix, command, text }) => {
                if (!text) {
                    return conn.reply(m.chat, ANIME_INFO_NO_TEXT, m, rcanal);
                }
                let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text);
                if (!res.ok) {
                    return conn.reply(m.chat, ANIME_INFO_FETCH_ERROR, m, rcanal);
                }
                let json = await res.json();
                if (!json.data || json.data.length === 0) {
                    return conn.reply(m.chat, ANIME_INFO_FETCH_ERROR, m, rcanal);
                }
                let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } = json.data[0];
                let author = json.data[0].authors[0].name;
                let animeingfo = `${ANIME_INFO_TITLE} ${title_japanese}\n` +
                    `${ANIME_INFO_CHAPTERS} ${chapters}\n` +
                    `${ANIME_INFO_TYPE} ${type}\n` +
                    `${ANIME_INFO_STATUS} ${status}\n` +
                    `${ANIME_INFO_VOLUMES} ${volumes}\n` +
                    `${ANIME_INFO_FAVORITES} ${favorites}\n` +
                    `${ANIME_INFO_SCORE} ${score}\n` +
                    `${ANIME_INFO_MEMBERS} ${members}\n` +
                    `${ANIME_INFO_URL} ${url}\n` +
                    `${ANIME_INFO_AUTHOR} ${author}\n` +
                    `${ANIME_INFO_BACKGROUND} ${background}\n` +
                    `${ANIME_INFO_SYNOPSIS} ${synopsis}\n`;
                conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'anjime.jpg', ANIME_INFO_HEADER + animeingfo, fkontak, m);
            }
        }
    ];
}
export default AnimeInfoPlugin;
//# sourceMappingURL=anime-infoanime.js.map