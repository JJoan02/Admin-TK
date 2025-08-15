import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import { SOUNDCLOUD_NO_TEXT, SOUNDCLOUD_SEARCH_HEADER, SOUNDCLOUD_SEARCH_TEXT, SOUNDCLOUD_SEARCH_BUTTON_TEXT, SOUNDCLOUD_DOWNLOAD_PROCESSING, SOUNDCLOUD_DOWNLOAD_ERROR } from '../../content/descargas/soundcloud-responses';
const delay = (time) => new Promise(res => setTimeout(res, time));
class SoundcloudDownloadPlugin {
    name = "SoundcloudDownloadPlugin";
    commands = [
        {
            name: "soundcloud",
            alias: ["soundcloudr"],
            desc: "Busca y descarga música de SoundCloud.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, command, args, text, usedPrefix }) => {
                if (!text)
                    return m.reply(SOUNDCLOUD_NO_TEXT);
                try {
                    if (command.toLowerCase() === "soundcloudr") {
                        let response = await axios.get(`https://m.soundcloud.com/search/sounds?q=${text}`);
                        let data = response.data;
                        let regex = /(?<="permalink_url":")[^"]*/g;
                        let urls = data.match(regex);
                        let regex2 = /(?<="permalink":")[^"]*/g;
                        let nombres = data.match(regex2);
                        let listSections = [];
                        for (let index = 0; index < urls.length; index++) {
                            let counts = urls[index].split('/').length - 1;
                            if (counts > 3) {
                                listSections.push({
                                    rows: [
                                        {
                                            header: `Music ${index + 1}`,
                                            title: "",
                                            description: `${nombres[index]}\n`,
                                            id: `${usedPrefix}soundcloudr ${urls[index]}`
                                        }
                                    ]
                                });
                            }
                        }
                        return await conn.sendList(m.chat, `${global.htki} ${SOUNDCLOUD_SEARCH_HEADER(global.htki, global.htka)}\n`, `\n${SOUNDCLOUD_SEARCH_TEXT(text)}`, SOUNDCLOUD_SEARCH_BUTTON_TEXT, listSections, global.fkontak);
                    }
                    let dddata = await axios.get(`${global.apis}/download/soundcloud?url=${text}`);
                    let ddlink = dddata.data.data.url;
                    let ddname = dddata.data.data.title;
                    let portada = dddata.data.data.imageURL;
                    await delay(2000);
                    conn.sendMessage(m.chat, { image: { url: portada }, caption: `${SOUNDCLOUD_DOWNLOAD_PROCESSING}${ddname}\n\n${global.wm}` }, { quoted: m });
                    await delay(15000);
                    conn.sendMessage(m.chat, { audio: { url: ddlink }, fileName: `${ddname}`, mimetype: 'audio/mpeg' }, { quoted: m });
                }
                catch (e) {
                    return m.reply(SOUNDCLOUD_DOWNLOAD_ERROR);
                }
            }
        }
    ];
}
export default SoundcloudDownloadPlugin;
//# sourceMappingURL=descargas-soundcloud.js.map