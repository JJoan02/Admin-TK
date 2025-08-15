import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import cheerio from 'cheerio';
import hispamemes from 'hispamemes';
import { MEDIAFIRE_NO_LINK, MEDIAFIRE_INVALID_LINK, MEDIAFIRE_NO_INFO, MEDIAFIRE_INFO, MEDIAFIRE_ERROR } from '../../content/descargas/mediafire-responses';
class MediafirePlugin {
    name = "MediafirePlugin";
    commands = [
        {
            name: "mediafire",
            alias: ["mf", "mfdl"],
            desc: "Descarga un archivo de Mediafire.",
            category: "Descargas",
            react: "📥",
            execute: async (Yaka, m, { conn, usedPrefix, command, text }) => {
                if (!text) {
                    return conn.reply(m.chat, MEDIAFIRE_NO_LINK(usedPrefix, command), m);
                }
                if (!text.match(/(https:\/\/www.mediafire.com\/)/gi)) {
                    return conn.reply(m.chat, MEDIAFIRE_INVALID_LINK, m);
                }
                m.react('🕒');
                try {
                    const json = await (await axios.get(`https://api.sylphy.xyz/download/mediafire?url=${text}&apikey=tesis-te-amo`)).json();
                    if (!json.data || !json.data.download) {
                        return conn.reply(m.chat, MEDIAFIRE_NO_INFO, m);
                    }
                    let info = MEDIAFIRE_INFO(json.data.filename, json.data.size, text, json.data.mimetype);
                    m.reply(info);
                    await conn.sendFile(m.chat, json.data.download, json.data.filename, "", m);
                }
                catch (e) {
                    console.error("Error en el comando mediafire:", e);
                    return conn.reply(m.chat, MEDIAFIRE_ERROR(e.message), m);
                }
            }
        }
    ];
}
export default MediafirePlugin;
//# sourceMappingURL=_antiara.js.map