import { Command } from '../../core/Command.js';
import UglifyJS from 'uglify-js';
import { deobfuscatorMessages } from '../../lib/herramientas-content.js';
class JavaScriptDeobfuscatorCommand extends Command {
    #logger;
    constructor(logger) {
        super('deobfuscate', 'Desofusca código JavaScript. Uso: !deobfuscate <code>');
        this.#logger = logger;
        this.commands = ['desofuscar'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, deobfuscatorMessages.noCode, m);
            return;
        }
        try {
            await m.react(global.rwait);
            const minifyOptions = {
                output: {
                    beautify: true,
                    indent_level: 2
                }
            };
            const result = UglifyJS.minify(text, minifyOptions);
            if (result.error) {
                throw new Error(result.error.message);
            }
            let resultCode = result.code;
            resultCode = resultCode.replace(/var\s+([a-zA-Z0-9_]+)\s*=\s*([^]+)/g, (match, varName, arrContent) => {
                const values = arrContent.split(',').map(val => val.trim().replace(/['"]/g, ''));
                return `var ${varName} = ${JSON.stringify(values)};`;
            });
            await conn.reply(m.chat, deobfuscatorMessages.success(resultCode), m);
            await m.react('✅');
        }
        catch (error) {
            this.#logger.error(`Error al desofuscar código: ${error.message}`);
            await conn.reply(m.chat, deobfuscatorMessages.error(error.message), m);
            await m.react('✖️');
        }
    }
}
export default JavaScriptDeobfuscatorCommand;
//# sourceMappingURL=JavaScriptDeobfuscatorCommand.js.map