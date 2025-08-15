import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class LikeeDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('likeedl', 'Descarga videos de Likee. Uso: !likeedl <url>');
        this.#logger = logger;
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, '🚩 Ingrese la url de un video de *Likee*.', m);
            return;
        }
        try {
            await m.react(global.rwait);
            const app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' } });
            const json = await app.json();
            if (!json || !json.links || !json.links['no watermark']) {
                await conn.reply(m.chat, `No se pudo descargar el video de Likee.`, m);
                await m.react('✖️');
                return;
            }
            const video = json.links['no watermark'];
            await conn.sendFile(m.chat, video, 'likee.mp4', `${json.caption || ''}`, m, null);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar de Likee: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
            await m.react('✖️');
        }
    }
}
export default LikeeDownloadCommand;
//# sourceMappingURL=LikeeDownloadCommand.js.map