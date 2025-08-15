import { Command } from '../../core/Command.js';
import hispamemes from 'hispamemes';
class MemeCommand extends Command {
    #logger;
    constructor(logger) {
        super('meme', 'Obtiene un meme aleatorio.');
        this.#logger = logger;
        this.commands = ['meme', 'memes', 'meme2', 'memes2'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react(global.rwait);
            const url = await hispamemes.meme();
            await conn.sendFile(m.chat, url, 'error.jpg', `😂🤣🤣`, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener meme: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener el meme.`, m);
            await m.react('✖️');
        }
    }
}
export default MemeCommand;
//# sourceMappingURL=MemeCommand.js.map