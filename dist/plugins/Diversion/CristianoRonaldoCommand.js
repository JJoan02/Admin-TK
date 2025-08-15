import { Command } from '../../core/Command.js';
import axios from 'axios';
class CristianoRonaldoCommand extends Command {
    #logger;
    constructor(logger) {
        super('cr7', 'Obtiene una imagen aleatoria de Cristiano Ronaldo.');
        this.#logger = logger;
        this.commands = ['cristianoronaldo', 'cr7'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        try {
            await m.react(global.rwait);
            const cristiano = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json`)).data;
            const ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())];
            await conn.sendFile(m.chat, ronaldo, 'error.jpg', `_*Siiiuuuuuu*_`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de Cristiano Ronaldo: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen de Cristiano Ronaldo.`, m);
            await m.react('✖️');
        }
    }
}
export default CristianoRonaldoCommand;
//# sourceMappingURL=CristianoRonaldoCommand.js.map