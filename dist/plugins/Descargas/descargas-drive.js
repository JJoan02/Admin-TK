import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { DRIVE_DOWNLOAD_NO_URL, DRIVE_DOWNLOAD_INVALID_URL, DRIVE_DOWNLOAD_UNEXPECTED_ERROR, DRIVE_DOWNLOAD_CAPTION, DRIVE_DOWNLOAD_FILE_TOO_LARGE, DRIVE_DOWNLOAD_NO_ID, DRIVE_DOWNLOAD_DOWNLOAD_LIMIT_EXCEEDED } from '../../content/descargas/drive-download-responses';
async function fdrivedl(url) {
    let id;
    id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))?.[1];
    if (!id)
        throw DRIVE_DOWNLOAD_NO_ID;
    let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
        method: 'post',
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            'content-length': '0',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            origin: 'https://drive.google.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
            'x-drive-first-party': 'DriveWebUi',
            'x-json-requested': 'true',
        },
    });
    let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl)
        throw DRIVE_DOWNLOAD_DOWNLOAD_LIMIT_EXCEEDED;
    let data = await fetch(downloadUrl);
    if (data.status !== 200)
        throw data.statusText;
    return {
        downloadUrl,
        fileName,
        sizeBytes,
        mimetype: data.headers.get('content-type'),
    };
}
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
class DriveDownloadPlugin {
    name = "DriveDownloadPlugin";
    commands = [
        {
            name: "drive",
            alias: ["drivedl", "dldrive", "gdrive"],
            desc: "Descarga archivos de Google Drive.",
            category: "Descargas",
            react: "📁",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args[0])
                    throw conn.reply(m.chat, DRIVE_DOWNLOAD_NO_URL(global.lenguajeGB.smsAvisoMG()), m);
                let url = args[0];
                if (!(url && url.match(/drive\.google\.com\/file/i)))
                    throw conn.reply(m.chat, DRIVE_DOWNLOAD_INVALID_URL(global.lenguajeGB.smsAvisoMG()), m);
                try {
                    var res = await fdrivedl(url);
                }
                catch (e) {
                    throw DRIVE_DOWNLOAD_UNEXPECTED_ERROR;
                }
                let caption = DRIVE_DOWNLOAD_CAPTION(res.fileName, formatBytes(res.sizeBytes), res.mimetype);
                m.reply(`${caption}`);
                let fileSize = formatBytes(res.sizeBytes);
                if (fileSize.includes('GB') && parseInt(fileSize.replace(' GB', '')) > 1.8)
                    throw DRIVE_DOWNLOAD_FILE_TOO_LARGE;
                conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
            }
        }
    ];
}
export default DriveDownloadPlugin;
//# sourceMappingURL=descargas-drive.js.map