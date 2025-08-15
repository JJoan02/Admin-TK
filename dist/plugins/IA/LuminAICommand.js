import { Command } from '../../core/Command.js';
import axios from 'axios';
import fetch from 'node-fetch';
import { luminAIMessages } from '../../lib/ia-content.js';
class LuminAICommand extends Command {
    #logger;
    constructor(logger) {
        super('luminai', 'Interactúa con la IA Lumin.ai.');
        this.#logger = logger;
        this.commands = ['luminai'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
        const username = `${conn.getName(m.sender)}`;
        const basePrompt = luminAIMessages.basePrompt(username);
        if (isQuotedImage) {
            const q = m.quoted;
            const img = await q.download?.();
            if (!img) {
                this.#logger.error('Error: No image buffer available');
                await conn.reply(m.chat, luminAIMessages.noImageBuffer, m, global.fake);
                return;
            }
            const content = '✿ ¿Qué se observa en la imagen?';
            try {
                const imageAnalysis = await this.#fetchImageBuffer(content, img);
                const query = '❀ Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
                const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
                const description = await this.#luminsesi(query, username, prompt);
                await conn.reply(m.chat, description, m, global.fake);
            }
            catch (e) {
                this.#logger.error(`Error analyzing image with LuminAI: ${e.message}`);
                await m.react(global.error);
                await conn.reply(m.chat, luminAIMessages.imageAnalysisError, m, global.fake);
            }
        }
        else {
            if (!text) {
                await conn.reply(m.chat, luminAIMessages.noText, m);
                return;
            }
            await m.react(global.rwait);
            try {
                const query = text;
                const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
                const response = await this.#luminsesi(query, username, prompt);
                await conn.sendMessage(m.chat, {
                    text: luminAIMessages.resultHeader + response,
                    contextInfo: {
                        forwardingScore: 9999999,
                        isForwarded: false,
                        externalAdReply: {
                            showAdAttribution: true,
                            containsAutoReply: true,
                            title: luminAIMessages.title,
                            body: global.dev,
                            previewType: "PHOTO",
                            thumbnailUrl: 'https://files.catbox.moe/xblbmd.jpeg',
                            sourceUrl: global.channels,
                        }
                    }
                }, { quoted: m });
                await m.react('🤖');
            }
            catch (e) {
                this.#logger.error(`Error interacting with LuminAI: ${e.message}`);
                await m.react(global.error);
                await conn.reply(m.chat, luminAIMessages.responseError, m, global.fake);
            }
        }
    }
    async #fetchImageBuffer(content, imageBuffer) {
        try {
            const response = await axios.post('https://Luminai.my.id', {
                content: content,
                imageBuffer: imageBuffer
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            this.#logger.error('Error fetching image buffer:', error);
            throw error;
        }
    }
    async #luminsesi(q, username, logic) {
        try {
            const response = await axios.post("https://Luminai.my.id", {
                content: q,
                user: username,
                prompt: logic,
                webSearchMode: false
            });
            return response.data.result;
        }
        catch (error) {
            this.#logger.error('Error getting LuminAI response:', error);
            throw error;
        }
    }
}
export default LuminAICommand;
//# sourceMappingURL=LuminAICommand.js.map