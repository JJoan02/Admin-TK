import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { geminiMessages } from '../../lib/herramientas-content.js';
class GeminiCommand extends Command {
    #logger;
    constructor(logger) {
        super('gemini', 'Interactúa con la IA de Gemini (Bard). Uso: !gemini <pregunta>');
        this.#logger = logger;
        this.commands = ['bard', 'gemini'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, geminiMessages.noText(usedPrefix, command), m);
            return;
        }
        try {
            conn.sendPresenceUpdate('composing', m.chat);
            const apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`);
            const res = await apii.json();
            if (res.result) {
                await m.reply(res.result);
            }
            else {
                throw new Error('No se obtuvo respuesta de la API de Gemini.');
            }
        }
        catch (e) {
            this.#logger.error(`Error al interactuar con Gemini: ${e.message}`);
            await conn.reply(m.chat, geminiMessages.error(usedPrefix, command), m);
        }
    }
}
export default GeminiCommand;
//# sourceMappingURL=GeminiCommand.js.map