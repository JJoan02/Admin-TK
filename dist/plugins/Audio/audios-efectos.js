import { ICommand, IPluginModule } from '../../types/plugin';
import { unlinkSync, readFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { AUDIO_EFFECTS_EXTENDED_NO_AUDIO_REPLY, AUDIO_EFFECTS_EXTENDED_ERROR, AUDIO_EFFECTS_EXTENDED_FILTERS } from '../../content/audio/audio-effects-extended-responses';
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};
class AudioEffectsExtendedPlugin {
    name = "AudioEffectsExtendedPlugin";
    commands = [
        {
            name: "audio_effects_extended",
            alias: [
                'bass', 'blown', 'deep', 'earrape', 'fas?t', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'squirrel', 'chipmunk',
                'reverb', 'chorus', 'flanger', 'distortion', 'pitch', 'highpass', 'lowpass', 'underwater'
            ],
            desc: "Aplica varios efectos de audio a un mensaje de voz o audio, incluyendo efectos extendidos.",
            category: "Audio",
            react: "🎶",
            execute: async (Yaka, m, { conn, usedPrefix, command }) => {
                try {
                    const q = m.quoted ? m.quoted : m;
                    const mime = ((m.quoted ? m.quoted : m.msg).mimetype || '');
                    let set = AUDIO_EFFECTS_EXTENDED_FILTERS[command.replace(/fas?t/, 'fast')];
                    if (!set) {
                        return conn.reply(m.chat, AUDIO_EFFECTS_EXTENDED_NO_AUDIO_REPLY, m);
                    }
                    if (/audio/.test(mime)) {
                        await m.react('🕓');
                        let ran = getRandom('.mp3');
                        let filename = join(process.cwd(), 'tmp/' + ran);
                        let media = await q.download(true);
                        exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
                            await unlinkSync(media);
                            if (err) {
                                console.error("FFmpeg Error:", err);
                                return m.react('✖️');
                            }
                            let buff = await readFileSync(filename);
                            await conn.sendFile(m.chat, buff, ran, null, m, true, {
                                type: 'audioMessage',
                                ptt: true
                            });
                            await m.react('✅');
                            unlinkSync(filename);
                        });
                    }
                    else {
                        return conn.reply(m.chat, AUDIO_EFFECTS_EXTENDED_NO_AUDIO_REPLY, m);
                    }
                }
                catch (e) {
                    console.error("Error en AudioEffectsExtendedPlugin:", e);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default AudioEffectsExtendedPlugin;
//# sourceMappingURL=audios-efectos.js.map