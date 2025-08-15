import { Command } from '../../core/Command.js';
import { morseMaps, morseMessages } from '../../lib/herramientas-content.js';
class MorseCodeCommand extends Command {
    #logger;
    constructor(logger) {
        super('morse', 'Codifica y decodifica texto a código Morse. Uso: !morse <codificar/decodificar> <texto>');
        this.#logger = logger;
        this.commands = ['morse', 'morce'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        const [action, ...input] = text.toLowerCase().split(' ');
        const inputText = input.join(' ');
        if (!inputText) {
            await conn.reply(m.chat, morseMessages.invalidAction(usedPrefix, command), m);
            return;
        }
        let output = '';
        try {
            if (action === 'codificar' || action === 'encode') {
                for (let i of inputText) {
                    if (!morseMaps.encode[i])
                        output += i;
                    for (let j in morseMaps.encode) {
                        if (j === i)
                            output += morseMaps.encode[i] + " ";
                    }
                }
                await conn.reply(m.chat, output, m);
            }
            else if (action === 'decodificar' || action === 'decode') {
                const str = inputText.replace(/[.]/g, "•");
                for (let i of str.split(" ")) {
                    if (!morseMaps.decode[i])
                        output += i;
                    for (let j in morseMaps.decode) {
                        if (j === i)
                            output += morseMaps.decode[i];
                    }
                }
                await conn.reply(m.chat, output, m);
            }
            else {
                await conn.reply(m.chat, morseMessages.invalidAction(usedPrefix, command), m);
            }
        }
        catch (e) {
            this.#logger.error(`Error en comando Morse: ${e.message}`);
            await conn.reply(m.chat, `Ocurrió un error al procesar la solicitud.`, m);
        }
    }
}
export default MorseCodeCommand;
//# sourceMappingURL=MorseCodeCommand.js.map