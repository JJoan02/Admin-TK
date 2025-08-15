import { Command } from '../../core/Command.js';
import google from 'google-it';
import { googleSearchMessages } from '../../lib/internet-content.js';
class GoogleSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('google', 'Realiza una búsqueda en Google.');
        this.#logger = logger;
        this.commands = ['google'];
    }
    async execute(context) {
        const { m, conn, args } = context;
        const text = args.join(' ');
        if (!text) {
            await conn.reply(m.chat, googleSearchMessages.noText, m);
            return;
        }
        try {
            await conn.reply(m.chat, googleSearchMessages.processing, m, {
                contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                        title: global.packname,
                        body: global.dev,
                        previewType: 0, thumbnail: global.icons,
                        sourceUrl: global.channel } }
            });
        }
        finally { }
        ;
        const res = await google({ 'query': text });
        let teks = googleSearchMessages.resultHeader(text);
        for (let g of res) {
            teks += googleSearchMessages.resultItem(g.title, g.snippet, g.link);
        }
        await conn.reply(m.chat, teks, m, global.rcanal);
    }
    catch(e) {
        this.#logger.error(`Error in GoogleSearchCommand: ${e.message}`);
        await conn.reply(m.chat, `Ocurrió un error al realizar la búsqueda.`, m);
    }
}
export default GoogleSearchCommand;
//# sourceMappingURL=GoogleSearchCommand.js.map