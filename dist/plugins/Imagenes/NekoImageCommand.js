import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { nekoImageMessages, neko2ImageMessages } from '../../lib/imagenes-content.js';
class NekoImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('neko', 'Obtiene una imagen aleatoria de Neko.');
        this.#logger = logger;
        this.commands = ['neko', 'neko2'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        try {
            await m.react('🕓');
            let imageUrl = null;
            if (command === 'neko') {
                const res = await fetch('https://api.waifu.pics/sfw/neko');
                if (!res.ok)
                    throw new Error(`API request failed with status ${res.status}`);
                const json = await res.json();
                if (!json.url)
                    throw new Error('No URL found in API response.');
                imageUrl = json.url;
            }
            else if (command === 'neko2') {
                const response = await fetch('https://nekos.life/api/v2/img/neko');
                const data = await response.json();
                imageUrl = data.url;
            }
            if (imageUrl) {
                await conn.sendFile(m.chat, imageUrl, 'thumbnail.jpg', command === 'neko' ? nekoImageMessages.success : neko2ImageMessages.success, m);
                await m.react('✅');
            }
            else {
                throw new Error('No image URL obtained.');
            }
        }
        catch (e) {
            this.#logger.error(`Error in NekoImageCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, command === 'neko' ? nekoImageMessages.error : neko2ImageMessages.error, m);
        }
    }
}
export default NekoImageCommand;
//# sourceMappingURL=NekoImageCommand.js.map