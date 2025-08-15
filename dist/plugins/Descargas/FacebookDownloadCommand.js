import { Command } from '../../core/Command.js';
import { igdl } from 'ruhend-scraper';
import Starlights from '@StarlightsTeam/Scraper';
class FacebookDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('fb', 'Descarga videos de Facebook. Uso: !fb <enlace del video>');
        this.#logger = logger;
        this.commands = ['fb', 'facebook', 'fbdl'];
    }
    async execute(context) {
        const { m, conn, args } = context;
        if (!args[0]) {
            await conn.reply(m.chat, '*`Ingresa El link Del vídeo a descargar 🤍`*', m);
            return;
        }
        try {
            await m.react(global.rwait);
            let videoUrl = null;
            let caption = global.dev;
            try {
                const res = await igdl(args[0]);
                if (res && res.data && res.data.length > 0) {
                    const data = res.data.find(i => i.resolution === "720p (HD)") || res.data.find(i => i.resolution === "360p (SD)");
                    if (data) {
                        videoUrl = data.url;
                    }
                }
            }
            catch (e) {
                this.#logger.warn(`ruhend-scraper (igdl) falló para Facebook: ${e.message}`);
            }
            if (!videoUrl) {
                try {
                    const { dl_url } = await Starlights.fbdl(args[0]);
                    if (dl_url) {
                        videoUrl = dl_url;
                        caption = global.listo;
                    }
                }
                catch (e) {
                    this.#logger.warn(`@StarlightsTeam/Scraper (fbdl) falló para Facebook: ${e.message}`);
                }
            }
            if (videoUrl) {
                await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, '*`No se pudo descargar el video de Facebook. Verifica el enlace o inténtalo de nuevo más tarde.`*', m);
                await m.react('✖️');
            }
        }
        catch (e) {
            this.#logger.error(`Error general al descargar de Facebook: ${e.message}`);
            await conn.reply(m.chat, '*`Ocurrió un error al enviar el video o al procesar la solicitud.`*', m);
            await m.react('✖️');
        }
    }
}
export default FacebookDownloadCommand;
//# sourceMappingURL=FacebookDownloadCommand.js.map