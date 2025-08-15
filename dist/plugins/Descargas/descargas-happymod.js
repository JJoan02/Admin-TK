import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { HAPPYMOD_NO_TEXT, HAPPYMOD_NO_RESULTS, HAPPYMOD_INFO_HEADER, HAPPYMOD_INFO_DESCRIPTION, HAPPYMOD_INFO_STARS, HAPPYMOD_INFO_LINK, HAPPYMOD_ERROR } from '../../content/descargas/happymod-search-responses';
class HappymodSearchPlugin {
    name = "HappymodSearchPlugin";
    commands = [
        {
            name: "happymodsearch",
            alias: ["hpmodseaech", "hpmsearch"],
            desc: "Busca aplicaciones en HappyMod.",
            category: "Descargas",
            react: "🎮",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    return m.reply(HAPPYMOD_NO_TEXT(usedPrefix, command));
                try {
                    let api = `https://dark-core-api.vercel.app/api/search/happymod?key=api&text=${text}`;
                    let response = await fetch(api);
                    let json = await response.json();
                    let arch = json.results[0];
                    if (!arch || arch.length === 0) {
                        return m.reply(HAPPYMOD_NO_RESULTS(text));
                    }
                    m.react('🕑');
                    let txt = `${HAPPYMOD_INFO_HEADER} ${arch.name}\n` +
                        `${HAPPYMOD_INFO_DESCRIPTION} ${arch.description}\n` +
                        `${HAPPYMOD_INFO_STARS} ${arch.stars}\n` +
                        `${HAPPYMOD_INFO_LINK} ${arch.link}`;
                    let img = arch.image;
                    conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: global.fkontak });
                    m.react('✅');
                }
                catch (e) {
                    m.reply(HAPPYMOD_ERROR(e.message));
                    m.react('✖️');
                }
            }
        }
    ];
}
export default HappymodSearchPlugin;
//# sourceMappingURL=descargas-happymod.js.map