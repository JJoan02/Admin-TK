import { Command } from '../../core/Command.js';
import axios from 'axios';
class TeraboxDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('terabox', 'Descarga archivos de Terabox. Uso: !terabox <url>');
        this.#logger = logger;
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `Ejemplo:\n${usedPrefix + command} https://terabox.com/s/1kReYr_2pyxLZ2c2kEAHF3A`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const result = await this.#terabox(text);
            if (!result || result.length === 0) {
                await conn.reply(m.chat, 'No se encontraron archivos o el enlace no es válido.', m);
                await m.react('✖️');
                return;
            }
            for (let i = 0; i < result.length; i++) {
                const { fileName, type, thumb, url } = result[i];
                const caption = `📄 *Nombre File:* ${fileName}\n📂 *Formato:* ${type}`;
                await conn.sendFile(m.chat, url, fileName, caption, m, false, {
                    thumbnail: thumb ? await this.#getBuffer(thumb) : null
                });
            }
            await m.react('✅');
        }
        catch (err) {
            this.#logger.error(`Error al descargar de Terabox: ${err.message}`);
            await conn.reply(m.chat, 'Ocurrió un error al descargar el archivo de Terabox.', m);
            await m.react('✖️');
        }
    }
    async #terabox(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const a = await axios.post('https://teradl-api.dapuntaratya.com/generate_file', {
                    mode: 1,
                    url: url
                });
                const array = [];
                for (let x of a.data.list) {
                    const dl = await axios.post('https://teradl-api.dapuntaratya.com/generate_link', {
                        js_token: a.data.js_token,
                        cookie: a.data.cookie,
                        sign: a.data.sign,
                        timestamp: a.data.timestamp,
                        shareid: a.data.shareid,
                        uk: a.data.uk,
                        fs_id: x.fs_id
                    }).then((i) => i.data).catch((e) => e.response);
                    if (!dl.download_link)
                        continue;
                    array.push({
                        fileName: x.name,
                        type: x.type,
                        thumb: x.image,
                        url: dl.download_link.url_1
                    });
                }
                resolve(array);
            }
            catch (e) {
                reject(e.response ? e.response.data : e);
            }
        });
    }
    async #getBuffer(url) {
        try {
            const res = await axios({
                method: 'get',
                url,
                responseType: 'arraybuffer'
            });
            return res.data;
        }
        catch (err) {
            this.#logger.error(`Error al obtener buffer de URL: ${err.message}`);
            return null;
        }
    }
}
export default TeraboxDownloadCommand;
//# sourceMappingURL=TeraboxDownloadCommand.js.map