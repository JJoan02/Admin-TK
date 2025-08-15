import { Command } from '../../core/Command.js';
class ItsSoStupidCommand extends Command {
    #logger;
    constructor(logger) {
        super('itssostupid', 'Genera una imagen con el texto "it', s, so, stupid, " y la foto de perfil de un usuario. Uso: !itssostupid <texto> @mencion');, this.#logger = logger);
        this.commands = ['itssostupid', 'iss', 'stupid'];
    }
    async execute(context) {
        const { m, conn, args, mentionedJid } = context;
        let text = args.slice(1).join(' ');
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
            const imageUrl = global.API('https://some-random-api.com', '/canvas/its-so-stupid', {
                avatar: profilePicUrl,
                dog: text || 'im+stupid',
            });
            await conn.sendFile(m.chat, imageUrl, 'stupid_image.png', `*@${global.wm}*`, m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al generar itssostupid: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar generar la imagen.`, m);
            await m.react('✖️');
        }
    }
}
export default ItsSoStupidCommand;
//# sourceMappingURL=ItsSoStupidCommand.js.map