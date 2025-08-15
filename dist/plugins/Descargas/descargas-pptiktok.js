import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { TIKTOK_PP_NO_USERNAME, TIKTOK_PP_SUCCESS, TIKTOK_PP_INFO_MESSAGE, TIKTOK_PP_ERROR_REPORT } from '../../content/descargas/tiktok-profile-picture-responses';
class TiktokProfilePicturePlugin {
    name = "TiktokProfilePicturePlugin";
    commands = [
        {
            name: "tiktokfoto",
            alias: ["tiktokphoto"],
            desc: "Descarga la foto de perfil de un usuario de TikTok.",
            category: "Descargas",
            react: "📸",
            execute: async (Yaka, m, { conn, args, text, command, usedPrefix }) => {
                if (!text)
                    throw `${global.lenguajeGB.smsAvisoMG()}${global.mid.TikTok}\n*${usedPrefix + command} Gata_Dios*`;
                try {
                    let res = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${global.lolkeysapi}`;
                    await conn.sendFile(m.chat, res, 'error.jpg', TIKTOK_PP_SUCCESS(global.mid.TikTok1, text), m, false);
                    conn.reply(m.chat, TIKTOK_PP_INFO_MESSAGE(global.lenguajeGB.smsAvisoIIG(), global.mid.smsinfo), m, {
                        contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: global.wm, body: 'Super Bot WhatsApp', previewType: 0, thumbnail: global.gataMenu, sourceUrl: global.md } }
                    });
                }
                catch (e) {
                    await conn.reply(m.chat, TIKTOK_PP_ERROR_REPORT(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), m);
                    console.log(`❗❗ ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command} ❗❗`);
                    console.log(e);
                }
            }
        }
    ];
}
export default TiktokProfilePicturePlugin;
//# sourceMappingURL=descargas-pptiktok.js.map