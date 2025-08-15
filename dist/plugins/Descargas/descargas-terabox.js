import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { TERABOX_NO_URL, TERABOX_INVALID_URL, TERABOX_CAPTION, TERABOX_ERROR_DOWNLOAD } from '../../content/descargas/terabox-download-responses';
async function terabox(url) {
    return new Promise(async (resolve, reject) => {
        await axios
            .post('https://teradl-api.dapuntaratya.com/generate_file', {
            mode: 1,
            url: url
        })
            .then(async (a) => {
            const array = [];
            for (let x of a.data.list) {
                let dl = await axios
                    .post('https://teradl-api.dapuntaratya.com/generate_link', {
                    js_token: a.data.js_token,
                    cookie: a.data.cookie,
                    sign: a.data.sign,
                    timestamp: a.data.timestamp,
                    shareid: a.data.shareid,
                    uk: a.data.uk,
                    fs_id: x.fs_id
                })
                    .then((i) => i.data)
                    .catch((e) => e.response);
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
        })
            .catch((e) => reject(e.response.data));
    });
}
async function getBuffer(url) {
    try {
        const res = await axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
class TeraboxDownloadPlugin {
    name = "TeraboxDownloadPlugin";
    commands = [
        {
            name: "terabox",
            alias: [],
            desc: "Descarga archivos de Terabox.",
            category: "Descargas",
            react: "☁️",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    return m.reply(TERABOX_NO_URL(usedPrefix, command));
                await m.react('🕓');
                try {
                    const result = await terabox(text);
                    if (!result.length)
                        return m.reply(TERABOX_INVALID_URL);
                    for (let i = 0; i < result.length; i++) {
                        const { fileName, type, thumb, url } = result[i];
                        const caption = TERABOX_CAPTION(fileName, type);
                        await m.react('✅');
                        await conn.sendFile(m.chat, url, fileName, caption, m, false, {
                            thumbnail: thumb ? await getBuffer(thumb) : null
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                    m.reply(TERABOX_ERROR_DOWNLOAD);
                }
            }
        }
    ];
}
export default TeraboxDownloadPlugin;
//# sourceMappingURL=descargas-terabox.js.map