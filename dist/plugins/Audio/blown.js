import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { BLOWN_ERROR } from '../../content/audio/blown-responses';
class BlownPlugin {
    name = "BlownPlugin";
    commands = [
        {
            name: "blown",
            alias: ["blowneffect"],
            desc: "Aplica un efecto de 'blown' a un audio.",
            category: "Audio",
            react: "💨",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(BLOWN_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-af acrusher=.1:1:40:0:log';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(BLOWN_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(BLOWN_ERROR);
                }
            }
        }
    ];
}
export default BlownPlugin;
//# sourceMappingURL=blown.js.map