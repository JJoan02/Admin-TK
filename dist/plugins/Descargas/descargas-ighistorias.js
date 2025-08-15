import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import axios from 'axios';
import { INSTAGRAM_STORY_NO_USERNAME, INSTAGRAM_STORY_NO_RESULTS, INSTAGRAM_STORY_API_ERROR, INSTAGRAM_STORY_INFO_MESSAGE } from '../../content/descargas/instagram-story-download-responses';
class InstagramStoryDownloadPlugin {
    name = "InstagramStoryDownloadPlugin";
    commands = [
        {
            name: "igstory",
            alias: ["ighistoria", "ighistorias"],
            desc: "Descarga historias de Instagram de un usuario.",
            category: "Descargas",
            react: "📸",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0])
                    throw `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsInsta2}\n*${usedPrefix + command} gata_dios*`;
                try {
                    await m.reply(global.wait);
                    const res = await fetch(`https://api.lolhuman.xyz/api/igstory/${args[0]}?apikey=${global.lolkeysapi}`);
                    var anu = await res.json();
                    var anuku = anu.result;
                    if (anuku == '')
                        return m.reply(`${global.lenguajeGB.smsAvisoFG()}${global.mid.smsInsta3}`);
                    for (var i of anuku) {
                        let res = await axios.head(i);
                        let mime = res.headers['content-type'];
                        if (/image/.test(mime))
                            await conn.sendFile(m.chat, i, 'error.jpg', null, m).catch(() => { return m.reply(`${global.lenguajeGB.smsAvisoFG()}${global.mid.smsInsta3}`); });
                        if (/video/.test(mime))
                            await conn.sendFile(m.chat, i, 'error.mp4', null, m).catch(() => { return m.reply(`${global.lenguajeGB.smsAvisoFG()}${global.mid.smsInsta3}`); });
                        conn.reply(m.chat, INSTAGRAM_STORY_INFO_MESSAGE(global.mid.smsAvisoIIG(), global.mid.smsinfo), m, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 | 𝙂𝙖𝙩𝙖 𝘿𝙞𝙤𝙨', body: 'Super Bot WhatsApp', previewType: 0, thumbnail: global.gataMenu, sourceUrl: global.md } } });
                    }
                }
                catch (e) {
                    await conn.reply(m.chat, INSTAGRAM_STORY_API_ERROR(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), m);
                    console.log(`❗❗ ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command} ❗❗`);
                    console.log(e);
                }
            }
        }
    ];
}
export default InstagramStoryDownloadPlugin;
//# sourceMappingURL=descargas-ighistorias.js.map