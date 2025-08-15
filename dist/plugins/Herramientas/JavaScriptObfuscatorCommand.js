import { Command } from '../../core/Command.js';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { obfuscatorMessages } from '../../lib/herramientas-content.js';
class JavaScriptObfuscatorCommand extends Command {
    #logger;
    constructor(logger) {
        super('obfuscate', 'Ofusca código JavaScript. Uso: !obfuscate <code>');
        this.#logger = logger;
        this.commands = ['ofuscar', 'obfuscator'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, obfuscatorMessages.noCode(usedPrefix), m);
            return;
        }
        try {
            await m.react(global.rwait);
            const obfuscatedCode = JavaScriptObfuscator.obfuscate(text, {
                compact: false,
                controlFlowFlattening: true,
                deadCodeInjection: true,
                simplify: true,
                numbersToExpressions: true
            }).getObfuscatedCode();
            await conn.reply(m.chat, obfuscatorMessages.success(obfuscatedCode), m);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al ofuscar código: ${e.message}`);
            await conn.reply(m.chat, obfuscatorMessages.error(e.message), m);
            await m.react('✖️');
        }
    }
}
export default JavaScriptObfuscatorCommand;
//# sourceMappingURL=JavaScriptObfuscatorCommand.js.map