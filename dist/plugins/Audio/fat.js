import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { FAT_ERROR } from '../../content/audio/fat-responses';
class FatPlugin {
    name = "FatPlugin";
    commands = [
        {
            name: "fat",
            alias: ["fateffect"],
            desc: "Aplica un efecto 'fat' a un audio.",
            category: "Audio",
            react: "🐷",
            execute: async (Yaka, m, { conn, quoted, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(FAT_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter:a "atempo=1.8,asetrate=30100"';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(FAT_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(FAT_ERROR);
                }
            }
        }
    ];
}
export default FatPlugin;
//# sourceMappingURL=fat.js.map