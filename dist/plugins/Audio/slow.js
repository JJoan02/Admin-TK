import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as  from () => fs;
from;
'fs';
import { SLOW_ERROR } from '../../content/audio/slow-responses';
class SlowPlugin {
    name = "SlowPlugin";
    commands = [
        {
            name: "slow",
            alias: ["sloweffect"],
            desc: "Aplica un efecto lento a un audio.",
            category: "Audio",
            react: "🐌",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(SLOW_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter:a "atempo=0.8,asetrate=44100"';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(SLOW_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(SLOW_ERROR);
                }
            }
        }
    ];
}
export default SlowPlugin;
//# sourceMappingURL=slow.js.map