"use strict";
const fetch = require('node-fetch');
async function simpCommand(sock, chatId, quotedMsg, mentionedJid, sender) {
    try {
        let who = quotedMsg
            ? quotedMsg.sender
            : mentionedJid && mentionedJid[0]
                ? mentionedJid[0]
                : sender;
        let avatarUrl;
        try {
            avatarUrl = await sock.profilePictureUrl(who, 'image');
        }
        catch (error) {
            console.error('Error fetching profile picture:', error);
            avatarUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
        }
        const apiUrl = `https://some-random-api.com/canvas/misc/simpcard?avatar=${encodeURIComponent(avatarUrl)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        const imageBuffer = await response.buffer();
        await sock.sendMessage(chatId, {
            image: imageBuffer,
            caption: '*your religion is simping*',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363161513685998@newsletter',
                    newsletterName: 'KnightBot MD',
                    serverMessageId: -1
                }
            }
        });
    }
    catch (error) {
        console.error('Error in simp command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Sorry, I couldn\'t generate the simp card. Please try again later!',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363161513685998@newsletter',
                    newsletterName: 'KnightBot MD',
                    serverMessageId: -1
                }
            }
        });
    }
}
module.exports = { simpCommand };
//# sourceMappingURL=simp.js.map