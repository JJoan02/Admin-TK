import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';
class StickerPackDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('stickerpack', 'Descarga un paquete de stickers de getstickerpack.com. Uso: !stickerpack <url>');
        this.#logger = logger;
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsMalused8}\n${usedPrefix + command} https://getstickerpack.com/stickers/flork-memes-4-1`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const url = text;
            const res = await fetch(`https://api.akuari.my.id/downloader/stickerpack?link=${url}`);
            const json = await res.json();
            if (!json.result || json.result.length === 0) {
                await conn.reply(m.chat, `No se encontraron stickers en el paquete o la URL es inválida.`, m);
                await m.react('✖️');
                return;
            }
            for (const data of json.result) {
                const stikers = await sticker(false, data, global.packname, global.author);
                await conn.sendFile(m.chat, stikers, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true } }, { quoted: m });
                await this.#delay(5000);
            }
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar stickerpack: ${e.message}`);
            await conn.reply(m.chat, `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, m);
            await m.react('✖️');
        }
    }
    #delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}
export default StickerPackDownloadCommand;
//# sourceMappingURL=StickerPackDownloadCommand.js.map