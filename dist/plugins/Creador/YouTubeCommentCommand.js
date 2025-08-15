import { Command } from '../../core/Command.js';
class YouTubeCommentCommand extends Command {
    #logger;
    constructor(logger) {
        super('ytcomment', 'Genera una imagen de un comentario de YouTube. Uso: !ytcomment <texto del comentario>');
        this.#logger = logger;
        this.commands = ['ytcomment'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()} Y EL TEXTO?`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const profilePicUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
            const imageUrl = global.API('https://some-random-api.com', '/canvas/youtube-comment', {
                avatar: profilePicUrl,
                comment: text,
                username: conn.getName(m.sender),
            });
            await conn.sendFile(m.chat, imageUrl, 'youtube_comment.png', '*HAS COMENTADO EN YOUTUBE!!* ?', m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al generar comentario de YouTube: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar generar el comentario de YouTube.`, m);
            await m.react('✖️');
        }
    }
}
export default YouTubeCommentCommand;
//# sourceMappingURL=YouTubeCommentCommand.js.map