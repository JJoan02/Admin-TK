import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class NekoCommand extends Command {
    #logger;
    constructor(logger) {
        super('neko', 'Obtiene una imagen aleatoria de neko.');
        this.#logger = logger;
        this.commands = ['neko'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        try {
            await m.react(global.rwait);
            const ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text();
            const nek = ne.split('\n');
            const neko = await nek[Math.floor(Math.random() * nek.length)];
            if (neko == '')
                throw 'Error';
            await conn.sendFile(m.chat, neko, 'error.jpg', `Nyaww~ 🐾💗`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de neko: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen de neko.`, m);
            await m.react('✖️');
        }
    }
}
export default NekoCommand;
//# sourceMappingURL=NekoCommand.js.map