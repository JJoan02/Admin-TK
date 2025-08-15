import { Command } from '../../core/Command.js';
import axios from 'axios';
import cheerio from 'cheerio';
import { mercadoLibreSearchMessages } from '../../lib/internet-content.js';
class MercadoLibreSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('mercadolibre', 'Busca productos en Mercado Libre.');
        this.#logger = logger;
        this.commands = ['mercadolibre'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, mercadoLibreSearchMessages.invalidFormat(usedPrefix, command), m, global.rcanal);
            return;
        }
        try {
            const res = await this.#mercado(text);
            let libre = mercadoLibreSearchMessages.header;
            const limit = 15;
            for (let i = 0; i < limit && i < res.length; i++) {
                libre += mercadoLibreSearchMessages.item(res[i].title, res[i].state, res[i].link);
                libre += mercadoLibreSearchMessages.separator;
            }
            await conn.reply(m.chat, libre, m, global.rcanal);
        }
        catch (error) {
            this.#logger.error(`Error in MercadoLibreSearchCommand: ${error.message}`);
            await conn.reply(m.chat, `Ocurrió un error al buscar en Mercado Libre.`, m);
        }
    }
    async #mercado(query) {
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
            throw error;
        }
    }
}
export default MercadoLibreSearchCommand;
//# sourceMappingURL=MercadoLibreSearchCommand.js.map