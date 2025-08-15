import { Command } from '../../core/Command.js';
import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';
import { simiChatbotMessages } from '../../lib/ia-content.js';
class SimiChatbotCommand extends Command {
    #logger;
    #config;
    constructor(logger, config) {
        super('simi', 'Interactúa con el chatbot SimSimi.');
        this.#logger = logger;
        this.#config = config;
        this.commands = ['simi'];
    }
    async execute(context) {
        const { m, conn, text, command, args, usedPrefix } = context;
        if (!text) {
            await conn.reply(m.chat, simiChatbotMessages.noText, m);
            return;
        }
        try {
            const resSimi = await this.#simitalk(text, this.#config.api.simsimiApiKey);
            await conn.reply(m.chat, resSimi.resultado.simsimi, m);
        }
        catch (e) {
            this.#logger.error(`Error in SimiChatbotCommand: ${e.message}`);
            await m.react(global.error);
            await conn.reply(m.chat, simiChatbotMessages.error, m);
        }
    }
    async #simitalk(ask, apikeyyy, language = "es") {
        if (!ask)
            return { status: false, resultado: { msg: simiChatbotMessages.simiTalkNoText } };
        try {
            const response1 = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
            let trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true });
            if (trad1.text == 'indefinida' || response1 == '' || !response1.data)
                throw new Error("API 1 failed");
            return { status: true, resultado: { simsimi: trad1.text } };
        }
        catch (e1) {
            this.#logger.warn(`Simi API 1 failed: ${e1.message}. Trying API 2.`);
            try {
                const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
                return { status: true, resultado: { simsimi: response2.data.message } };
            }
            catch (error2) {
                this.#logger.error(`Simi API 2 also failed: ${error2.message}`);
                return { status: false, resultado: { msg: simiChatbotMessages.simiTalkError, error: error2.message } };
            }
        }
    }
}
export default SimiChatbotCommand;
//# sourceMappingURL=SimiChatbotCommand.js.map