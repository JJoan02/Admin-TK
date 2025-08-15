import { ICommand, IPluginModule } from '../../types/plugin';
import { unlinkSync, readFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { AUDIO_EFFECTS_NO_AUDIO_REPLY, AUDIO_EFFECTS_ERROR, AUDIO_EFFECTS_FILTERS } from '../../content/audio/audio-effects-responses';
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};
class AudioEffectsPlugin {
    name = "AudioEffectsPlugin";
    commands = [
        {
            name: "audio_effects",
            alias: [
                'bass', 'blown', 'deep', 'earrape', 'fas?t', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'squirrel', 'chipmunk'
            ],
            desc: "Aplica varios efectos de audio a un mensaje de voz o audio.",
            category: "Audio",
            react: "🎶",
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                try {
                    const q = m.quoted ? m.quoted : m;
                    const mime = ((m.quoted ? m.quoted : m.msg).mimetype || '');
                    let set = AUDIO_EFFECTS_FILTERS[command.replace(/fas?t/, 'fast')];
                    if (!set) {
                        return conn.reply(m.chat, AUDIO_EFFECTS_NO_AUDIO_REPLY(usedPrefix, command), m);
                    }
                    if (/audio/.test(mime)) {
                        const ran = getRandom('.mp3');
                        const filename = join(process.cwd(), 'tmp/' + ran);
                        const media = await q.download(true);
                        exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
                            await unlinkSync(media);
                            if (err) {
                                console.error("FFmpeg Error:", err);
                                return conn.reply(m.chat, AUDIO_EFFECTS_ERROR, m);
                            }
                            const buff = await readFileSync(filename);
                            conn.sendFile(m.chat, buff, ran, null, m, true, {
                                type: 'audioMessage',
                                ptt: true,
                            });
                            unlinkSync(filename);
                        });
                    }
                    else {
                        throw AUDIO_EFFECTS_NO_AUDIO_REPLY(usedPrefix, command);
                    }
                }
                catch (e) {
                    console.error("Error en AudioEffectsPlugin:", e);
                    conn.reply(m.chat, AUDIO_EFFECTS_NO_AUDIO_REPLY(usedPrefix, command), m);
                }
            }
        }
    ];
}
export default AudioEffectsPlugin;
//# sourceMappingURL=audio-efectos.js.map