import { ICommand, IPluginModule } from '../../types/plugin';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { GITHUB_REPO_NAME, GITHUB_REPO_OWNER, GITHUB_REPO_URL, GITHUB_INFO_HEADER, GITHUB_INFO_NAME, GITHUB_INFO_WATCHERS, GITHUB_INFO_SIZE, GITHUB_INFO_LAST_UPDATED, GITHUB_INFO_URL, GITHUB_INFO_FORKS, GITHUB_INFO_STARS, GITHUB_INFO_FOOTER, GITHUB_ERROR_FETCH } from '../../content/busqueda/github-responses';
class GithubPlugin {
    name = "GithubPlugin";
    commands = [
        {
            name: "github",
            alias: [],
            desc: "Obtiene información sobre un repositorio de GitHub específico.",
            category: "Busqueda",
            react: "🐙",
            execute: async (Yaka, m, { conn }) => {
                try {
                    const res = await fetch(GITHUB_REPO_URL);
                    if (!res.ok)
                        throw new Error(GITHUB_ERROR_FETCH);
                    const json = await res.json();
                    let txt = `${GITHUB_INFO_HEADER}`;
                    txt += `${GITHUB_INFO_NAME} ${json.name}\n`;
                    txt += `${GITHUB_INFO_WATCHERS} ${json.watchers_count}\n`;
                    txt += `${GITHUB_INFO_SIZE} ${(json.size / 1024).toFixed(2)} MB\n`;
                    txt += `${GITHUB_INFO_LAST_UPDATED} ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
                    txt += `${GITHUB_INFO_URL} ${json.html_url}\n`;
                    txt += `${GITHUB_INFO_FORKS} ${json.forks_count}\n`;
                    txt += `${GITHUB_INFO_STARS} ${json.stargazers_count}\n\n`;
                    txt += `${GITHUB_INFO_FOOTER}`;
                    const imgPath = path.join(process.cwd(), 'assets/bot_image.jpg');
                    const imgBuffer = fs.readFileSync(imgPath);
                    await conn.sendMessage(m.chat, { image: imgBuffer, caption: txt }, { quoted: m });
                }
                catch (error) {
                    console.error("Error en GithubPlugin:", error);
                    await conn.sendMessage(m.chat, { text: GITHUB_ERROR_FETCH }, { quoted: m });
                }
            }
        }
    ];
}
export default GithubPlugin;
//# sourceMappingURL=github.js.map