import { animeContent } from './anime-content';
import fetch from 'node-fetch';
class AnimeLinksPlugin {
    name = "AnimeLinksPlugin";
    commands = [
        {
            name: "animelinks",
            alias: ["enlacesanime"],
            desc: "Busca enlaces de un anime.",
            category: "Anime",
            react: "🔗",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    return conn.reply(m.chat, `Por favor, proporciona el nombre de un anime. Ejemplo: ${usedPrefix + command} Kimetsu no Yaiba`, m);
                try {
                    await conn.sendMessage(m.chat, { text: animeContent.searching }, { quoted: m });
                    const res = await fetch(`${animeContent.apiUrls.delirius}/anime/urls/${encodeURIComponent(text)}`);
                    if (!res.ok)
                        throw new Error(`HTTP error! status: ${res.status}`);
                    const json = await res.json();
                    if (!json.urls || json.urls.length === 0) {
                        return await conn.sendMessage(m.chat, { text: animeContent.noResults }, { quoted: m });
                    }
                    let links = `*Enlaces para ${json.title}*\n\n`;
                    json.urls.forEach((site) => {
                        links += `*${site.name}:* ${site.url}\n`;
                    });
                    await conn.sendMessage(m.chat, { text: links.trim() }, { quoted: m });
                }
                catch (error) {
                    console.error(error);
                    await conn.sendMessage(m.chat, { text: animeContent.error }, { quoted: m });
                }
            }
        }
    ];
}
export default AnimeLinksPlugin;
//# sourceMappingURL=AnimeLinksCommand.js.map