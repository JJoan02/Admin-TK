import { Command } from '../../core/Command.js';
class RandomImagesCommand extends Command {
    #logger;
    constructor(logger) {
        super('randomimage', 'Obtiene imágenes aleatorias de chicas o chicos.');
        this.#logger = logger;
        this.commands = ['chica', 'chico'];
    }
    async execute(context) {
        const { m, conn, command } = context;
        let imageUrl;
        let captionText;
        if (command === 'chica') {
            imageUrl = 'https://source.unsplash.com/featured/?girl,woman';
            captionText = '😻 𝘾𝙃𝙄𝘾𝘼 ✨';
        }
        else if (command === 'chico') {
            imageUrl = 'https://source.unsplash.com/featured/?boy,man';
            captionText = '✨ 𝘾𝙃𝙄𝘾𝙊 ✨';
        }
        else {
            await conn.reply(m.chat, 'Comando no reconocido.', m);
            return;
        }
        try {
            await m.react(global.rwait);
            await conn.sendFile(m.chat, imageUrl, 'random_image.jpg', captionText, m, null, global.fake);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al obtener imagen aleatoria (${command}): ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar obtener la imagen.`, m);
            await m.react('✖️');
        }
    }
}
export default RandomImagesCommand;
//# sourceMappingURL=RandomImagesCommand.js.map