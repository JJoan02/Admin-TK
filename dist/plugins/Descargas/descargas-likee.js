import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { LIKEE_NO_URL, LIKEE_CAPTION, LIKEE_ERROR } from '../../content/descargas/likee-download-responses';
class LikeeDownloadPlugin {
    name = "LikeeDownloadPlugin";
    commands = [
        {
            name: "likee",
            alias: [],
            desc: "Descarga videos de Likee.",
            category: "Descargas",
            react: "👍",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text)
                    return conn.reply(m.chat, LIKEE_NO_URL, m, rcanal);
                await m.react('🕓');
                try {
                    let app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' } });
                    let json = await app.json();
                    let video = json.links['no watermark'];
                    await conn.sendFile(m.chat, video, 'samu.mp4', LIKEE_CAPTION, m);
                    await m.react('✅');
                }
                catch (e) {
                    await m.react('✖️');
                    conn.reply(m.chat, LIKEE_ERROR, m);
                }
            }
        }
    ];
}
export default LikeeDownloadPlugin;
//# sourceMappingURL=descargas-likee.js.map