import { Command } from '../../core/Command.js';
import { toAudio } from '../../lib/converter.js';
import { mediaToMp3Messages } from '../../lib/convertidor-content.js';
class MediaToMp3Command extends Command {
    #logger;
    constructor(logger) {
        super('tomp3', 'Convierte video o audio a MP3.');
        this.#logger = logger;
        this.commands = ['tomp3', 'toaudio'];
    }
    async execute(context) {
        const { m, conn } = context;
        const q = m.quoted ? m.quoted : m;
        const mime = (q || q.msg).mimetype || q.mediaType || '';
        if (!/video|audio/.test(mime)) {
            await conn.reply(m.chat, mediaToMp3Messages.noMedia, m);
            return;
        }
        try {
            const media = await q.download();
            if (!media) {
                await conn.reply(m.chat, mediaToMp3Messages.downloadError, m);
                return;
            }
            const audio = await toAudio(media, 'mp4');
            if (!audio.data) {
                await conn.reply(m.chat, mediaToMp3Messages.conversionError, m);
                return;
            }
            await conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg' }, { quoted: m });
        }
        catch (e) {
            this.#logger.error(`Error in MediaToMp3Command: ${e.message}`);
            await conn.reply(m.chat, mediaToMp3Messages.conversionError, m);
        }
    }
}
export default MediaToMp3Command;
//# sourceMappingURL=MediaToMp3Command.js.map