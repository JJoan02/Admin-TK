import { Command } from '../../core/Command.js';
import axios from 'axios';
class MessiCommand extends Command {
    #logger;
    constructor(logger) {
        super('messi', 'Obtiene una imagen aleatoria de Messi.');
        this.#logger = logger;
        this.commands = ['messi'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        try {
            await m.react(global.rwait);
            const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json`)).data;
            const url = await res[Math.floor(res.length * Math.random())];
            await conn.sendFile(m.chat, url, 'error.jpg', `*🇦🇷 Messi*`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de Messi: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen de Messi.`, m);
            await m.react('✖️');
        }
    }
}
export default MessiCommand;
//# sourceMappingURL=MessiCommand.js.map