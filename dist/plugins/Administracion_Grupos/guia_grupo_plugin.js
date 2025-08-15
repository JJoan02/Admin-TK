import { GUIA_COOLDOWN_MESSAGE, GUIA_TEXT_HEADER, GUIA_COMMANDS_LIST, GUIA_CONTACT_INFO, GUIA_VCARD_NAME, GUIA_VCARD_ORG, GUIA_VCARD_DESCRIPTION, GUIA_VCARD_NAME_BIZ, GUIA_ERROR } from '../../content/administracion_grupos/guia_grupo-responses';
import { GUIA_IMAGE_URL, GUIA_CONTACT_NUMBER } from '../../../config/redes_sociales/socialMediaConfig';
class GuiaGrupoPlugin {
    name = "GuiaGrupoPlugin";
    commands = [
        {
            name: "guia",
            alias: ["guia"],
            desc: "Muestra una guía básica de comandos del bot.",
            category: "Administración/Grupos",
            react: "📋",
            execute: async (Yaka, m, { conn, isPrems }) => {
                let time = global.db.data.users[m.sender].lastcofre + 0;
                if (new Date().getTime() - time < 0) {
                    throw GUIA_COOLDOWN_MESSAGE(msToTime(time - new Date().getTime()));
                }
                let texto = `${GUIA_TEXT_HEADER}\n\n${GUIA_COMMANDS_LIST}\n${GUIA_CONTACT_INFO(GUIA_CONTACT_NUMBER)}`;
                const fkontak = {
                    "key": {
                        "participants": "0@s.whatsapp.net",
                        "remoteJid": "status@broadcast",
                        "fromMe": false,
                        "id": "Halo"
                    },
                    "message": {
                        "contactMessage": {
                            "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;${GUIA_VCARD_NAME};;;\nFN:${GUIA_VCARD_NAME}\nORG:${GUIA_VCARD_ORG}\nTITLE:\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-DESCRIPTION:${GUIA_VCARD_DESCRIPTION}\nX-WA-BIZ-NAME:${GUIA_VCARD_NAME_BIZ}\nEND:VCARD`
                        }
                    },
                    "participant": "0@s.whatsapp.net"
                };
                try {
                    await conn.sendFile(m.chat, GUIA_IMAGE_URL, 'img.jpg', texto, fkontak);
                    global.db.data.users[m.sender].lastcofre = new Date().getTime();
                }
                catch (e) {
                    console.error("Error al generar la guía:", e);
                    m.reply(GUIA_ERROR);
                }
            }
        }
    ];
}
export default GuiaGrupoPlugin;
//# sourceMappingURL=guia_grupo_plugin.js.map