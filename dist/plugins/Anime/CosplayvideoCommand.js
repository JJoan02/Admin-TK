import { animeContent } from './anime-content';
import fetch from 'node-fetch';
class CosplayVideoPlugin {
    name = "CosplayVideoPlugin";
    commands = [
        {
            name: "cosplayvideo",
            alias: [],
            desc: "Envia un video de cosplay aleatorio.",
            category: "Anime",
            react: "🎥",
            execute: async (Yaka, m, { conn }) => {
                try {
                    await conn.sendMessage(m.chat, { text: animeContent.sendingVideo }, { quoted: m });
                    const res = await fetch(`${animeContent.apiUrls.raiden}/cosplayvideo`);
                    if (!res.ok)
                        throw new Error(`HTTP error! status: ${res.status}`);
                    const json = await res.json();
                    const videoUrl = json.url;
                    if (!videoUrl) {
                        return await conn.sendMessage(m.chat, { text: animeContent.noResults }, { quoted: m });
                    }
                    await conn.sendMessage(m.chat, { video: { url: videoUrl } }, { quoted: m });
                }
                catch (error) {
                    console.error(error);
                    await conn.sendMessage(m.chat, { text: animeContent.error }, { quoted: m });
                }
            }
        }
    ];
}
export default CosplayVideoPlugin;
//# sourceMappingURL=CosplayvideoCommand.js.map