import { Command } from '../../core/Command.js';
import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { textToSpeechMessages } from '../../lib/convertidor-content.js';
const defaultLang = 'es';
class TextToSpeechCommand extends Command {
    #logger;
    constructor(logger) {
        super('tts', 'Convierte texto a voz.');
        this.#logger = logger;
        this.commands = ['tts', 'gtts'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        let lang = args[0];
        let text = args.slice(1).join(' ');
        if ((args[0] || '').length !== 2) {
            lang = defaultLang;
            text = args.join(' ');
        }
        if (!text && m.quoted?.text)
            text = m.quoted.text;
        if (!text) {
            await conn.reply(m.chat, textToSpeechMessages.noText(usedPrefix, command), m);
            return;
        }
        try {
            const audioBuffer = await this.#tts(text, lang);
            await conn.sendFile(m.chat, audioBuffer, 'tts.opus', null, m, true);
        }
        catch (e) {
            this.#logger.error(`Error in TextToSpeechCommand: ${e.message}`);
            await conn.reply(m.chat, textToSpeechMessages.error, m);
        }
    }
    #tts(text, lang = 'es') {
        return new Promise((resolve, reject) => {
            try {
                const tts = gtts(lang);
                const filePath = join(process.cwd(), 'tmp', `${Date.now()}.wav`);
                tts.save(filePath, text, (err) => {
                    if (err) {
                        this.#logger.error(`Error saving TTS file: ${err.message}`);
                        return reject(err);
                    }
                    try {
                        const audioBuffer = readFileSync(filePath);
                        resolve(audioBuffer);
                    }
                    catch (readErr) {
                        this.#logger.error(`Error reading TTS file: ${readErr.message}`);
                        reject(readErr);
                    }
                    finally {
                        unlinkSync(filePath);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
export default TextToSpeechCommand;
//# sourceMappingURL=TextToSpeechCommand.js.map