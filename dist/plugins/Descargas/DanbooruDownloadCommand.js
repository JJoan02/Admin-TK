import { ICommand, IPluginModule } from '../../types/plugin';
import Starlights from "@StarlightsTeam/Scraper";
import { DANBOORU_DOWNLOAD_NO_URL, DANBOORU_DOWNLOAD_NO_IMAGE, DANBOORU_DOWNLOAD_ERROR } from '../../content/descargas/danbooru-download-responses';
class DanbooruDownloadPlugin {
    name = "DanbooruDownloadPlugin";
    commands = [
        {
            name: "danbooru",
            alias: [],
            desc: "Descarga imágenes de Danbooru.",
            category: "Descargas",
            react: "🖼️",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0]) {
                    return conn.reply(m.chat, DANBOORU_DOWNLOAD_NO_URL(usedPrefix, command), m);
                }
                try {
                    await m.react(global.rwait);
                    const internalApiUrl = `http://localhost:3000/api/danbooru/download?url=${encodeURIComponent(args[0])}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        return conn.reply(m.chat, DANBOORU_DOWNLOAD_ERROR, m);
                    }
                    const json = await response.json();
                    const dl_url = json.result.url;
                    if (!dl_url) {
                        await conn.reply(m.chat, DANBOORU_DOWNLOAD_NO_IMAGE, m);
                        await m.react('✖️');
                        return;
                    }
                    await conn.sendFile(m.chat, dl_url, 'danbooru.jpg', global.listo, m, null);
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al descargar de Danbooru: ${e.message}`);
                    await conn.reply(m.chat, DANBOORU_DOWNLOAD_ERROR, m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default DanbooruDownloadPlugin;
//# sourceMappingURL=DanbooruDownloadCommand.js.map