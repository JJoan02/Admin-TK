import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class PPCoupleCommand extends Command {
    #logger;
    constructor(logger) {
        super('ppcp', 'Obtiene imágenes de perfil de pareja (PP Couple).');
        this.#logger = logger;
        this.commands = ['ppcp', 'ppcouple'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react(global.rwait);
            const res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${global.lolkeysapi}`);
            if (!res.ok)
                throw await res.text();
            const json = await res.json();
            if (!json.status)
                throw json;
            await conn.sendFile(m.chat, json.result.female, 'error.jpg', `*𝘾𝙃𝙄𝘾𝘼 ✨*`, m, null, global.fake);
            await conn.sendFile(m.chat, json.result.male, 'error.jpg', `𝘾𝙃𝙄𝘾𝙊 ✨`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener PP Couple: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener las imágenes de PP Couple.`, m);
            await m.react('✖️');
        }
    }
}
export default PPCoupleCommand;
//# sourceMappingURL=PPCoupleCommand.js.map