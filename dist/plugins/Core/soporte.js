import { SUPPORT_INBOX_MESSAGE, SUPPORT_NOTE_MESSAGE, SUPPORT_THANKS_MESSAGE, SUPPORT_GROUP_LINK_LABEL, SUPPORT_ERROR_MESSAGE } from '../../content/core/soporte-responses';
import { SUPPORT_GROUP_LINK } from '../../../config/redes_sociales/socialMediaConfig';
class SoportePlugin {
    name = "SoportePlugin";
    commands = [
        {
            name: "soporte",
            alias: ["support", "supportgc"],
            desc: "Envía el enlace del grupo de soporte.",
            category: "Core",
            cool: 3,
            react: "🥺",
            execute: async (Yaka, m, { pushName }) => {
                try {
                    m.reply(SUPPORT_INBOX_MESSAGE(pushName));
                    let botpic = botImage1;
                    let txt = `${SUPPORT_GROUP_LINK_LABEL} ${SUPPORT_GROUP_LINK}\n\n${SUPPORT_NOTE_MESSAGE}\n\n${SUPPORT_THANKS_MESSAGE}`;
                    await Yaka.sendMessage(m.sender, { image: { url: botpic }, caption: txt }, { quoted: m });
                }
                catch (error) {
                    console.error("Error en el comando de soporte:", error);
                    m.reply(SUPPORT_ERROR_MESSAGE);
                }
            }
        }
    ];
}
export default SoportePlugin;
//# sourceMappingURL=soporte.js.map