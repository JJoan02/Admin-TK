import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { PELISPLUS_NO_TEXT, PELISPLUS_NO_RESULTS, PELISPLUS_HEADER, PELISPLUS_ITEM_TITLE, PELISPLUS_ITEM_RATING, PELISPLUS_ITEM_LINK, PELISPLUS_ITEM_IMAGE, PELISPLUS_ERROR } from '../../content/descargas/pelisplus-search-responses';
class PelisplusSearchPlugin {
    name = "PelisplusSearchPlugin";
    commands = [
        {
            name: "pelisplussearch",
            alias: ["pelisplus"],
            desc: "Busca películas en Pelisplus.",
            category: "Descargas",
            react: "🎬",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0])
                    return conn.reply(m.chat, PELISPLUS_NO_TEXT(usedPrefix, command), m, rcanal);
                await m.react('🕓');
                try {
                    const response = await axios.get(`https://api.dorratz.com/v2/pelisplus-search?q=${encodeURIComponent(args.join(' '))}`);
                    if (!response.data.status) {
                        return conn.reply(m.chat, PELISPLUS_NO_RESULTS, m);
                    }
                    let peliculas = response.data.peliculas;
                    let txt = PELISPLUS_HEADER;
                    peliculas.forEach((pelicula) => {
                        txt += `${PELISPLUS_ITEM_TITLE} ${pelicula.titulo}\n`;
                        txt += `${PELISPLUS_ITEM_RATING} ${pelicula.rating}\n`;
                        txt += `${PELISPLUS_ITEM_LINK} ${pelicula.link}\n`;
                        txt += `${PELISPLUS_ITEM_IMAGE} ${pelicula.imagen}\n\n`;
                    });
                    await conn.reply(m.chat, txt.trim(), m);
                    await m.react('✅');
                }
                catch (error) {
                    console.error(error);
                    await m.react('✖️');
                    return conn.reply(m.chat, PELISPLUS_ERROR, m);
                }
            }
        }
    ];
}
export default PelisplusSearchPlugin;
//# sourceMappingURL=descargas-pelisplus.js.map