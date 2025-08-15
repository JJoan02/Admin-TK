import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from "node-fetch";
import { TIKTOK_SEARCH_DOWNLOAD_NO_TEXT, TIKTOK_SEARCH_DOWNLOAD_RESULTS_FOUND, TIKTOK_SEARCH_DOWNLOAD_NO_RESULTS, TIKTOK_SEARCH_DOWNLOAD_VIDEO_TITLE, TIKTOK_SEARCH_DOWNLOAD_VIDEO_DATE, TIKTOK_SEARCH_DOWNLOAD_AUTHOR_NAME, TIKTOK_SEARCH_DOWNLOAD_AUTHOR_USERNAME, TIKTOK_SEARCH_DOWNLOAD_ERROR_FETCHING } from '../../content/descargas/tiktok-search-download-responses';
const obtenerTikTok = async (query) => {
    try {
        const internalApiUrl = `http://localhost:3000/api/tiktok/search?query=${encodeURIComponent(query)}`;
        const response = await fetch(internalApiUrl);
        const data = await response.json();
        if (data.status && data.result && data.result.length > 0) {
            return data.result.slice(0, 5);
        }
        return null;
    }
    catch (error) {
        console.error(TIKTOK_SEARCH_DOWNLOAD_ERROR_FETCHING, error);
        return null;
    }
};
class TiktokSearchDownloadPlugin {
    name = "TiktokSearchDownloadPlugin";
    commands = [
        {
            name: "tik",
            alias: [],
            desc: "Busca y descarga videos de TikTok por nombre.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text) {
                    return m.reply(TIKTOK_SEARCH_DOWNLOAD_NO_TEXT);
                }
                m.react("⏳");
                const resultados = await obtenerTikTok(text);
                if (resultados) {
                    m.reply(TIKTOK_SEARCH_DOWNLOAD_RESULTS_FOUND(resultados.length));
                    for (const resultado of resultados) {
                        let mensaje = `${TIKTOK_SEARCH_DOWNLOAD_VIDEO_TITLE} ${resultado.title}\n` +
                            `${TIKTOK_SEARCH_DOWNLOAD_VIDEO_DATE} ${resultado.date}\n\n` +
                            `${TIKTOK_SEARCH_DOWNLOAD_AUTHOR_NAME} ${resultado.author.nickname}\n` +
                            `${TIKTOK_SEARCH_DOWNLOAD_AUTHOR_USERNAME} @${resultado.author.unique_id}\n`;
                        await conn.sendFile(m.chat, resultado.play, "tiktok.mp4", mensaje, m);
                    }
                }
                else {
                    m.reply(TIKTOK_SEARCH_DOWNLOAD_NO_RESULTS);
                }
            }
        }
    ];
}
export default TiktokSearchDownloadPlugin;
//# sourceMappingURL=descargar-tik.js.map