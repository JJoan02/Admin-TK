"use strict";
const axios = require('axios');
const { channelInfo } = require('../lib/messageConfig');
async function wastedCommand(sock, chatId, message) {
    let userToWaste;
    if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        userToWaste = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
    }
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        userToWaste = message.message.extendedTextMessage.contextInfo.participant;
    }
    if (!userToWaste) {
        await sock.sendMessage(chatId, {
            text: 'Please mention someone or reply to their message to waste them!',
            ...channelInfo
        });
        return;
    }
    try {
        let profilePic;
        try {
            profilePic = await sock.profilePictureUrl(userToWaste, 'image');
        }
        catch {
            profilePic = 'https://i.imgur.com/2wzGhpF.jpeg';
        }
        const wastedResponse = await axios.get(`https://some-random-api.com/canvas/overlay/wasted?avatar=${encodeURIComponent(profilePic)}`, { responseType: 'arraybuffer' });
        await sock.sendMessage(chatId, {
            image: Buffer.from(wastedResponse.data),
            caption: `⚰️ *Wasted* : ${userToWaste.split('@')[0]} 💀\n\nRest in pieces!`,
            mentions: [userToWaste],
            ...channelInfo
        });
    }
    catch (error) {
        console.error('Error in wasted command:', error);
        await sock.sendMessage(chatId, {
            text: 'Failed to create wasted image! Try again later.',
            ...channelInfo
        });
    }
}
module.exports = wastedCommand;
//# sourceMappingURL=wasted.js.map