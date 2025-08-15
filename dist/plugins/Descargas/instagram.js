"use strict";
const { igdl } = require("ruhend-scraper");
const processedMessages = new Set();
async function instagramCommand(sock, chatId, message) {
    try {
        if (processedMessages.has(message.key.id)) {
            return;
        }
        processedMessages.add(message.key.id);
        setTimeout(() => {
            processedMessages.delete(message.key.id);
        }, 5 * 60 * 1000);
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        if (!text) {
            return await sock.sendMessage(chatId, {
                text: "Please provide an Instagram link for the video."
            });
        }
        const instagramPatterns = [
            /https?:\/\/(?:www\.)?instagram\.com\//,
            /https?:\/\/(?:www\.)?instagr\.am\//,
            /https?:\/\/(?:www\.)?instagram\.com\/p\//,
            /https?:\/\/(?:www\.)?instagram\.com\/reel\//,
            /https?:\/\/(?:www\.)?instagram\.com\/tv\//
        ];
        const isValidUrl = instagramPatterns.some(pattern => pattern.test(text));
        if (!isValidUrl) {
            return await sock.sendMessage(chatId, {
                text: "That is not a valid Instagram link. Please provide a valid Instagram post, reel, or video link."
            });
        }
        await sock.sendMessage(chatId, {
            react: { text: '🔄', key: message.key }
        });
        const downloadData = await igdl(text);
        if (!downloadData || !downloadData.data || downloadData.data.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "No media found at the provided link."
            });
        }
        const mediaData = downloadData.data;
        for (let i = 0; i < Math.min(20, mediaData.length); i++) {
            const media = mediaData[i];
            const mediaUrl = media.url;
            const isVideo = /\.(mp4|mov|avi|mkv|webm)$/i.test(mediaUrl) ||
                media.type === 'video' ||
                text.includes('/reel/') ||
                text.includes('/tv/');
            if (isVideo) {
                await sock.sendMessage(chatId, {
                    video: { url: mediaUrl },
                    mimetype: "video/mp4",
                    caption: "𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗗 𝗕𝗬 𝗞𝗡𝗜𝗚𝗛𝗧-𝗕𝗢𝗧"
                }, { quoted: message });
            }
            else {
                await sock.sendMessage(chatId, {
                    image: { url: mediaUrl },
                    caption: "𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗗 𝗕𝗬 𝗞𝗡𝗜𝗚𝗛𝗧-𝗕𝗢𝗧"
                }, { quoted: message });
            }
        }
    }
    catch (error) {
        console.error('Error in Instagram command:', error);
        await sock.sendMessage(chatId, {
            text: "An error occurred while processing the request."
        });
    }
}
module.exports = instagramCommand;
//# sourceMappingURL=instagram.js.map