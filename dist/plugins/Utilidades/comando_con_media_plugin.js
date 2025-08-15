import { proto, generateWAMessage, areJidsSameUser } from '@whiskeysockets/baileys';
import fs from 'fs';
import { CMD_WITH_MEDIA_ERROR_LOADING_GLOBAL_CONTENT, CMD_WITH_MEDIA_ERROR_LOADING_LOCAL_CONTENT, CMD_WITH_MEDIA_DETECTED_KEYWORDS, CMD_WITH_MEDIA_ERROR_PROCESSING_CONTENT, CMD_WITH_MEDIA_EXTERNAL_AD_TITLE, CMD_WITH_MEDIA_EXTERNAL_AD_BODY, CMD_WITH_MEDIA_EXTERNAL_AD_THUMBNAIL_URL, CMD_WITH_MEDIA_EXTERNAL_AD_SOURCE_URL } from '../../content/utilidades/comando_con_media-responses';
import { GLOBAL_CONTENT_FILE, LOCAL_CONTENT_FILE } from '../../../config/paths';
class ComandoConMediaPlugin {
    static loadGlobalContent() {
        try {
            if (fs.existsSync(GLOBAL_CONTENT_FILE)) {
                const data = fs.readFileSync(GLOBAL_CONTENT_FILE, 'utf8');
                return JSON.parse(data);
            }
            return {};
        }
        catch (e) {
            console.error(CMD_WITH_MEDIA_ERROR_LOADING_GLOBAL_CONTENT(e.message));
            return {};
        }
    }
    static loadLocalContent() {
        try {
            if (fs.existsSync(LOCAL_CONTENT_FILE)) {
                const data = fs.readFileSync(LOCAL_CONTENT_FILE, 'utf8');
                return JSON.parse(data);
            }
            return {};
        }
        catch (e) {
            console.error(CMD_WITH_MEDIA_ERROR_LOADING_LOCAL_CONTENT(e.message));
            return {};
        }
    }
    async all(m, chatUpdate) {
        if (m.isBaileys)
            return;
        global.db.data = global.db.data || {};
        global.db.data.sticker = global.db.data.sticker || {};
        const localContent = ComandoConMediaPlugin.loadLocalContent();
        const chat = localContent[m.chat] || { savedContent: {} };
        const globalContent = ComandoConMediaPlugin.loadGlobalContent();
        if (m.text && !m.isCommand && m.mtype !== 'protocolMessage' && !m.text.startsWith('.')) {
            const textLower = m.text.toLowerCase().trim();
            let content = null;
            let matchedKeywords = '';
            for (const [key, value] of Object.entries(chat.savedContent)) {
                if (value.keywords && Array.isArray(value.keywords)) {
                    if (value.keywords.some(k => textLower.includes(k))) {
                        content = value;
                        matchedKeywords = value.keywords.filter(k => textLower.includes(k)).join(', ');
                        break;
                    }
                }
                else if (textLower === key) {
                    content = value;
                    matchedKeywords = key;
                    break;
                }
            }
            if (!content) {
                for (const [key, value] of Object.entries(globalContent)) {
                    if (value.keywords && Array.isArray(value.keywords)) {
                        if (value.keywords.some(k => textLower.includes(k))) {
                            content = value;
                            matchedKeywords = value.keywords.filter(k => textLower.includes(k)).join(', ');
                            break;
                        }
                    }
                    else if (textLower === key) {
                        content = value;
                        matchedKeywords = key;
                        break;
                    }
                }
            }
            if (!content || typeof content !== 'object' || !content.type)
                return;
            console.log(CMD_WITH_MEDIA_DETECTED_KEYWORDS(matchedKeywords));
            try {
                const options = { quoted: m };
                switch (content.type) {
                    case 'sticker':
                        if (content.data) {
                            const stickerBuffer = Buffer.from(content.data, 'base64');
                            await this.sendFile(m.chat, stickerBuffer, 'sticker.webp', '', m, content.isAnimated || false, {
                                contextInfo: {
                                    forwardingScore: 200,
                                    isForwarded: false,
                                    externalAdReply: {
                                        showAdAttribution: false,
                                        title: CMD_WITH_MEDIA_EXTERNAL_AD_TITLE,
                                        body: CMD_WITH_MEDIA_EXTERNAL_AD_BODY,
                                        mediaType: 2,
                                        sourceUrl: CMD_WITH_MEDIA_EXTERNAL_AD_SOURCE_URL,
                                        thumbnail: CMD_WITH_MEDIA_EXTERNAL_AD_THUMBNAIL_URL
                                    }
                                }
                            });
                        }
                        break;
                    case 'image':
                    case 'video':
                    case 'gif':
                    case 'audio':
                    case 'document':
                        if (content.data) {
                            const buffer = Buffer.from(content.data, 'base64');
                            const message = {
                                [content.type === 'gif' ? 'video' : content.type]: buffer,
                                caption: content.caption || '',
                                ...(content.type === 'gif' ? { gifPlayback: true } : {}),
                                ...(content.type === 'document' ? { mimetype: content.mimetype, fileName: content.fileName } : {}),
                                ...(content.type === 'audio' ? { ptt: false } : {})
                            };
                            await this.sendMessage(m.chat, message, options);
                        }
                        break;
                    case 'location':
                        await this.sendMessage(m.chat, { location: { degreesLatitude: content.latitude, degreesLongitude: content.longitude, name: content.caption || '' } }, options);
                        break;
                    case 'contact':
                        await this.sendMessage(m.chat, { contacts: { contacts: [{ vcard: content.vcard, displayName: content.caption || '' }] } }, options);
                        break;
                    case 'buttons':
                        if (content.text || (content.buttons && content.buttons.length > 0)) {
                            await this.sendMessage(m.chat, {
                                text: content.text || content.caption || '',
                                buttons: content.buttons?.map(b => ({ buttonId: b.buttonId, buttonText: { displayText: b.buttonText }, type: 1 })) || [],
                                headerType: 1
                            }, options);
                        }
                        break;
                    case 'link':
                        await m.reply(`${content.caption ? content.caption + '\n\n' : ''}${content.url}`, options);
                        break;
                    case 'text':
                        if (content.value) {
                            await m.reply(content.value);
                        }
                        break;
                    default:
                        return;
                }
            }
            catch (e) {
                console.error(CMD_WITH_MEDIA_ERROR_PROCESSING_CONTENT(e.message));
            }
            return;
        }
        if (m.message && m.msg?.fileSha256) {
            const hash = Buffer.from(m.msg.fileSha256).toString('base64');
            if (global.db.data.sticker?.[hash]) {
                const commandData = global.db.data.sticker[hash];
                const { text, mentionedJid, chat: commandChat } = commandData || {};
                if (commandChat === null || commandChat === m.chat) {
                    const messages = await generateWAMessage(m.chat, { text, mentions: mentionedJid }, {
                        userJid: this.user.id,
                        quoted: m.quoted && m.quoted.fakeObj,
                    });
                    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
                    messages.key.id = m.key.id;
                    messages.pushName = m.pushName;
                    if (m.isGroup)
                        messages.participant = m.sender;
                    const msg = {
                        ...chatUpdate,
                        messages: [proto.WebMessageInfo.fromObject(messages)],
                        type: 'append',
                    };
                    this.ev.emit('messages.upsert', msg);
                }
            }
        }
    }
}
export default new ComandoConMediaPlugin();
//# sourceMappingURL=comando_con_media_plugin.js.map