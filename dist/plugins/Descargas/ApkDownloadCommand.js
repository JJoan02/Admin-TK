import fetch from 'node-fetch';
import { APK_DOWNLOAD_NO_TEXT, APK_DOWNLOAD_INFO, APK_DOWNLOAD_DOWNLOADING, APK_DOWNLOAD_ERROR } from '../../content/descargas/apk-download-responses';
class ApkDownloadPlugin {
    name = "ApkDownloadPlugin";
    commands = [
        {
            name: "apk2",
            alias: ["apkdl2", "modapk2"],
            desc: "Descarga archivos APK.",
            category: "Descargas",
            react: "📥",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0]) {
                    return m.reply(APK_DOWNLOAD_NO_TEXT(usedPrefix, command));
                }
                try {
                    let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${args[0]}`);
                    let result = await res.json();
                    let { name, size, lastUpdate, icon, dllink: URL, package: packe } = result;
                    let texto = `${global.rg}\n` + APK_DOWNLOAD_INFO(name, size, lastUpdate, packe) + `\n${APK_DOWNLOAD_DOWNLOADING}`;
                    await conn.sendFile(m.chat, icon, name + '.jpg', texto, m);
                    await conn.sendMessage(m.chat, {
                        document: { url: URL },
                        mimetype: 'application/vnd.android.package-archive',
                        fileName: name + '.apk',
                        caption: ''
                    }, { quoted: m });
                }
                catch (e) {
                    console.error(e);
                    m.reply(APK_DOWNLOAD_ERROR(e.message));
                }
            }
        }
    ];
}
export default ApkDownloadPlugin;
//# sourceMappingURL=ApkDownloadCommand.js.map