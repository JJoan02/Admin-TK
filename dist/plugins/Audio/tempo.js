import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { TEMPO_ERROR } from '../../content/audio/tempo-responses';
class TempoPlugin {
    name = "TempoPlugin";
    commands = [
        {
            name: "tempo",
            alias: ["tempoeffect"],
            desc: "Aplica un efecto de tempo a un audio.",
            category: "Audio",
            react: "⏱️",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(TEMPO_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter:a "atempo=0.9,asetrate=65100"';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(TEMPO_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(TEMPO_ERROR);
                }
            }
        }
    ];
}
export default TempoPlugin;
//# sourceMappingURL=tempo.js.map