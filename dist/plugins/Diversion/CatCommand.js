import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class CatCommand extends Command {
    #logger;
    constructor(logger) {
        super('cat', 'Obtiene una imagen aleatoria de un gato.');
        this.#logger = logger;
        this.commands = ['cat'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react(global.rwait);
            const res = await fetch('https://api.thecatapi.com/v1/images/search');
            const img = await res.json();
            await conn.sendFile(m.chat, img[0].url, 'error.jpg', `🐱`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de gato: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen de gato.`, m);
            await m.react('✖️');
        }
    }
}
export default CatCommand;
//# sourceMappingURL=CatCommand.js.map