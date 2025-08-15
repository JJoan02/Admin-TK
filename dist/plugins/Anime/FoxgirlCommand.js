import { animeContent } from './anime-content';
import fetch from 'node-fetch';
class FoxgirlPlugin {
    name = "FoxgirlPlugin";
    commands = [
        {
            name: "foxgirl",
            alias: [],
            desc: "Envia una imagen de foxgirl aleatoria.",
            category: "Anime",
            react: "🦊",
            execute: async (Yaka, m, { conn }) => {
                try {
                    await conn.sendMessage(m.chat, { text: animeContent.sendingImage }, { quoted: m });
                    const res = await fetch(`${animeContent.apiUrls.delirius}/images/foxgirl`);
                    if (!res.ok)
                        throw new Error(`HTTP error! status: ${res.status}`);
                    const json = await res.json();
                    const imageUrl = json.url;
                    if (!imageUrl) {
                        return await conn.sendMessage(m.chat, { text: animeContent.noResults }, { quoted: m });
                    }
                    await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
                }
                catch (error) {
                    console.error(error);
                    await conn.sendMessage(m.chat, { text: animeContent.error }, { quoted: m });
                }
            }
        }
    ];
}
export default FoxgirlPlugin;
//# sourceMappingURL=FoxgirlCommand.js.map