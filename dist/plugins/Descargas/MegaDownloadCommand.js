import { Command } from '../../core/Command.js';
import { File } from "megajs";
import mime from 'mime-types';
class MegaDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('mega', 'Descarga archivos de Mega.nz. Uso: !mega <url>');
        this.#logger = logger;
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, `Ingresa un enlace de Mega`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const file = File.fromURL(text);
            await file.loadAttributes();
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const mimeType = mime.lookup(fileExtension);
            let caption = `${global.eg}\n┃ 𓃠 *${global.gt} ${global.vs}*\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 💫 𝙉𝙊𝙈𝘽𝙍𝙀 | 𝙉𝘼𝙈𝙀\n┃ ${file.name}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 💪 𝙋𝙀𝙎𝙊 |  𝙎𝙄𝙕𝙀\n┃ ${this.#formatBytes(file.size)}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 🚀 𝙏𝙄𝙋𝙊 | 𝙏𝙔𝙋𝙀\n┃ ${mimeType}\n┃\n┃ ${global.wm}`.trim();
            await conn.reply(m.chat, caption, m);
            if (file.size >= 1800000000 && !file.directory) {
                await conn.reply(m.chat, 'Error: El archivo es muy pesado para enviar directamente.', m);
                await m.react('✖️');
                return;
            }
            const data = await file.downloadBuffer();
            await conn.sendFile(m.chat, data, file.name, null, m, null, { mimetype: mimeType, asDocument: true });
            await m.react('✅');
        }
        catch (error) {
            this.#logger.error(`Error al descargar de Mega: ${error.message}`);
            await conn.reply(m.chat, `Error: ${error.message}`, m);
            await m.react('✖️');
        }
    }
    #formatBytes(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
export default MegaDownloadCommand;
//# sourceMappingURL=MegaDownloadCommand.js.map