import axios from 'axios';
import { MESSI_CAPTION, MESSI_ERROR } from '../../content/anime/messi-responses';
class AnimeMessiPlugin {
    name = "AnimeMessiPlugin";
    commands = [
        {
            name: 'messi',
            alias: [],
            desc: 'Obtiene una imagen aleatoria de Messi.',
            category: 'Anime',
            react: '⚽',
            execute: async (Yaka, m, { conn }) => {
                try {
                    let res = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/Messi.json`)).data;
                    let url = res[Math.floor(Math.random() * res.length)];
                    await conn.sendMessage(m.chat, {
                        image: { url },
                        caption: MESSI_CAPTION,
                        viewOnce: true
                    }, { quoted: m });
                }
                catch (e) {
                    console.error('Error in AnimeMessiPlugin:', e);
                    await conn.reply(m.chat, MESSI_ERROR(e.message), m);
                }
            }
        }
    ];
}
export default AnimeMessiPlugin;
//# sourceMappingURL=AnimeMessiCommand.js.map