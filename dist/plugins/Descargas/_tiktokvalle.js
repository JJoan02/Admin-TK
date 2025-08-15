import { ICommand, IPluginModule } from '../../types/plugin';
import { TIKTOKVALLE_CAPTION, TIKTOKVALLE_VIDEOS } from '../../content/descargas/tiktokvalle-responses';
class TiktokVallePlugin {
    name = "TiktokVallePlugin";
    commands = [
        {
            name: "tiktokvalle",
            alias: [],
            desc: "Envía un video aleatorio de TikTok de vallenatos.",
            category: "Descargas",
            react: "💔",
            execute: async (Yaka, m, { conn }) => {
                let res = TIKTOKVALLE_VIDEOS[Math.floor(Math.random() * TIKTOKVALLE_VIDEOS.length)];
                await m.react('💔');
                conn.sendMessage(m.chat, { video: { url: res }, caption: TIKTOKVALLE_CAPTION }, { quoted: m });
            }
        }
    ];
}
export default TiktokVallePlugin;
//# sourceMappingURL=_tiktokvalle.js.map