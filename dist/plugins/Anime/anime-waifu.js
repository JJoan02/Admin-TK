import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { WAIFU_ERROR } from '../../content/anime/waifu-responses';
class WaifuPlugin {
    name = "WaifuPlugin";
    commands = [
        {
            name: "waifu",
            alias: [],
            desc: "Obtiene una imagen aleatoria de waifu.",
            category: "Anime",
            react: "💖",
            execute: async (Yaka, m, { conn }) => {
                try {
                    let res = await fetch('https://api.waifu.pics/sfw/waifu');
                    if (!res.ok)
                        throw new Error('Failed to fetch waifu image');
                    let json = await res.json();
                    if (!json.url)
                        throw new Error('No URL found in response');
                    await conn.sendFile(m.chat, json.url, 'waifu.jpg', '', m);
                }
                catch (e) {
                    console.error("Error al obtener la imagen de waifu:", e);
                    conn.reply(m.chat, WAIFU_ERROR, m);
                }
            }
        }
    ];
}
export default WaifuPlugin;
//# sourceMappingURL=anime-waifu.js.map