import { Command } from '../../core/Command.js';
import { toPTT } from '../../lib/converter.js';
import { mediaToPttMessages } from '../../lib/convertidor-content.js';
class MediaToPttCommand extends Command {
    #logger;
    constructor(logger) {
        super('toptt', 'Convierte video o audio a nota de voz (PTT).');
        this.#logger = logger;
        this.commands = ['tovn', 'vn', 'ptt'];
    }
    async execute(context) {
        const { m, conn, usedPrefix, command } = context;
        const q = m.quoted ? m.quoted : m;
        const mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
        if (!/video|audio/.test(mime)) {
            await conn.reply(m.chat, mediaToPttMessages.noMedia(usedPrefix, command), m);
            return;
        }
        try {
            const media = await q.download?.();
            if (!media) {
                await conn.reply(m.chat, mediaToPttMessages.downloadError(usedPrefix, command), m);
                return;
            }
            const audio = await toPTT(media, 'mp4');
            if (!audio.data) {
                await conn.reply(m.chat, mediaToPttMessages.conversionError(usedPrefix, command), m);
                return;
            }
            await conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, { mimetype: 'audio/mp4' });
        }
        catch (e) {
            this.#logger.error(`Error in MediaToPttCommand: ${e.message}`);
            await conn.reply(m.chat, mediaToPttMessages.conversionError(usedPrefix, command), m);
        }
    }
}
export default MediaToPttCommand;
//# sourceMappingURL=MediaToPttCommand.js.map