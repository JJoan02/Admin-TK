"use strict";
const isAdmin = require('../lib/isAdmin');
async function tagAllCommand(sock, chatId, senderId) {
    try {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
        if (!isSenderAdmin && !isBotAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Only admins can use the .tagall command.'
            });
            return;
        }
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;
        if (!participants || participants.length === 0) {
            await sock.sendMessage(chatId, { text: 'No participants found in the group.' });
            return;
        }
        let message = '🔊 *Group Members:*\n\n';
        participants.forEach(participant => {
            message += `@${participant.id.split('@')[0]}\n`;
        });
        await sock.sendMessage(chatId, {
            text: message,
            mentions: participants.map(p => p.id)
        });
    }
    catch (error) {
        console.error('Error in tagall command:', error);
        await sock.sendMessage(chatId, { text: 'Failed to tag all members.' });
    }
}
module.exports = tagAllCommand;
//# sourceMappingURL=tagall.js.map