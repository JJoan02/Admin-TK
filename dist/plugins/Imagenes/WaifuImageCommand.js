import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { waifuImageMessages } from '../../lib/imagenes-content.js';
class WaifuImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('waifu', 'Obtiene una imagen aleatoria de Waifu.');
        this.#logger = logger;
        this.commands = ['waifu'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react('🕓');
            const res = await fetch('https://api.waifu.pics/sfw/waifu');
            if (!res.ok)
                throw new Error(`API request failed with status ${res.status}`);
            const json = await res.json();
            if (!json.url)
                throw new Error('No URL found in API response.');
            await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', waifuImageMessages.success, m, null);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in WaifuImageCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, waifuImageMessages.error, m);
        }
    }
}
export default WaifuImageCommand;
//# sourceMappingURL=WaifuImageCommand.js.map