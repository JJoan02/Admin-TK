import { Command } from '../../core/Command.js';
import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import { scriptInfoMessages } from '../../lib/informacion-content.js';
class ScriptInfoCommand extends Command {
    #logger;
    #config;
    constructor(logger, config) {
        super('sc', 'Muestra información del script del bot.');
        this.#logger = logger;
        this.#config = config;
        this.commands = ['runtime', 'sc', 'activo'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            const githubRepoUrl = this.#config.script.githubRepoUrl;
            const res = await fetch(githubRepoUrl);
            const json = await res.json();
            const runtimeSeconds = process.uptime();
            const days = Math.floor(runtimeSeconds / (3600 * 24));
            const hours = Math.floor((runtimeSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((runtimeSeconds % 3600) / 60);
            const seconds = Math.floor(runtimeSeconds % 60);
            let teks = scriptInfoMessages.header;
            teks += scriptInfoMessages.name(json?.name || 'GataBot-MD');
            teks += scriptInfoMessages.watchers(json?.watchers_count || '-');
            teks += scriptInfoMessages.updated(moment(json?.updated_at).format('DD/MM/YY - HH:mm:ss') || '-');
            teks += scriptInfoMessages.url(json?.html_url || 'https://github.com/GataNina-Li/GataBot-MD');
            teks += scriptInfoMessages.stats(json?.forks_count || '-', json?.stargazers_count || '-', json?.open_issues_count || '-');
            teks += scriptInfoMessages.uptimeHeader;
            teks += scriptInfoMessages.uptime(days, hours, minutes, seconds);
            const prep = generateWAMessageFromContent(m.chat, {
                orderMessage: {
                    itemCount: -10062007,
                    status: 500,
                    surface: 999,
                    message: teks,
                    description: '^^^',
                    orderTitle: 'Hi Sis',
                    token: '9',
                    curreyCode: 'IDR',
                    totalCurrencyCode: '>~<',
                    totalAmount1000: '1000000',
                    sellerJid: global.md,
                    thumbnail: global.gataImg
                }
            }, { contextInfo: null, quoted: m });
            await conn.relayWAMessage(prep);
        }
        catch (e) {
            this.#logger.error(`Error in ScriptInfoCommand: ${e.message}`);
            await conn.reply(m.chat, 'Ocurrió un error al obtener la información del script.', m);
        }
    }
}
export default ScriptInfoCommand;
//# sourceMappingURL=ScriptInfoCommand.js.map