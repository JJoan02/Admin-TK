import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { REVERSE_ERROR } from '../../content/audio/reverse-responses';
class ReversePlugin {
    name = "ReversePlugin";
    commands = [
        {
            name: "reverse",
            alias: ["reverseeffect"],
            desc: "Aplica un efecto de reversa a un audio.",
            category: "Audio",
            react: "⏪",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(REVERSE_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter_complex "areverse"';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(REVERSE_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(REVERSE_ERROR);
                }
            }
        }
    ];
}
export default ReversePlugin;
//# sourceMappingURL=reverse.js.map