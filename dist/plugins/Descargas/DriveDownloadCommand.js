import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
class DriveDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('drive', 'Descarga archivos de Google Drive. Uso: !drive <url>');
        this.#logger = logger;
        this.commands = ['drive', 'drivedl', 'dldrive', 'gdrive'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (!args[0]) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()} Ingrese una Url de Drive`, m);
            return;
        }
        let url = args[0];
        if (!(url && url.match(/drive\.google\.com\/file/i))) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()} Por favor, introduzca una URL válida. La entrada ingresada no es válida o es una carpeta.`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const res = await this.#fdrivedl(url);
            let caption = `    
┃ 💫 ${global.mid.name}: ${res.fileName}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 💪 ${global.mid.smsYT11}: ${this.#formatBytes(res.sizeBytes)}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 🚀 ${global.mid.smsYT12}: ${res.mimetype}`.trim();
            await conn.reply(m.chat, caption, m);
            const fileSize = this.#formatBytes(res.sizeBytes);
            if (fileSize.includes('GB') && parseFloat(fileSize.replace(' GB', '')) > 1.8) {
                await conn.reply(m.chat, 'El archivo es muy pesado para enviar directamente.', m);
                await m.react('✖️');
                return;
            }
            await conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar de Drive: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error inesperado al descargar de Drive.`, m);
            await m.react('✖️');
        }
    }
    async #fdrivedl(url) {
        let id;
        id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
        if (!id)
            throw 'No se encontró id de descarga';
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
            throw 'Se excedió el número de descargas del link';
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
    #formatBytes(bytes, decimals = 2) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
export default DriveDownloadCommand;
//# sourceMappingURL=DriveDownloadCommand.js.map