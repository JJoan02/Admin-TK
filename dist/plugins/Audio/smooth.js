import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { SMOOTH_ERROR } from '../../content/audio/smooth-responses';
class SmoothPlugin {
    name = "SmoothPlugin";
    commands = [
        {
            name: "smooth",
            alias: ["smootheffect"],
            desc: "Aplica un efecto suave a un audio.",
            category: "Audio",
            react: "🎧",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(SMOOTH_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(SMOOTH_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(SMOOTH_ERROR);
                }
            }
        }
    ];
}
export default SmoothPlugin;
//# sourceMappingURL=smooth.js.map