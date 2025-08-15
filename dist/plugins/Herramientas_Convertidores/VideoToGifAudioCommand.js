import { Command } from '../../core/Command.js';
import { videoToGifAudioMessages } from '../../lib/convertidor-content.js';
class VideoToGifAudioCommand extends Command {
    #logger;
    constructor(logger) {
        super('togifaud', 'Convierte un video a GIF con audio.');
        this.#logger = logger;
        this.commands = ['togifaud'];
    }
    async execute(context) {
        const { m, conn } = context;
        if (!m.quoted) {
            await conn.reply(m.chat, videoToGifAudioMessages.noVideo, m);
            return;
        }
        const q = m.quoted || m;
        const mime = (q.msg || q).mimetype || '';
        if (!/(mp4)/.test(mime)) {
            await conn.reply(m.chat, videoToGifAudioMessages.noVideo, m);
            return;
        }
        try {
            await m.react(global.rwait);
            await conn.reply(m.chat, videoToGifAudioMessages.processing, m, {
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
        await conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: videoToGifAudioMessages.success }, { quoted: global.fkontak });
        await m.react(global.done);
    }
    catch(e) {
        this.#logger.error(`Error in VideoToGifAudioCommand: ${e.message}`);
        await conn.reply(m.chat, videoToGifAudioMessages.error, m);
        await m.react('✖️');
    }
}
export default VideoToGifAudioCommand;
//# sourceMappingURL=VideoToGifAudioCommand.js.map