import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class TikTokProfilePictureCommand extends Command {
    #logger;
    constructor(logger) {
        super('tiktokfoto', 'Descarga la foto de perfil de un usuario de TikTok. Uso: !tiktokfoto <nombre de usuario>');
        this.#logger = logger;
        this.commands = ['tiktokfoto', 'tiktokphoto'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.TikTok}\n*${usedPrefix + command} Gata_Dios*`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const res = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${global.lolkeysapi}`;
            await conn.sendFile(m.chat, res, 'tiktok_pp.jpg', `✅ ${global.mid.TikTok1}\n💟 *${text}*`, m, false);
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoIIG()} *${global.mid.smsinfo}*`, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: global.wm,
                        body: 'Super Bot WhatsApp',
                        previewType: 0,
                        thumbnail: global.gataMenu,
                        sourceUrl: global.md
                    }
                }
            });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar foto de perfil de TikTok: ${e.message}`);
            await conn.reply(m.chat, `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, m);
            await m.react('✖️');
        }
    }
}
export default TikTokProfilePictureCommand;
//# sourceMappingURL=TikTokProfilePictureCommand.js.map