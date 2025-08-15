import { Command } from '../../core/Command.js';
import { googleImage } from '@bochilteam/scraper';
class ImageSearchCommand extends Command {
    #logger;
    constructor(logger) {
        super('imagen', 'Busca imágenes en Google. Uso: !imagen <texto>');
        this.#logger = logger;
        this.commands = ['image', 'imagen'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `¿Qué buscar? 🤔️\nÚselo de la siguiente manera\nEjemplo:\n*${usedPrefix + command} Loli*`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const res = await googleImage(text);
            const image = res.getRandom();
            const link = image;
            await this.#delay(1000);
            await conn.sendMessage(m.chat, {
                image: {
                    url: link
                },
                caption: `*🔎 Resultado De: ${text}*`,
                footer: global.dev,
                buttons: [
                    {
                        buttonId: `${usedPrefix + command} ${text}`,
                        buttonText: {
                            displayText: 'Siguiente'
                        }
                    }
                ],
                viewOnce: true,
                headerType: 4
            }, {
                quoted: m
            });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al buscar imagen: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar buscar la imagen.`, m);
            await m.react('✖️');
        }
    }
    #delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}
export default ImageSearchCommand;
//# sourceMappingURL=ImageSearchCommand.js.map