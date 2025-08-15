import PhoneNumber from 'awesome-phonenumber';
import { getBuffer, parseMention } from '../utils/helpers.js';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import { toAudio } from './media.js';
class WhatsAppSender {
    sock;
    constructor(sock) {
        this.sock = sock;
    }
    async sendText(jid, text = '', quoted, options = {}) {
        try {
            return await this.sock.sendMessage(jid, { text, mentions: parseMention(text) }, { quoted, ...options });
        }
        catch (error) {
            logger.error({ err: error, jid, text }, 'Error al enviar mensaje de texto.');
            throw error;
        }
    }
    async sendFile(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
        let typeResult = await getBuffer(path, true);
        if (!typeResult || !typeResult.data) {
            logger.error(`No se pudo obtener el buffer para enviar archivo: ${path}`);
            return null;
        }
        let { data: file, filename: pathFile, mime, ext } = typeResult;
        let messageType = '';
        let mimetype = options.mimetype || mime;
        let convertResult;
        if (/webp/.test(mime) || (/image/.test(mime) && options.asSticker)) {
            messageType = 'sticker';
        }
        else if (/image/.test(mime) || (/webp/.test(mime) && options.asImage)) {
            messageType = 'image';
        }
        else if (/video/.test(mime)) {
            messageType = 'video';
        }
        else if (/audio/.test(mime)) {
            convertResult = await toAudio(file, ext);
            file = convertResult.data;
            pathFile = convertResult.filename;
            messageType = 'audio';
            mimetype = options.mimetype || 'audio/ogg; codecs=opus';
        }
        else {
            messageType = 'document';
        }
        if (options.asDocument)
            messageType = 'document';
        const cleanOptions = { ...options };
        delete cleanOptions.asSticker;
        delete cleanOptions.asLocation;
        delete cleanOptions.asVideo;
        delete cleanOptions.asDocument;
        delete cleanOptions.asImage;
        let message = {
            ...cleanOptions,
            caption,
            ptt,
            [messageType]: { url: pathFile || file },
            mimetype,
            fileName: filename || pathFile?.split('/').pop() || `file.${ext}`,
        };
        try {
            const msg = await this.sock.sendMessage(jid, message, { quoted, ...cleanOptions });
            if (typeResult.deleteFile)
                await typeResult.deleteFile();
            return msg;
        }
        catch (e) {
            logger.error({ err: e, jid, filename, caption }, 'Error al enviar archivo.');
            try {
                const msg = await this.sock.sendMessage(jid, { ...message, [messageType]: file }, { quoted, ...cleanOptions });
                if (typeResult.deleteFile)
                    await typeResult.deleteFile();
                return msg;
            }
            catch (e2) {
                logger.error({ err: e2, jid, filename, caption }, 'Error al enviar archivo (segundo intento).');
                if (typeResult.deleteFile)
                    await typeResult.deleteFile();
                throw e2;
            }
        }
    }
    async sendContact(jid, data, quoted, options = {}) {
        if (!Array.isArray(data[0]) && typeof data[0] === 'string')
            data = [data];
        let contacts = [];
        for (let [number, name] of data) {
            number = number.replace(/[^0-9]/g, '');
            let njid = number + '@s.whatsapp.net';
            let biz = await this.sock.getBusinessProfile(njid).catch(_ => null) || {};
            let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${new PhoneNumber('+' + number).getNumber('international')}${biz.description ? `
X-WA-BIZ-NAME:${(this.sock.chats[njid]?.vname || this.sock.getName(njid) || name).replace(/\n/, '\\n')}
X-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}
`.trim() : ''}
END:VCARD`.trim();
            contacts.push({ vcard, displayName: name });
        }
        try {
            return await this.sock.sendMessage(jid, {
                ...options,
                contacts: {
                    ...options,
                    displayName: contacts.length >= 2 ? `${contacts.length} contactos` : contacts[0]?.displayName || null,
                    contacts,
                }
            }, { quoted, ...options });
        }
        catch (error) {
            logger.error({ err: error, jid, data }, 'Error al enviar contacto.');
            throw error;
        }
    }
    async sendButton(jid, text = '', footer = '', buffer, buttons, quoted, options = {}) {
        let typeResult;
        if (buffer) {
            try {
                typeResult = await getBuffer(buffer);
                buffer = typeResult.data;
            }
            catch (e) {
                logger.warn({ err: e }, 'No se pudo obtener el buffer para el mensaje con botón.');
                buffer = null;
            }
        }
        if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string')
            buttons = [buttons];
        const cleanOptions = { ...options };
        delete cleanOptions.asLocation;
        let message = {
            ...cleanOptions,
            [buffer ? 'caption' : 'text']: text || '',
            footer,
            buttons: buttons.map(btn => ({
                buttonId: btn[1] || btn[0] || '',
                buttonText: {
                    displayText: btn[0] || btn[1] || ''
                }
            })),
            ...(buffer ? {
                [typeResult?.mime?.includes('video') ? 'video' :
                    typeResult?.mime?.includes('image') ? 'image' : 'document']: buffer
            } : {})
        };
        try {
            return await this.sock.sendMessage(jid, message, { quoted, upload: this.sock.waUploadToServer, ...cleanOptions });
        }
        catch (error) {
            logger.error({ err: error, jid, text }, 'Error al enviar mensaje con botón.');
            throw error;
        }
    }
    async sendHydrated(jid, text = '', footer = '', buffer, url, urlText, call, callText, buttons, quoted, options = {}) {
        let typeResult;
        if (buffer) {
            try {
                typeResult = await getBuffer(buffer);
                buffer = typeResult.data;
            }
            catch (e) {
                logger.warn({ err: e }, 'No se pudo obtener el buffer para el mensaje hidratado.');
                buffer = null;
            }
        }
        const cleanOptions = { ...options };
        delete cleanOptions.asLocation;
        let templateButtons = [];
        if (url || urlText) {
            if (!Array.isArray(url))
                url = [url];
            if (!Array.isArray(urlText))
                urlText = [urlText];
            templateButtons.push(...url.map((v, i) => ({
                index: templateButtons.length + 1,
                urlButton: {
                    displayText: urlText[i] || v || '',
                    url: v || urlText[i] || ''
                }
            })));
        }
        if (call || callText) {
            if (!Array.isArray(call))
                call = [call];
            if (!Array.isArray(callText))
                callText = [callText];
            templateButtons.push(...call.map((v, i) => ({
                index: templateButtons.length + 1,
                callButton: {
                    displayText: callText[i] || v || '',
                    phoneNumber: v || callText[i] || ''
                }
            })));
        }
        if (buttons?.length) {
            if (!Array.isArray(buttons[0]))
                buttons = [buttons];
            templateButtons.push(...buttons.map(([btnText, btnId]) => ({
                index: templateButtons.length + 1,
                quickReplyButton: {
                    displayText: btnText || btnId || '',
                    id: btnId || btnText || ''
                }
            })));
        }
        let message = {
            ...cleanOptions,
            [buffer ? 'caption' : 'text']: text || '',
            footer,
            templateButtons,
            ...(buffer ? {
                [typeResult?.mime?.includes('video') ? 'video' :
                    typeResult?.mime?.includes('image') ? 'image' : 'document']: buffer
            } : {})
        };
        try {
            return await this.sock.sendMessage(jid, message, { quoted, upload: this.sock.waUploadToServer, ...cleanOptions });
        }
        catch (error) {
            logger.error({ err: error, jid, text }, 'Error al enviar mensaje hidratado.');
            throw error;
        }
    }
}
export default WhatsAppSender;
//# sourceMappingURL=WhatsAppSender.js.map