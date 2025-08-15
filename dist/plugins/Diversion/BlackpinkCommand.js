import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class BlackpinkCommand extends Command {
    #logger;
    constructor(logger) {
        super('blackpink', 'Obtiene una imagen aleatoria de Blackpink.');
        this.#logger = logger;
        this.commands = ['blackpink'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        try {
            await m.react(global.rwait);
            const res = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/blackpink.txt');
            const body = await res.text();
            const randomkpop = body.split('\n');
            const randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)];
            await conn.sendFile(m.chat, randomkpopx, 'error.jpg', `_${command}_`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de Blackpink: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen de Blackpink.`, m);
            await m.react('✖️');
        }
    }
}
export default BlackpinkCommand;
//# sourceMappingURL=BlackpinkCommand.js.map