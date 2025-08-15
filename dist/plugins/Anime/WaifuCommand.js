import { animeContent } from './anime-content';
import fetch from 'node-fetch';
export default class WaifuCommand {
    command = ['waifu'];
    description = 'Envia una imagen de waifu aleatoria.';
    async execute(m, { conn }) {
        try {
            await conn.sendMessage(m.chat, { text: animeContent.sendingImage }, { quoted: m });
            const res = await fetch(`${animeContent.apiUrls.waifuPics}/waifu`);
            if (!res.ok)
                throw new Error(`HTTP error! status: ${res.status}`);
            const json = await res.json();
            const imageUrl = json.url;
            if (!imageUrl) {
                return await conn.sendMessage(m.chat, { text: animeContent.noResults }, { quoted: m });
            }
            await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `💕` }, { quoted: m });
        }
        catch (error) {
            console.error(error);
            await conn.sendMessage(m.chat, { text: animeContent.error }, { quoted: m });
        }
    }
}
//# sourceMappingURL=WaifuCommand.js.map