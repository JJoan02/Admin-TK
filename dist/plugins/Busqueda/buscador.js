import { ICommand, IPluginModule } from '../../types/plugin';
import * as fs from 'fs';
import * as path from 'path';
import { SYNTAX_CHECKER_HEADER, SYNTAX_CHECKER_ERROR_ITEM, SYNTAX_CHECKER_NO_ERRORS, SYNTAX_CHECKER_GENERIC_ERROR } from '../../content/busqueda/syntax-checker-responses';
class SyntaxCheckerPlugin {
    name = "SyntaxCheckerPlugin";
    commands = [
        {
            name: "rev",
            alias: [],
            desc: "Verifica errores de sintaxis en los plugins.",
            category: "Herramientas",
            react: "🔍",
            execute: async (Yaka, m, { conn }) => {
                try {
                    await m.react('🕒');
                    conn.sendPresenceUpdate('composing', m.chat);
                    const pluginsDir = path.join(process.cwd(), 'src', 'plugins');
                    const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));
                    let response = SYNTAX_CHECKER_HEADER;
                    let hasErrors = false;
                    for (const file of files) {
                        try {
                            await import(path.resolve(pluginsDir, file));
                        }
                        catch (error) {
                            hasErrors = true;
                            response += SYNTAX_CHECKER_ERROR_ITEM(file, error.message);
                        }
                    }
                    if (!hasErrors) {
                        response += SYNTAX_CHECKER_NO_ERRORS;
                    }
                    await conn.reply(m.chat, response, m);
                    await m.react('✅');
                }
                catch (err) {
                    await m.react('✖️');
                    console.error(err);
                    conn.reply(m.chat, SYNTAX_CHECKER_GENERIC_ERROR, m, rcanal);
                }
            }
        }
    ];
}
export default SyntaxCheckerPlugin;
//# sourceMappingURL=buscador.js.map