import { Command } from '../../core/Command.js';
import { webp2mp4 } from '../../lib/webp2mp4.js';
import { stickerToVideoMessages } from '../../lib/convertidor-content.js';
class StickerToVideoCommand extends Command {
    #logger;
    constructor(logger) {
        super('tovideo', 'Convierte un sticker a video.');
        this.#logger = logger;
        this.commands = ['tovideo', 'togif'];
    }
    async execute(context) {
        const { m, conn, usedPrefix, command } = context;
        if (!m.quoted) {
            await conn.reply(m.chat, stickerToVideoMessages.noSticker(usedPrefix, command), m);
            return;
        }
        const mime = m.quoted.mimetype || '';
        if (!/webp/.test(mime)) {
            await conn.reply(m.chat, stickerToVideoMessages.noSticker(usedPrefix, command), m);
            return;
        }
        try {
            await conn.reply(m.chat, stickerToVideoMessages.processing, m, {
                contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                        title: global.packname,
                        body: global.dev,
                        previewType: 0, thumbnail: global.icons,
                        sourceUrl: global.channel } }
            });
        }
        finally { }
        ;
        const media = await m.quoted.download();
        const out = await webp2mp4(media);
        await conn.sendFile(m.chat, out, 'error.mp4', stickerToVideoMessages.success, m, 0, { thumbnail: out });
    }
    catch(e) {
        this.#logger.error(`Error in StickerToVideoCommand: ${e.message}`);
        await conn.reply(m.chat, stickerToVideoMessages.error, m);
    }
}
export default StickerToVideoCommand;
//# sourceMappingURL=StickerToVideoCommand.js.map