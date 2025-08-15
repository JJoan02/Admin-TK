import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';
import { simiConfig } from '../../lib/anti-content.js';
class SimiChatbotPlugin {
    #dbService;
    #config;
    #logger;
    constructor(dbService, config, logger) {
        this.#dbService = dbService;
        this.#config = config;
        this.#logger = logger;
    }
    async before(m, { conn }) {
        const chat = await this.#dbService.getChat(m.chat);
        if (!chat || !chat.simi)
            return true;
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text))
            return true;
        const ignoredKeywords = simiConfig.ignoredKeywords;
        const messageTextLower = m.text.toLowerCase();
        if (ignoredKeywords.some(keyword => messageTextLower.includes(keyword)))
            return true;
        try {
            const ressimi = await this.#simitalk(m.text, this.#config.api.simsimiApiKey);
            if (ressimi.status) {
                await conn.reply(m.chat, ressimi.resultado.simsimi, m);
            }
            else {
                this.#logger.warn(`SimiChatbotPlugin: ${ressimi.resultado.msg}`);
            }
        }
        catch (e) {
            this.#logger.error(`Error en SimiChatbotPlugin: ${e.message}`);
            await conn.reply(m.chat, simiConfig.errorMessage, m);
        }
        return true;
    }
    async #simitalk(ask, apikeyyy, language = "es") {
        if (!ask)
            return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." } };
        try {
            const response1 = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
            let trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true });
            if (trad1.text === 'indefinida' || !response1.data) {
                throw new Error("API 1 falló o devolvió respuesta indefinida");
            }
            return { status: true, resultado: { simsimi: trad1.text } };
        }
        catch (error1) {
            this.#logger.warn(`Simi API 1 falló: ${error1.message}. Intentando API 2.`);
            try {
                const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
                return { status: true, resultado: { simsimi: response2.data.message } };
            }
            catch (error2) {
                this.#logger.error(`Simi API 2 falló: ${error2.message}`);
                return { status: false, resultado: { msg: "Todas las API's fallaron. Inténtalo de nuevo más tarde." } };
            }
        }
    }
}
export default SimiChatbotPlugin;
//# sourceMappingURL=SimiChatbotPlugin.js.map