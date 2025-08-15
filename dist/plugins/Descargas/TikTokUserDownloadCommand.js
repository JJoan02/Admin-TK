import { Command } from '../../core/Command.js';
import Starlights from '@StarlightsTeam/Scraper';
class TikTokUserDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('tiktokuser', 'Descarga videos de un usuario de TikTok. Uso: !tiktokuser <nombre de usuario>');
        this.#logger = logger;
        this.commands = ['tiktokuser', 'tiktokus'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `🚩 Ingresa el nombre de usuario de TikTok que deseas buscar.\n\n\`Ejemplo:\`\n> *${usedPrefix + command}* yuuzu_u_`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const data = await Starlights.tiktokuser(text);
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let video = data[i];
                    let txt = "`乂  T I K T O K  -  D O W N L O A D`\n\n";
                    txt += `    ✩  *Nro* : ${video.nro || '-'}\n`;
                    txt += `    ✩  *Título* : ${video.title || '-'}\n`;
                    txt += `    ✩  *Autor* : ${video.author || '-'}\n`;
                    txt += `    ✩  *Duración* : ${video.duration || '-'} segundos\n`;
                    txt += `    ✩  *Vistas* : ${video.views || '-'}\n`;
                    txt += `    ✩  *Likes* : ${video.likes || '-'}\n`;
                    txt += `    ✩  *Comentarios* : ${video.comments_count || '-'}\n`;
                    txt += `    ✩  *Compartidos* : ${video.share_count || '-'}\n`;
                    txt += `    ✩  *Publicado* : ${video.published || '-'}\n\n`;
                    txt += `> 🚩 ${global.textbot}`;
                    await conn.sendFile(m.chat, video.dl_url, `video_${i + 1}.mp4`, txt, m, null);
                }
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, `No se encontraron videos para el usuario "${text}".`, m);
                await m.react('✖️');
            }
        }
        catch (e) {
            this.#logger.error(`Error al descargar videos de usuario de TikTok: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
            await m.react('✖️');
        }
    }
}
export default TikTokUserDownloadCommand;
//# sourceMappingURL=TikTokUserDownloadCommand.js.map