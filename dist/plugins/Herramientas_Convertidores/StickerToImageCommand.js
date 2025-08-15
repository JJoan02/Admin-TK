import { Command } from '../../core/Command.js';
import { webp2png } from '../../lib/webp2mp4.js';
import { stickerToImageMessages } from '../../lib/convertidor-content.js';
class StickerToImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('toimg', 'Convierte un sticker a imagen.');
        this.#logger = logger;
        this.commands = ['toimg', 'jpg', 'jpge', 'png'];
    }
    async execute(context) {
        const { m, conn } = context;
        const q = m.quoted || m;
        const mime = q.mediaType || '';
        if (!/sticker/.test(mime)) {
            await conn.reply(m.chat, stickerToImageMessages.noSticker, m);
            return;
        }
        try {
            await conn.reply(m.chat, stickerToImageMessages.processing, m, {
                contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                        title: global.packname,
                        body: global.dev,
                        previewType: 0, thumbnail: global.icons,
                        sourceUrl: global.channel } }
            });
        }
        finally { }
        ;
        const media = await q.download();
        const out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);
        await conn.sendFile(m.chat, out, 'error.png', null, m, m);
    }
    catch(e) {
        this.#logger.error(`Error in StickerToImageCommand: ${e.message}`);
        await conn.reply(m.chat, stickerToImageMessages.error, m);
    }
}
export default StickerToImageCommand;
//# sourceMappingURL=StickerToImageCommand.js.map