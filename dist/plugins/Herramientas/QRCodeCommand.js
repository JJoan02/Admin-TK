import { Command } from '../../core/Command.js';
import { toDataURL } from 'qrcode';
import { qrcodeMessages } from '../../lib/herramientas-content.js';
class QRCodeCommand extends Command {
    #logger;
    constructor(logger) {
        super('qrcode', 'Genera códigos QR a partir de texto. Uso: !qrcode <texto>');
        this.#logger = logger;
        this.commands = ['qrcode', 'qr', 'qrcodecode', 'qrc'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix } = context;
        if (!text) {
            await conn.reply(m.chat, qrcodeMessages.noText(usedPrefix), m);
            return;
        }
        try {
            await m.react(global.rwait);
            const qrCodeDataUrl = await toDataURL(text.slice(0, 2048), { scale: 8 });
            await conn.sendFile(m.chat, qrCodeDataUrl, 'qrcode.png', qrcodeMessages.success(global.wm), m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al generar QR Code: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al intentar generar el código QR.`, m);
            await m.react('✖️');
        }
    }
}
export default QRCodeCommand;
//# sourceMappingURL=QRCodeCommand.js.map