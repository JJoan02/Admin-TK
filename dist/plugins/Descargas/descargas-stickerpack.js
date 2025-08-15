import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';
import { STICKERPACK_NO_URL, STICKERPACK_ERROR_REPORT } from '../../content/descargas/stickerpack-download-responses';
const delay = (time) => new Promise(res => setTimeout(res, time));
class StickerpackDownloadPlugin {
    name = "StickerpackDownloadPlugin";
    commands = [
        {
            name: "stickerpack",
            alias: [],
            desc: "Descarga un paquete de stickers de una URL.",
            category: "Descargas",
            react: "📦",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    throw m.reply(STICKERPACK_NO_URL(global.lenguajeGB.smsAvisoMG(), global.mid.smsMalused8, usedPrefix, command));
                try {
                    let url = text;
                    let res = await fetch(`https://api.akuari.my.id/downloader/stickerpack?link=${url}`);
                    let json = await res.json();
                    for (let data of (json.result || json)) {
                        const stikers = await sticker(false, data, global.packname, global.author);
                        conn.sendFile(m.chat, stikers, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true } }, { quoted: m });
                        await delay(5000);
                    }
                }
                catch (e) {
                    await m.reply(STICKERPACK_ERROR_REPORT(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError1(), global.lenguajeGB.smsMensError2(), usedPrefix, command), m);
                    console.log(`❗❗ ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command} ❗❗`);
                    console.log(e);
                }
            }
        }
    ];
}
export default StickerpackDownloadPlugin;
//# sourceMappingURL=descargas-stickerpack.js.map