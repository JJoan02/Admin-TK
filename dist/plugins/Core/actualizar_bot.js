import axios from 'axios';
import * as fs from 'fs';
import { BOT_UPDATE_IMAGE_PATH, BOT_UPDATE_MESSAGE_HEADER, BOT_UPDATE_MESSAGE_FOOTER } from '../../content/core/actualizar_bot-responses';
import { GITHUB_ADMIN_TK_REPO } from '../../../config/redes_sociales/socialMediaConfig';
class ActualizarBotPlugin {
    name = "ActualizarBotPlugin";
    commands = [
        {
            name: "actualizar_bot",
            alias: ["botupdate", "update"],
            desc: "Obtiene la última hora de actualización del bot.",
            category: "Core",
            react: "📅",
            execute: async (Yaka, m, { pushName, prefix }) => {
                try {
                    let picURL = fs.readFileSync(BOT_UPDATE_IMAGE_PATH);
                    let repoInfo = await axios.get(GITHUB_ADMIN_TK_REPO);
                    let repo = repoInfo.data;
                    let txt = `${BOT_UPDATE_MESSAGE_HEADER}\n\n⭕️ ${repo.updated_at}\n\n${BOT_UPDATE_MESSAGE_FOOTER}`;
                    await Yaka.sendMessage(m.from, { image: picURL, caption: txt }, { quoted: m });
                }
                catch (error) {
                    console.error("Error al obtener la actualización del bot:", error);
                    m.reply("Ocurrió un error al obtener la información de actualización del bot.");
                }
            }
        }
    ];
}
export default ActualizarBotPlugin;
//# sourceMappingURL=actualizar_bot.js.map