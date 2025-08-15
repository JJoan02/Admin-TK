import { ICommand, IPluginModule } from '../../types/plugin';
import { exec } from 'child_process';
import * as fs from 'fs';
import { ROBOT_ERROR } from '../../content/audio/robot-responses';
class RobotPlugin {
    name = "RobotPlugin";
    commands = [
        {
            name: "robot",
            alias: ["roboteffect"],
            desc: "Aplica un efecto robótico a un audio.",
            category: "Audio",
            react: "🤖",
            execute: async (Yaka, m, { conn, mime }) => {
                if (!quoted || !/audio/.test(mime)) {
                    return m.reply(ROBOT_ERROR);
                }
                let media = await conn.downloadAndSaveMediaMessage(quoted);
                let set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
                let ran = getRandom('.mp3');
                try {
                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error("FFmpeg Error:", err);
                            return m.reply(ROBOT_ERROR);
                        }
                        let buff = fs.readFileSync(ran);
                        conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                        fs.unlinkSync(ran);
                    });
                }
                catch (e) {
                    m.reply(ROBOT_ERROR);
                }
            }
        }
    ];
}
export default RobotPlugin;
//# sourceMappingURL=robot.js.map