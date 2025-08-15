import { Command } from '../../core/Command.js';
import Groq from 'groq-sdk';
import { llamaAIMessages } from '../../lib/ia-content.js';
class LlamaAICommand extends Command {
    #logger;
    #config;
    constructor(logger, config) {
        super('llama', 'Interactúa con la IA de Llama.');
        this.#logger = logger;
        this.#config = config;
        this.commands = ['llama'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, llamaAIMessages.noText, m);
            return;
        }
        try {
            const apiKey = this.#config.api.groqApiKey;
            if (!apiKey) {
                await conn.reply(m.chat, 'La clave API para Groq (Llama AI) no está configurada.', m);
                return;
            }
            const groq = new Groq({ apiKey: apiKey });
            conn.aiSessions = conn.aiSessions ? conn.aiSessions : {};
            if (!(m.sender in conn.aiSessions)) {
                conn.aiSessions[m.sender] = [{
                        role: 'system',
                        content: llamaAIMessages.systemContent(conn.getName(m.sender))
                    }];
            }
            if (conn.aiSessions[m.sender].length > 10) {
                conn.aiSessions[m.sender] = conn.aiSessions[m.sender].slice(-1);
            }
            conn.aiSessions[m.sender].push({ role: 'user', content: text });
            let sessionMessages = [...conn.aiSessions[m.sender], { role: 'user', content: text }];
            let payloads = { messages: sessionMessages, model: 'llama-3.1-70b-versatile' };
            const json = await groq.chat.completions.create(payloads);
            const responseMessage = json.choices[0].message.content;
            conn.aiSessions[m.sender].push({ role: "system", content: responseMessage });
            await conn.sendMessage(m.chat, {
                text: responseMessage,
                contextInfo: {
                    externalAdReply: {
                        title: llamaAIMessages.title,
                        body: global.dev,
                        thumbnailUrl: 'https://files.catbox.moe/j791b7.jpeg',
                        sourceUrl: global.channels,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        }
        catch (error) {
            this.#logger.error(`Error in LlamaAICommand: ${error.message}`);
            await conn.reply(m.chat, llamaAIMessages.error, m);
        }
    }
}
export default LlamaAICommand;
//# sourceMappingURL=LlamaAICommand.js.map