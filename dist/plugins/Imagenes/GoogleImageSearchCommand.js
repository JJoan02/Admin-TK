import { Command } from '../../core/Command.js';
import Starlights from "@StarlightsTeam/Scraper";
import { googleImageSearchMessages, prohibitedWords } from '../../lib/imagenes-content.js';
class GoogleImageSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('image', 'Busca imágenes en Google.');
        this.#logger = logger;
        this.commands = ['image', 'gimage', 'imagen'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, googleImageSearchMessages.noText(usedPrefix, command), m);
            return;
        }
        if (prohibitedWords.some(word => text.toLowerCase().includes(word))) {
            await conn.reply(m.chat, googleImageSearchMessages.prohibitedWord, m);
            await m.react('✖️');
            return;
        }
        try {
            await m.react('🕓');
            const { dl_url } = await Starlights.GoogleImage(text);
            await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', googleImageSearchMessages.result(text), m, null);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in GoogleImageSearchCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, googleImageSearchMessages.error, m);
        }
    }
}
export default GoogleImageSearchCommand;
//# sourceMappingURL=GoogleImageSearchCommand.js.map