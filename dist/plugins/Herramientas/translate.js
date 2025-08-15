"use strict";
const fetch = require('node-fetch');
async function handleTranslateCommand(sock, chatId, message, match) {
    try {
        await sock.presenceSubscribe(chatId);
        await sock.sendPresenceUpdate('composing', chatId);
        let textToTranslate = '';
        let lang = '';
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (quotedMessage) {
            textToTranslate = quotedMessage.conversation ||
                quotedMessage.extendedTextMessage?.text ||
                quotedMessage.imageMessage?.caption ||
                quotedMessage.videoMessage?.caption ||
                '';
            lang = match.trim();
        }
        else {
            const args = match.trim().split(' ');
            if (args.length < 2) {
                return sock.sendMessage(chatId, {
                    text: `*TRANSLATOR*\n\nUsage:\n1. Reply to a message with: .translate <lang> or .trt <lang>\n2. Or type: .translate <text> <lang> or .trt <text> <lang>\n\nExample:\n.translate hello fr\n.trt hello fr\n\nLanguage codes:\nfr - French\nes - Spanish\nde - German\nit - Italian\npt - Portuguese\nru - Russian\nja - Japanese\nko - Korean\nzh - Chinese\nar - Arabic\nhi - Hindi`,
                    quoted: message
                });
            }
            lang = args.pop();
            textToTranslate = args.join(' ');
        }
        if (!textToTranslate) {
            return sock.sendMessage(chatId, {
                text: '❌ No text found to translate. Please provide text or reply to a message.',
                quoted: message
            });
        }
        let translatedText = null;
        let error = null;
        try {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
            if (response.ok) {
                const data = await response.json();
                if (data && data[0] && data[0][0] && data[0][0][0]) {
                    translatedText = data[0][0][0];
                }
            }
        }
        catch (e) {
            error = e;
        }
        if (!translatedText) {
            try {
                const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${lang}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.responseData && data.responseData.translatedText) {
                        translatedText = data.responseData.translatedText;
                    }
                }
            }
            catch (e) {
                error = e;
            }
        }
        if (!translatedText) {
            try {
                const response = await fetch(`https://api.dreaded.site/api/translate?text=${encodeURIComponent(textToTranslate)}&lang=${lang}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.translated) {
                        translatedText = data.translated;
                    }
                }
            }
            catch (e) {
                error = e;
            }
        }
        if (!translatedText) {
            throw new Error('All translation APIs failed');
        }
        await sock.sendMessage(chatId, {
            text: `${translatedText}`,
        }, {
            quoted: message
        });
    }
    catch (error) {
        console.error('❌ Error in translate command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to translate text. Please try again later.\n\nUsage:\n1. Reply to a message with: .translate <lang> or .trt <lang>\n2. Or type: .translate <text> <lang> or .trt <text> <lang>',
            quoted: message
        });
    }
}
module.exports = {
    handleTranslateCommand
};
//# sourceMappingURL=translate.js.map