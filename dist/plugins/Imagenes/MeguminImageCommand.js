import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { meguminImageMessages } from '../../lib/imagenes-content.js';
class MeguminImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('megumin', 'Obtiene una imagen aleatoria de Megumin.');
        this.#logger = logger;
        this.commands = ['megumin'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react('🕓');
            const res = await fetch('https://api.waifu.pics/sfw/megumin');
            if (!res.ok)
                throw new Error(`API request failed with status ${res.status}`);
            const json = await res.json();
            if (!json.url)
                throw new Error('No URL found in API response.');
            await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', meguminImageMessages.success, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in MeguminImageCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, meguminImageMessages.error, m);
        }
    }
}
export default MeguminImageCommand;
//# sourceMappingURL=MeguminImageCommand.js.map