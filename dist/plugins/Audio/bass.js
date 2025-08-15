import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { BASS_ERROR } from '../../content/audio/bass-responses';
class BassPlugin {
    name = "BassPlugin";
    commands = [
        {
            name: "bass",
            alias: ["bassboost"],
            desc: "Aplica un efecto de refuerzo de graves a un audio.",
            category: "Audio",
            react: "🔊",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(BASS_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-af equalizer=f=18:width_type=o:width=2:g=14';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(BASS_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(BASS_ERROR);
                }
            }
        }
    ];
}
export default BassPlugin;
//# sourceMappingURL=bass.js.map