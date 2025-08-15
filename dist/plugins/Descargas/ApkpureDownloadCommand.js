import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { APKPURE_NO_TEXT, APKPURE_NO_RESULTS, APKPURE_NO_DOWNLOAD_LINK, APKPURE_INFO_HEADER, APKPURE_INFO_NAME, APKPURE_INFO_PACKAGE, APKPURE_INFO_LAST_UPDATE, APKPURE_INFO_SIZE, APKPURE_INFO_FOOTER, APKPURE_SIZE_LIMIT_EXCEEDED, APKPURE_ERROR_REPORT } from '../../content/descargas/apkpure-download-responses';
const apkpureApi = 'https://apkpure.com/api/v2/search?q=';
const apkpureDownloadApi = 'https://apkpure.com/api/v2/download?id=';
class ApkpureDownloadPlugin {
    name = "ApkpureDownloadPlugin";
    commands = [
        {
            name: "apkpure",
            alias: ["apkp", "apkdl"],
            desc: "Busca y descarga APKs de Apkpure.com.",
            category: "Descargas",
            react: "📥",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, APKPURE_NO_TEXT(global.lenguajeGB.smsAvisoMG(), global.mid.smsApk), m);
                }
                try {
                    await m.react(global.rwait);
                    const searchResults = await ApkpureDownloadPlugin.searchApk(text);
                    if (!searchResults || searchResults.length === 0) {
                        await conn.reply(m.chat, APKPURE_NO_RESULTS(text), m);
                        await m.react('✖️');
                        return;
                    }
                    const apkData = await ApkpureDownloadPlugin.downloadApk(searchResults[0].id);
                    if (!apkData || !apkData.dllink) {
                        await conn.reply(m.chat, APKPURE_NO_DOWNLOAD_LINK(text), m);
                        await m.react('✖️');
                        return;
                    }
                    const response = `${APKPURE_INFO_HEADER(global.eg)}
` +
                        `${APKPURE_INFO_NAME(apkData.name)}
` +
                        `${APKPURE_INFO_PACKAGE(apkData.package)}
` +
                        `${APKPURE_INFO_LAST_UPDATE(global.mid.smsApk2, apkData.lastup)}
` +
                        `${APKPURE_INFO_SIZE(global.mid.smsYT11, apkData.size)}
` +
                        `${APKPURE_INFO_FOOTER(global.mid.smsApk3)}`;
                    await conn.sendMessage(m.chat, { image: { url: apkData.icon }, caption: response }, { quoted: m });
                    if (apkData.size.includes('GB') || parseFloat(apkData.size.replace(' MB', '')) > 999) {
                        await conn.sendMessage(m.chat, { text: APKPURE_SIZE_LIMIT_EXCEEDED(global.mid.smsApk4) }, { quoted: m });
                    }
                    await conn.sendMessage(m.chat, { document: { url: apkData.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: apkData.name + '.apk', caption: null }, { quoted: m });
                    await m.react('✅');
                }
                catch (e) {
                    console.error(e);
                    await conn.reply(m.chat, APKPURE_ERROR_REPORT(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), m);
                    await m.react('✖️');
                }
            }
        }
    ];
    static async searchApk(text) {
        const response = await axios.get(`${apkpureApi}${encodeURIComponent(text)}`);
        return response.data.results;
    }
    static async downloadApk(id) {
        const response = await axios.get(`${apkpureDownloadApi}${id}`);
        return response.data;
    }
}
export default ApkpureDownloadPlugin;
//# sourceMappingURL=ApkpureDownloadCommand.js.map