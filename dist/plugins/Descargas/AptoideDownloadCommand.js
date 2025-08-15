import { ICommand, IPluginModule } from '../../types/plugin';
import { search, download } from 'aptoide-scraper';
import { APTOIDE_NO_TEXT, APTOIDE_NO_RESULTS, APTOIDE_NO_DOWNLOAD_LINK, APTOIDE_INFO_HEADER, APTOIDE_INFO_NAME, APTOIDE_INFO_PACKAGE, APTOIDE_INFO_LAST_UPDATE, APTOIDE_INFO_SIZE, APTOIDE_FILE_TOO_LARGE, APTOIDE_ERROR_GENERIC } from '../../content/descargas/aptoide-download-responses';
class AptoideDownloadPlugin {
    name = "AptoideDownloadPlugin";
    commands = [
        {
            name: "apk",
            alias: ["modapk", "dapk2", "aptoide", "aptoidedl"],
            desc: "Busca y descarga APKs de Aptoide.",
            category: "Descargas",
            react: "📥",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text) {
                    return conn.reply(m.chat, APTOIDE_NO_TEXT, m);
                }
                try {
                    await m.react(global.rwait);
                    const searchA = await search(text);
                    if (!searchA || searchA.length === 0) {
                        await conn.reply(m.chat, APTOIDE_NO_RESULTS, m);
                        await m.react('✖️');
                        return;
                    }
                    const data5 = await download(searchA[0].id);
                    if (!data5 || !data5.dllink) {
                        await conn.reply(m.chat, APTOIDE_NO_DOWNLOAD_LINK, m);
                        await m.react('✖️');
                        return;
                    }
                    let response = `${APTOIDE_INFO_HEADER}` +
                        `${APTOIDE_INFO_NAME(data5.name)}
` +
                        `${APTOIDE_INFO_PACKAGE(data5.package)}
` +
                        `${APTOIDE_INFO_LAST_UPDATE(data5.lastup)}
` +
                        `${APTOIDE_INFO_SIZE(data5.size)}`;
                    await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', response, m, null, global.fake);
                    if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 999) {
                        await conn.reply(m.chat, APTOIDE_FILE_TOO_LARGE, m);
                        await m.react('✖️');
                        return;
                    }
                    await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m });
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al descargar APK de Aptoide: ${e.message}`);
                    await conn.reply(m.chat, APTOIDE_ERROR_GENERIC, m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default AptoideDownloadPlugin;
//# sourceMappingURL=AptoideDownloadCommand.js.map