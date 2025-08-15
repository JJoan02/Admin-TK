import { animeContent } from './anime-content';
import fetch from 'node-fetch';
class AnimeInfoPlugin {
    name = "AnimeInfoPlugin";
    commands = [
        {
            name: "animeinfo",
            alias: ["anime"],
            desc: "Busca información sobre un anime.",
            category: "Anime",
            react: "ℹ️",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    return conn.reply(m.chat, `Por favor, proporciona el nombre de un anime para buscar. Ejemplo: ${usedPrefix + command} Naruto`, m);
                try {
                    await conn.sendMessage(m.chat, { text: animeContent.searching }, { quoted: m });
                    const res = await fetch(`${animeContent.apiUrls.jikan}/anime?q=${encodeURIComponent(text)}&sfw`);
                    if (!res.ok)
                        throw new Error(`HTTP error! status: ${res.status}`);
                    const json = await res.json();
                    const anime = json.data[0];
                    if (!anime) {
                        return await conn.sendMessage(m.chat, { text: animeContent.noResults }, { quoted: m });
                    }
                    const caption = `
*${animeContent.animeInfo.title}:* ${anime.title}
*${animeContent.animeInfo.synopsis}:* ${anime.synopsis}
*${animeContent.animeInfo.episodes}:* ${anime.episodes}
*${animeContent.animeInfo.status}:* ${anime.status}
*${animeContent.animeInfo.rating}:* ${anime.score}
*${animeContent.animeInfo.url}:* ${anime.url}
          `.trim();
                    await conn.sendMessage(m.chat, { image: { url: anime.images.jpg.large_image_url }, caption: caption }, { quoted: m });
                }
                catch (error) {
                    console.error(error);
                    await conn.sendMessage(m.chat, { text: animeContent.error }, { quoted: m });
                }
            }
        }
    ];
}
export default AnimeInfoPlugin;
//# sourceMappingURL=AnimeInfoCommand.js.map