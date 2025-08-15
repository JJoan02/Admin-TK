import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import { giftedAIMessages } from '../../lib/ia-content.js';
class GiftedAICommand extends Command {
    #logger;
    #config;
    constructor(logger, config) {
        super('gifted', 'Interactúa con la IA de Gifted.');
        this.#logger = logger;
        this.#config = config;
        this.commands = ['gifted'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, giftedAIMessages.noText, m);
            return;
        }
        try {
            const apiKey = this.#config.api.giftedApiKey;
            if (!apiKey) {
                await conn.reply(m.chat, 'La clave API para Gifted AI no está configurada.', m);
                return;
            }
            const api = await fetch(`https://api.giftedtech.my.id/api/ai/gpt?apikey=${apiKey}&q=${text}`);
            const json = await api.json();
            await conn.sendMessage(m.chat, {
                text: giftedAIMessages.resultHeader + json.result,
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        title: giftedAIMessages.title,
                        body: global.dev,
                        previewType: "PHOTO",
                        thumbnailUrl: 'https://files.catbox.moe/bjmjxd.jpeg',
                        sourceUrl: global.channels,
                    }
                }
            }, { quoted: m });
        }
        catch (error) {
            this.#logger.error(`Error in GiftedAICommand: ${error.message}`);
            await conn.reply(m.chat, giftedAIMessages.error, m);
        }
    }
}
export default GiftedAICommand;
//# sourceMappingURL=GiftedAICommand.js.map