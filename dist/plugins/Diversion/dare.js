"use strict";
const fetch = require('node-fetch');
async function dareCommand(sock, chatId, message) {
    try {
        const shizokeys = 'knightbot';
        const res = await fetch(`https://api.shizo.top/api/quote/dare?apikey=${shizokeys}`);
        if (!res.ok) {
            throw await res.text();
        }
        const json = await res.json();
        const dareMessage = json.result;
        await sock.sendMessage(chatId, { text: dareMessage }, { quoted: message });
    }
    catch (error) {
        console.error('Error in dare command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get dare. Please try again later!' }, { quoted: message });
    }
}
module.exports = { dareCommand };
//# sourceMappingURL=dare.js.map