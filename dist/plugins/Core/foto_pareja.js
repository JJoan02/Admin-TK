import axios from 'axios';
import { CAPTION_FOR_HIM, CAPTION_FOR_HER, ERROR_FETCHING_COUPLE_PICS } from '../../content/core/foto_pareja-responses';
import { NEKO_COUPLE_API } from '../../../config/redes_sociales/socialMediaConfig';
class FotoParejaPlugin {
    name = "FotoParejaPlugin";
    commands = [
        {
            name: "foto_pareja",
            alias: ["couplepp", "ppcouple"],
            desc: "Obtiene fotos de perfil de pareja a juego.",
            category: "Core",
            react: "💞",
            execute: async (Yaka, m, { pushName, prefix }) => {
                try {
                    let shibam = await axios.get(NEKO_COUPLE_API);
                    await Yaka.sendMessage(m.from, { image: { url: shibam.data.male }, caption: CAPTION_FOR_HIM }, { quoted: m });
                    await Yaka.sendMessage(m.from, { image: { url: shibam.data.female }, caption: CAPTION_FOR_HER }, { quoted: m });
                }
                catch (error) {
                    console.error("Error al obtener fotos de pareja:", error);
                    m.reply(ERROR_FETCHING_COUPLE_PICS);
                }
            }
        }
    ];
}
export default FotoParejaPlugin;
//# sourceMappingURL=foto_pareja.js.map