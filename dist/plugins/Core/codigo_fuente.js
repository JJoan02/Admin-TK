import axios from 'axios';
import * as fs from 'fs';
import { SCRIPT_IMAGE_PATH, SCRIPT_MESSAGE_HEADER, SCRIPT_TOTAL_FORKS, SCRIPT_TOTAL_STARS, SCRIPT_LICENSE, SCRIPT_REPO_SIZE, SCRIPT_LAST_UPDATED, SCRIPT_THANKS_MESSAGE, SCRIPT_COPYRIGHT, SCRIPT_ERROR_MESSAGE } from '../../content/core/codigo_fuente-responses';
import { GITHUB_ADMIN_TK_REPO } from '../../../config/redes_sociales/socialMediaConfig';
class CodigoFuentePlugin {
    name = "CodigoFuentePlugin";
    commands = [
        {
            name: "codigo_fuente",
            alias: ["script", "repo", "sc", "sourcecode"],
            desc: "Muestra información del código fuente del bot.",
            category: "Core",
            react: "📃",
            execute: async (Yaka, m, { pushName, prefix }) => {
                try {
                    let picURL = fs.readFileSync(SCRIPT_IMAGE_PATH);
                    let repoInfo = await axios.get(GITHUB_ADMIN_TK_REPO);
                    let repo = repoInfo.data;
                    let txt = `${SCRIPT_MESSAGE_HEADER}\n\n` +
                        `${SCRIPT_TOTAL_FORKS} ${repo.forks_count}\n` +
                        `${SCRIPT_TOTAL_STARS} ${repo.stargazers_count}\n` +
                        `${SCRIPT_LICENSE} ${repo.license.name}\n` +
                        `${SCRIPT_REPO_SIZE} ${(repo.size / 1024).toFixed(2)} MB\n` +
                        `${SCRIPT_LAST_UPDATED} ${repo.updated_at}\n\n` +
                        `${SCRIPT_THANKS_MESSAGE}\n\n` +
                        `${SCRIPT_COPYRIGHT}`;
                    await Yaka.sendMessage(m.from, { image: picURL, caption: txt }, { quoted: m });
                }
                catch (error) {
                    console.error("Error al obtener la información del script:", error);
                    m.reply(SCRIPT_ERROR_MESSAGE);
                }
            }
        }
    ];
}
export default CodigoFuentePlugin;
//# sourceMappingURL=codigo_fuente.js.map