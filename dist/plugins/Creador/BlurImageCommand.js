import { Command } from '../../core/Command.js';
class BlurImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('blur', 'Aplica un efecto de desenfoque a la foto de perfil de un usuario. Uso: !blur @mencion o respondiendo a un mensaje.');
        this.#logger = logger;
        this.commands = ['blur', 'difuminar2'];
    }
    async execute(context) {
        const { m, conn, mentionedJid } = context;
        let targetJid = null;
        if (m.quoted && m.quoted.sender) {
            targetJid = m.quoted.sender;
        }
        else if (mentionedJid && mentionedJid[0]) {
            targetJid = mentionedJid[0];
        }
        else {
            targetJid = m.sender;
        }
        try {
            await m.react(global.rwait);
            const profilePicUrl = await conn.profilePictureUrl(targetJid, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
            const imageUrl = global.API('https://some-random-api.com', '/canvas/blur', {
                avatar: profilePicUrl,
            });
            await conn.sendFile(m.chat, imageUrl, 'blurred_image.png', '✨ *IMAGEN DESENFOCADA* ✨', m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al aplicar blur a la imagen: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar aplicar el efecto de desenfoque.`, m);
            await m.react('✖️');
        }
    }
}
export default BlurImageCommand;
//# sourceMappingURL=BlurImageCommand.js.map