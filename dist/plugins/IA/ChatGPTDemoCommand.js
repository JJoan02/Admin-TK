import { Command } from '../../core/Command.js';
import axios from "axios";
import { chatGPTDemoMessages } from '../../lib/ia-content.js';
class ChatGPTDemoCommand extends Command {
    #logger;
    constructor(logger) {
        super('demo', 'Interactúa con una IA de demostración de ChatGPT.');
        this.#logger = logger;
        this.commands = ['demo'];
    }
    async execute(context) {
        const { m, conn, text } = context;
        if (!text) {
            await conn.reply(m.chat, chatGPTDemoMessages.noText, m);
            return;
        }
        try {
            await conn.reply(m.chat, chatGPTDemoMessages.processing, m);
            const data = await this.#chatGpt(text);
            await conn.sendMessage(m.chat, {
                text: chatGPTDemoMessages.resultHeader + data,
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: false,
                    externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        title: `[ 𝗖𝗛𝗔𝗧𝗚𝗣𝗧 - 𝗗𝗘𝗠𝗢 ]`,
                        body: global.dev,
                        previewType: "PHOTO",
                        thumbnailUrl: 'https://tinyurl.com/2awg2bch',
                        sourceUrl: global.channels,
                    }
                }
            }, { quoted: m });
        }
        catch (err) {
            this.#logger.error(`Error in ChatGPTDemoCommand: ${err.message}`);
            await conn.reply(m.chat, chatGPTDemoMessages.error, m);
        }
    }
    async #chatGpt(query) {
        try {
            const { id_ } = (await axios.post("https://chat.chatgptdemo.net/new_chat", { user_id: "crqryjoto2h3nlzsg" }, { headers: {
                    "Content-Type": "application/json",
                } })).data;
            const json = { "question": query, "chat_id": id_, "timestamp": new Date().getTime() };
            const { data } = await axios.post("https://chat.chatgptdemo.net/chat_api_stream", json, { headers: {
                    "Content-Type": "application/json",
                } });
            const cek = data.split("data: ");
            let res = [];
            for (let i = 1; i < cek.length; i++) {
                if (cek[i].trim().length > 0) {
                    res.push(JSON.parse(cek[i].trim()));
                }
            }
            return res.map((a) => a.choices[0].delta.content).join("");
        }
        catch (error) {
            this.#logger.error("Error parsing JSON or fetching from ChatGPT demo API:", error);
            throw new Error("Failed to get response from ChatGPT demo API.");
        }
    }
}
export default ChatGPTDemoCommand;
//# sourceMappingURL=ChatGPTDemoCommand.js.map