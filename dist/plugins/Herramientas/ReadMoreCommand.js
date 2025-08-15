import { Command } from '../../core/Command.js';
import { readMoreMessages } from '../../lib/herramientas-content.js';
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
class ReadMoreCommand extends Command {
    #logger;
    constructor(logger) {
        super('readmore', 'Crea un mensaje con un "leer más" oculto. Uso: !readmore <texto1>|<texto2>');
        this.#logger = logger;
        this.commands = ['leermas', 'readmore'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, readMoreMessages.usage(usedPrefix, command), m);
            return;
        }
        let [l, r] = text.split `|`;
        if (!l)
            l = '';
        if (!r)
            r = '';
        function insertReadMoreEverySixWords(str) {
            let words = str.split(' ');
            let result = [];
            for (let i = 0; i < words.length; i += 6) {
                result.push(words.slice(i, i + 6).join(' '));
            }
            return result.join(` ${readMore} `);
        }
        if (l.split(' ').length > 6) {
            l = insertReadMoreEverySixWords(l);
        }
        if (r.split(' ').length > 6) {
            r = insertReadMoreEverySixWords(r);
        }
        try {
            await m.react(global.rwait);
            await conn.reply(m.chat, l + readMore + r, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error en comando ReadMore: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
            await m.react('✖️');
        }
    }
}
export default ReadMoreCommand;
//# sourceMappingURL=ReadMoreCommand.js.map