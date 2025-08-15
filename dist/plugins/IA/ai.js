"use strict";
const axios = require('axios');
const fetch = require('node-fetch');
async function aiCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        if (!text) {
            return await sock.sendMessage(chatId, {
                text: "Please provide a question after .gpt or .gemini\n\nExample: .gpt write a basic html code"
            });
        }
        const parts = text.split(' ');
        const command = parts[0].toLowerCase();
        const query = parts.slice(1).join(' ').trim();
        if (!query) {
            return await sock.sendMessage(chatId, {
                text: "Please provide a question after .gpt or .gemini"
            });
        }
        try {
            await sock.sendMessage(chatId, {
                react: { text: '🤖', key: message.key }
            });
            if (command === '.gpt') {
                const response = await axios.get(`https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(query)}`);
                if (response.data && response.data.success && response.data.result) {
                    const answer = response.data.result.prompt;
                    await sock.sendMessage(chatId, {
                        text: answer
                    }, {
                        quoted: message
                    });
                }
                else {
                    throw new Error('Invalid response from API');
                }
            }
            else if (command === '.gemini') {
                const apis = [
                    `https://vapis.my.id/api/gemini?q=${encodeURIComponent(query)}`,
                    `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(query)}`,
                    `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(query)}`,
                    `https://api.dreaded.site/api/gemini2?text=${encodeURIComponent(query)}`,
                    `https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(query)}`,
                    `https://api.giftedtech.my.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(query)}`
                ];
                for (const api of apis) {
                    try {
                        const response = await fetch(api);
                        const data = await response.json();
                        if (data.message || data.data || data.answer || data.result) {
                            const answer = data.message || data.data || data.answer || data.result;
                            await sock.sendMessage(chatId, {
                                text: answer
                            }, {
                                quoted: message
                            });
                            return;
                        }
                    }
                    catch (e) {
                        continue;
                    }
                }
                throw new Error('All Gemini APIs failed');
            }
        }
        catch (error) {
            console.error('API Error:', error);
            await sock.sendMessage(chatId, {
                text: "❌ Failed to get response. Please try again later.",
                contextInfo: {
                    mentionedJid: [message.key.participant || message.key.remoteJid],
                    quotedMessage: message.message
                }
            });
        }
    }
    catch (error) {
        console.error('AI Command Error:', error);
        await sock.sendMessage(chatId, {
            text: "❌ An error occurred. Please try again later.",
            contextInfo: {
                mentionedJid: [message.key.participant || message.key.remoteJid],
                quotedMessage: message.message
            }
        });
    }
}
module.exports = aiCommand;
//# sourceMappingURL=ai.js.map