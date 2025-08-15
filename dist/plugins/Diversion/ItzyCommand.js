import { Command } from '../../core/Command.js';
import axios from 'axios';
class ItzyCommand extends Command {
    #logger;
    constructor(logger) {
        super('itzy', 'Obtiene una imagen aleatoria de Itzy.');
        this.#logger = logger;
        this.commands = ['itzy', 'kpopitzy'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        try {
            await m.react(global.rwait);
            const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/itzy.json`)).data;
            const loli = await res[Math.floor(res.length * Math.random())];
            await conn.sendFile(m.chat, loli, 'error.jpg', `_${command}_`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de Itzy: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen de Itzy.`, m);
            await m.react('✖️');
        }
    }
}
export default ItzyCommand;
//# sourceMappingURL=ItzyCommand.js.map