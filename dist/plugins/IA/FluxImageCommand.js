import { Command } from '../../core/Command.js';
import axios from "axios";
import { fluxImageMessages } from '../../lib/ia-content.js';
class FluxImageCommand extends Command {
    #logger;
    constructor(logger) {
        super('flux', 'Genera imágenes usando Flux AI.');
        this.#logger = logger;
        this.commands = ['flux'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, fluxImageMessages.noText(usedPrefix, command), m, global.fake);
            return;
        }
        try {
            await m.react('🕓');
            await conn.reply(m.chat, fluxImageMessages.processing, m);
            const result = await this.#fluximgCreate(text);
            if (result && result.imageLink) {
                await m.react('✅');
                await conn.sendMessage(m.chat, {
                    image: { url: result.imageLink },
                    caption: fluxImageMessages.success(text),
                }, { quoted: m });
            }
            else {
                throw new Error("No se pudo crear la imagen. Intentar otra vez.");
            }
        }
        catch (error) {
            this.#logger.error(`Error in FluxImageCommand: ${error.message}`);
            await conn.reply(m.chat, fluxImageMessages.error, m);
            await m.react('✖️');
        }
    }
    async #fluximgCreate(query) {
        const config = {
            headers: {
                accept: "*/*",
                authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
                "user-agent": "Postify/1.0.0",
            },
        };
        try {
            const response = await axios.get(`https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(query)}&aspect_ratio=2:3`, config);
            return {
                imageLink: response.data.image_link,
            };
        }
        catch (error) {
            throw error;
        }
    }
}
export default FluxImageCommand;
//# sourceMappingURL=FluxImageCommand.js.map