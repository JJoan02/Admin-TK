import { Command } from '../../core/Command.js';
class SimpCardCommand extends Command {
    #logger;
    constructor(logger) {
        super('simpcard', 'Genera una "simpcard" con la foto de perfil de un usuario. Uso: !simpcard @mencion o respondiendo a un mensaje.');
        this.#logger = logger;
        this.commands = ['simpcard'];
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
            const imageUrl = global.API('https://some-random-api.com', '/canvas/simpcard', {
                avatar: profilePicUrl,
            });
            await conn.sendFile(m.chat, imageUrl, 'simpcard.png', '*¡WTF ERES SIMP* 😆', m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al generar simpcard: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar generar la simpcard.`, m);
            await m.react('✖️');
        }
    }
}
export default SimpCardCommand;
//# sourceMappingURL=SimpCardCommand.js.map