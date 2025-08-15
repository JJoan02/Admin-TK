import axios from 'axios';
import { RONALDO_CAPTION, RONALDO_ERROR, RONALDO_BUTTON_TEXT } from '../../content/anime/ronaldo-responses';
class AnimeRonaldoPlugin {
    name = "AnimeRonaldoPlugin";
    commands = [
        {
            name: 'ronaldo',
            alias: ['cr7'],
            desc: 'Obtiene una imagen aleatoria de Cristiano Ronaldo.',
            category: 'Anime',
            react: '⚽',
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                try {
                    let cristiano = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json`)).data;
                    let ronaldo = cristiano[Math.floor(Math.random() * cristiano.length)];
                    const buttons = [
                        {
                            buttonId: `${usedPrefix + command}`,
                            buttonText: { displayText: RONALDO_BUTTON_TEXT },
                            type: 1
                        }
                    ];
                    await conn.sendMessage(m.chat, {
                        image: { url: ronaldo },
                        caption: RONALDO_CAPTION,
                        buttons: buttons,
                        viewOnce: true
                    }, { quoted: m });
                }
                catch (e) {
                    console.error('Error in AnimeRonaldoPlugin:', e);
                    await conn.reply(m.chat, RONALDO_ERROR(e.message), m);
                }
            }
        }
    ];
}
export default AnimeRonaldoPlugin;
//# sourceMappingURL=AnimeRonaldoCommand.js.map