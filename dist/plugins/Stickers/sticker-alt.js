"use strict";
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { exec } = require('child_process');
const fs = require('fs');
async function stickerCommand(sock, chatId, message) {
    try {
        const quotedMsg = message.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quotedMsg) {
            await sock.sendMessage(chatId, { text: 'Please reply to an image or video!' });
            return;
        }
        const type = Object.keys(quotedMsg)[0];
        if (!['imageMessage', 'videoMessage'].includes(type)) {
            await sock.sendMessage(chatId, { text: 'Please reply to an image or video!' });
            return;
        }
        const stream = await downloadContentFromMessage(quotedMsg[type], type.split('Message')[0]);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        const tempInput = `./temp/temp_${Date.now()}.${type === 'imageMessage' ? 'jpg' : 'mp4'}`;
        const tempOutput = `./temp/sticker_${Date.now()}.webp`;
        if (!fs.existsSync('./temp')) {
            fs.mkdirSync('./temp', { recursive: true });
        }
        fs.writeFileSync(tempInput, buffer);
        await new Promise((resolve, reject) => {
            const cmd = type === 'imageMessage'
                ? `ffmpeg -i "${tempInput}" -vf "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease" "${tempOutput}"`
                : `ffmpeg -i "${tempInput}" -vf "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease" -c:v libwebp -preset default -loop 0 -vsync 0 -t 6 "${tempOutput}"`;
            exec(cmd, (error) => {
                if (error)
                    reject(error);
                else
                    resolve();
            });
        });
        await sock.sendMessage(chatId, {
            sticker: fs.readFileSync(tempOutput)
        });
        fs.unlinkSync(tempInput);
        fs.unlinkSync(tempOutput);
    }
    catch (error) {
        console.error('Error in sticker command:', error);
        await sock.sendMessage(chatId, { text: 'Failed to create sticker!' });
    }
}
module.exports = stickerCommand;
//# sourceMappingURL=sticker-alt.js.map