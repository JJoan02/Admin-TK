import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { shinobuImageMessages } from '../../lib/imagenes-content.js';
class ShinobuImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('shinobu', 'Obtiene una imagen aleatoria de Shinobu.');
        this.#logger = logger;
        this.commands = ['shinobu'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react('🕓');
            const res = await fetch('https://api.waifu.pics/sfw/shinobu');
            if (!res.ok)
                throw new Error(`API request failed with status ${res.status}`);
            const json = await res.json();
            if (!json.url)
                throw new Error('No URL found in API response.');
            await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', shinobuImageMessages.success, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in ShinobuImageCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, shinobuImageMessages.error, m);
        }
    }
}
export default ShinobuImageCommand;
//# sourceMappingURL=ShinobuImageCommand.js.map