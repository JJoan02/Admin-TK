import { Command } from '../../core/CommandBus.js';
import fetch from 'node-fetch';
import { busquedaContent } from '../content/busqueda-content.js';
export class YahooSearchCommand extends Command {
    constructor() {
        super();
        this.name = 'yahoosearch';
        this.description = 'Realiza una búsqueda en Yahoo.';
        this.commands = ['yahoosearch', 'yahoos'];
        this.tags = ['buscador'];
        this.help = ['yahoosearch <query>'];
    }
    async execute(context) {
        const { conn, m, args } = context;
        if (!args[0]) {
            return conn.reply(m.chat, busquedaContent.yahooSearch.noText, m);
        }
        try {
            let api = await (await fetch(`https://archive-ui.tanakadomp.biz.id/search/yahoosearch?q=${args[0]}`)).json();
            let moon = busquedaContent.yahooSearch.resultHeader + '\n';
            for (let i = 0; i < (5 <= api.result.length ? 5 : api.result.length); i++) {
                let force = api.result[i];
                moon += `\n\n${busquedaContent.yahooSearch.resultItem(force.title, force.link, force.snippet)}`;
                moon += `\n───── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─────`;
            }
            conn.sendMessage(m.chat, { text: moon }, { quoted: m });
        }
        catch (e) {
            console.error(e);
            m.reply(busquedaContent.yahooSearch.errorApi);
            m.react('✖️');
        }
    }
}
//# sourceMappingURL=YahooSearchCommand.js.map