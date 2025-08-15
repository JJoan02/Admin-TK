import { Command } from '../../core/Command.js';
import Starlights from "@StarlightsTeam/Scraper";
import { pinterestSearchMessages } from '../../lib/imagenes-content.js';
class PinterestSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('pinterest', 'Busca imágenes en Pinterest.');
        this.#logger = logger;
        this.commands = ['pinterest'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, pinterestSearchMessages.noText(usedPrefix, command), m);
            return;
        }
        try {
            await m.react('🕓');
            const { dl_url } = await Starlights.pinterest(text);
            await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', pinterestSearchMessages.result(text), m, null);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in PinterestSearchCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, pinterestSearchMessages.error, m);
        }
    }
}
export default PinterestSearchCommand;
//# sourceMappingURL=PinterestSearchCommand.js.map