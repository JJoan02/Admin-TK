import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { CAPCUT_NO_LINK, CAPCUT_INVALID_LINK, CAPCUT_PROCESSING, CAPCUT_SUCCESS, CAPCUT_ERROR_API, CAPCUT_ERROR_GENERIC } from '../../content/descargas/capcut-download-responses';
class CapcutDownloadPlugin {
    name = "CapcutDownloadPlugin";
    commands = [
        {
            name: "capcut",
            alias: ["ccdownload"],
            desc: "Descarga videos de CapCut.",
            category: "Descargas",
            react: "✂️",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args[0])
                    return conn.reply(m.chat, CAPCUT_NO_LINK, m);
                if (!args[0].match(/capcut/gi))
                    return conn.reply(m.chat, CAPCUT_INVALID_LINK, m);
                await m.react('🕓');
                try {
                    const response = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(args[0])}`);
                    const data = response.data;
                    if (data.status) {
                        let videoUrl = data.data.originalVideoUrl;
                        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
                        await conn.sendFile(m.chat, videoResponse.data, 'video.mp4', CAPCUT_SUCCESS, m);
                        await m.react('✅');
                    }
                    else {
                        await conn.reply(m.chat, CAPCUT_ERROR_API(data.data), m);
                        await m.react('✖️');
                    }
                }
                catch (error) {
                    console.error(error);
                    await conn.reply(m.chat, CAPCUT_ERROR_GENERIC, m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default CapcutDownloadPlugin;
//# sourceMappingURL=descargas-capcut.js.map