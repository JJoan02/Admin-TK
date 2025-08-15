import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { perplexity } from '../lib/chatgpt.js';
import { Configuration, OpenAIApi } from "openai";
import { chatGptMessages } from '../../lib/herramientas-content.js';
class ChatGPTCommand extends Command {
    #logger;
    #config;
    #openai;
    constructor(logger, config) {
        super('chatgpt', 'Interactúa con un chatbot de IA. Uso: !chatgpt <pregunta>');
        this.#logger = logger;
        this.#config = config;
        this.commands = ['openai', 'chatgpt', 'ia', 'ai', 'openai2', 'chatgpt2', 'ia2'];
        if (this.#config.api.openaiApiKey) {
            const configuration = new Configuration({ apiKey: this.#config.api.openaiApiKey });
            this.#openai = new OpenAIApi(configuration);
        }
        else {
            this.#logger.warn('OPENAI_API_KEY no configurada. La API de OpenAI no estará disponible.');
        }
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, chatGptMessages.noText(usedPrefix, command), m);
            return;
        }
        try {
            await m.react(global.rwait);
            let responseText = null;
            if (perplexity && perplexity.chat) {
                try {
                    const syms1 = await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(v => v.text());
                    const messages = [{ role: 'system', content: syms1 }, { role: 'user', content: text }];
                    const chooseModel = (query) => {
                        const lowerText = query.toLowerCase();
                        if (lowerText.includes('código') || lowerText.includes('programación') || lowerText.includes('code') || lowerText.includes('script'))
                            return 'codellama-70b-instruct';
                        if (lowerText.includes('noticias') || lowerText.includes('actual') || lowerText.includes('hoy') || lowerText.includes('último'))
                            return 'sonar-medium-online';
                        if (lowerText.includes('explica') || lowerText.includes('por qué') || lowerText.includes('razona') || lowerText.includes('analiza'))
                            return 'sonar-reasoning-pro';
                        if (lowerText.includes('cómo') || lowerText.includes('paso a paso') || lowerText.includes('instrucciones'))
                            return 'mixtral-8x7b-instruct';
                        if (lowerText.includes('charla') || lowerText.includes('habla') || lowerText.includes('dime'))
                            return 'sonar-medium-chat';
                        return 'sonar-pro';
                    };
                    const selectedModel = chooseModel(text);
                    const fallbackModels = Object.keys(perplexity.api.models).filter(m => m !== selectedModel);
                    let response = await perplexity.chat(messages, selectedModel);
                    if (!response.status) {
                        for (const fallback of fallbackModels) {
                            try {
                                response = await perplexity.chat(messages, fallback);
                                if (response.status)
                                    break;
                            }
                            catch (e) {
                                this.#logger.warn(`Perplexity fallback ${fallback} falló: ${e.message}`);
                            }
                        }
                    }
                    if (response.status) {
                        responseText = response.result.response;
                    }
                }
                catch (e) {
                    this.#logger.error(`Error en Perplexity AI: ${e.message}`);
                }
            }
            if (!responseText && this.#openai) {
                try {
                    const response = await this.#openai.createChatCompletion({
                        model: 'gpt-4o-mini',
                        messages: [{ role: 'user', content: text }],
                        max_tokens: 300,
                    });
                    responseText = response.data.choices[0].message.content;
                }
                catch (e) {
                    this.#logger.error(`Error en OpenAI: ${e.message}`);
                }
            }
            if (!responseText) {
                try {
                    let gpt = await fetch(`${global.apis}/ia/gptweb?text=${encodeURIComponent(text)}`);
                    let res = await gpt.json();
                    if (res.gpt) {
                        responseText = res.gpt;
                    }
                }
                catch (e) {
                    this.#logger.error(`Error en API externa (gptweb): ${e.message}`);
                }
            }
            if (responseText) {
                await conn.reply(m.chat, responseText, m);
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, chatGptMessages.noResponse, m);
                await m.react('✖️');
            }
        }
        catch (e) {
            this.#logger.error(`Error general en ChatGPTCommand: ${e.message}`);
            await conn.reply(m.chat, chatGptMessages.error(usedPrefix, command), m);
            await m.react('✖️');
        }
    }
}
export default ChatGPTCommand;
//# sourceMappingURL=ChatGPTCommand.js.map