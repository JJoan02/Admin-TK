import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { DEEP_ERROR } from '../../content/audio/deep-responses';
class DeepPlugin {
    name = "DeepPlugin";
    commands = [
        {
            name: "deep",
            alias: ["deepeffect"],
            desc: "Aplica un efecto de reverberación profunda a un audio.",
            category: "Audio",
            react: "🌊",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(DEEP_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-af atempo=4/4,asetrate=44500*2/3';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(DEEP_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(DEEP_ERROR);
                }
            }
        }
    ];
}
export default DeepPlugin;
//# sourceMappingURL=deep.js.map