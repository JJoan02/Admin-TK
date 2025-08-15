import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { NIGHTCORE_ERROR } from '../../content/audio/nightcore-responses';
class NightcorePlugin {
    name = "NightcorePlugin";
    commands = [
        {
            name: "nightcore",
            alias: ["nightcoreeffect"],
            desc: "Aplica un efecto nightcore a un audio.",
            category: "Audio",
            react: "🎶",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(NIGHTCORE_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter:a atempo=1.07,asetrate=44100*1.20';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(NIGHTCORE_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(NIGHTCORE_ERROR);
                }
            }
        }
    ];
}
export default NightcorePlugin;
//# sourceMappingURL=nightcore.js.map