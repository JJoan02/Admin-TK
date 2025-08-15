import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class KpopCommand extends Command {
    #logger;
    constructor(logger) {
        super('kpop', 'Busca imágenes de grupos de Kpop. Uso: !kpop [blackpink/exo/bts]');
        this.#logger = logger;
        this.commands = ['kpop'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (args.length === 0) {
            await conn.reply(m.chat, `Usar ${usedPrefix}kpop\nPor favor escribe: ${usedPrefix}kpop [buscar]\nEjemplo:: ${usedPrefix}kpop bts\n\nBusquedas disponibles:\nblackpink, exo, bts`, m);
            return;
        }
        const group = args[0].toLowerCase();
        const availableGroups = ['blackpink', 'exo', 'bts'];
        if (!availableGroups.includes(group)) {
            await conn.reply(m.chat, `Lo sentimos, la busqueda no está disponible. Por favor escribe ${usedPrefix}kpop para ver la lista de busquedas disponibles`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const res = await fetch(`https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/${group}.txt`);
            const body = await res.text();
            const randomkpop = body.split('\n');
            const randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)];
            await conn.sendFile(m.chat, randomkpopx, 'error.jpg', `_${command}_`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen de Kpop (${group}): ${e.message}`);
            await conn.reply(m.chat, 'Ocurrio un error, vuelve a intentar, si el fallo continua avisar a mi creador', m);
            await m.react('✖️');
        }
    }
}
export default KpopCommand;
//# sourceMappingURL=KpopCommand.js.map