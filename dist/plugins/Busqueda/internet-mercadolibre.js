import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { MERCADOLIBRE_NO_TEXT, MERCADOLIBRE_HEADER, MERCADOLIBRE_ITEM_TITLE, MERCADOLIBRE_ITEM_STATE, MERCADOLIBRE_ITEM_LINK, MERCADOLIBRE_ITEM_SEPARATOR, MERCADOLIBRE_ERROR } from '../../content/busqueda/mercadolibre-responses';
async function mercado(query) {
    try {
        const url = `https://listado.mercadolibre.com.pe/${query}`;
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const results = $('.ui-search-layout__item').map((i, element) => {
            const title = $(element).find('.ui-search-item__title').text();
            const state = $(element).find('.ui-search-item__group__element').last().text().trim();
            const link = $(element).find('a').attr('href');
            return {
                title,
                state,
                link
            };
        }).get();
        return results;
    }
    catch (error) {
        console.error("Error en mercado:", error);
        throw new Error(MERCADOLIBRE_ERROR);
    }
}
class MercadoLibreSearchPlugin {
    name = "MercadoLibreSearchPlugin";
    commands = [
        {
            name: "mercadolibre",
            alias: [],
            desc: "Busca productos en MercadoLibre.",
            category: "Busqueda",
            react: "🛍️",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                try {
                    if (!text) {
                        return conn.reply(m.chat, MERCADOLIBRE_NO_TEXT, m, rcanal);
                    }
                    let res = await mercado(text);
                    let libre = MERCADOLIBRE_HEADER;
                    const limit = 15;
                    for (let i = 0; i < limit && i < res.length; i++) {
                        let link = res[i].link.length > 30 ? res[i].link.substring(0, 30) + '...' : res[i].link;
                        libre += `${MERCADOLIBRE_ITEM_TITLE} ${res[i].title}\n${MERCADOLIBRE_ITEM_STATE} ${res[i].state}\n${MERCADOLIBRE_ITEM_LINK} ${res[i].link}\n`;
                        libre += MERCADOLIBRE_ITEM_SEPARATOR;
                    }
                    conn.reply(m.chat, libre, m, rcanal);
                }
                catch (error) {
                    console.error("Error en MercadoLibreSearchPlugin:", error);
                    conn.reply(m.chat, MERCADOLIBRE_ERROR, m, rcanal);
                }
            }
        }
    ];
}
export default MercadoLibreSearchPlugin;
//# sourceMappingURL=internet-mercadolibre.js.map