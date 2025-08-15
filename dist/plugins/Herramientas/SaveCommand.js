import { Command } from '../../core/Command.js';
import { saveMessages } from '../../lib/herramientas-content.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
class SaveCommand extends Command {
    #logger;
    #dbService;
    constructor(logger, dbService) {
        super('save', 'Guarda contenido (texto, imagen, video, sticker, etc.) asociado a palabras clave.');
        this.#logger = logger;
        this.#dbService = dbService;
        this.commands = ['guardar', 'save', 'setcmd', 'addcmd'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command, isOwner } = context;
        if (!text && !m.quoted) {
            await conn.reply(m.chat, saveMessages.noContent(usedPrefix, command), m);
            return;
        }
        let content = {};
        let keywords = [];
        let requiredKeywords = [];
        let caption = '';
        const q = m.quoted;
        const splitText = text.split(/[-|]/).map(s => s.trim());
        const hasSeparator = /[-|]/.test(text);
        const isCommandFormat = new RegExp('^[' + (global.db.data.settings[conn.user.jid]?.prefix || '.').replace(/[|\{}()[\\\]^$+*.\-\^]/g, '\$&') + ']').test(text);
        if (q) {
            const isMedia = ['image', 'video', 'sticker', 'audio', 'application'].some(type => q.mimetype?.startsWith(type));
            caption = hasSeparator ? splitText[0] : q.caption || q.fileName || '';
            if (hasSeparator) {
                requiredKeywords = splitText[1].split(',').map(k => k.trim().toLowerCase());
            }
            else {
                keywords = text.split(',').map(k => k.trim().toLowerCase());
            }
            if (isMedia) {
                const buffer = await downloadContentFromMessage(q.message, q.mtype.startsWith('image') ? 'image' : q.mtype.startsWith('video') ? 'video' : q.mtype.startsWith('sticker') ? 'sticker' : q.mtype.startsWith('audio') ? 'audio' : 'document');
                let mediaBuffer = Buffer.from([]);
                for await (const chunk of buffer) {
                    mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
                }
                if (q.mimetype.startsWith('video') && mediaBuffer.length > 30 * 1024 * 1024) {
                    throw new Error(saveMessages.videoTooLarge);
                }
                content = {
                    type: (q.mtype === 'stickerMessage' || (q.mimetype === 'image/webp' && typeof q.isAnimated !== 'undefined')) ? 'sticker' :
                        q.mimetype.startsWith('image') ? 'image' :
                            q.mimetype === 'video/mp4' && q.gifPlayback ? 'gif' :
                                q.mimetype.startsWith('video') ? 'video' :
                                    q.mimetype.startsWith('audio') ? 'audio' :
                                        q.mimetype.startsWith('application') ? 'document' : 'sticker',
                    data: mediaBuffer.toString('base64'),
                    caption: caption,
                    isAnimated: q.mimetype === 'image/webp' ? q.isAnimated || false : false,
                    creator: m.sender,
                    mimetype: q.mimetype,
                    fileName: q.fileName || (q.mtype === 'documentMessage' ? (keywords ? keywords[0] : splitText[1]) : 'documento')
                };
                if ((content.type === 'sticker' || content.type === 'image') && q.fileSha256 && !hasSeparator && isCommandFormat) {
                    const hash = q.fileSha256.toString('base64');
                    const commandData = {
                        text: text,
                        mentionedJid: m.mentionedJid || [],
                        creator: m.sender,
                        at: +new Date(),
                        locked: false,
                        data: content.data,
                        isAnimated: content.isAnimated,
                        chat: isOwner ? null : m.chat
                    };
                    global.db.data.sticker[hash] = commandData;
                    await m.reply(saveMessages.stickerImageCommandSuccess(text, isOwner));
                    await m.react("✅");
                    return;
                }
                if (!hasSeparator) {
                    content.keywords = keywords;
                    if (isOwner) {
                        const globalContent = global.db.data.globalContent || {};
                        globalContent[keywords[0]] = content;
                        global.db.data.globalContent = globalContent;
                        await m.reply(saveMessages.globalSaveSuccess(keywords.join(', ')));
                    }
                    else {
                        const chatContent = global.db.data.localContent[m.chat] || { savedContent: {} };
                        chatContent.savedContent[keywords[0]] = content;
                        global.db.data.localContent[m.chat] = chatContent;
                        await m.reply(saveMessages.chatSaveSuccess(keywords.join(', ')));
                    }
                    await m.react("✅");
                    return;
                }
                else {
                    content.requiredKeywords = requiredKeywords;
                }
            }
            else if (q.mtype === 'locationMessage') {
                content = {
                    type: 'location',
                    latitude: q.latitude,
                    longitude: q.longitude,
                    caption: caption || q.name || '',
                    creator: m.sender
                };
                if (hasSeparator)
                    content.requiredKeywords = requiredKeywords;
                else
                    content.keywords = keywords;
            }
            else if (q.mtype === 'contactMessage') {
                if (!q.vcard)
                    throw saveMessages.invalidVCard;
                content = {
                    type: 'contact',
                    vcard: q.vcard,
                    caption: caption || q.displayName || '',
                    creator: m.sender
                };
                if (hasSeparator)
                    content.requiredKeywords = requiredKeywords;
                else
                    content.keywords = keywords;
            }
            else if (q.text) {
                const urlRegex = /^(https?:\/\/[^\s]+)/;
                const urlMatch = q.text.match(urlRegex);
                if (urlMatch && !hasSeparator) {
                    content = {
                        type: 'link',
                        url: urlMatch[0],
                        caption: caption || q.text.replace(urlMatch[0], '').trim(),
                        creator: m.sender,
                        keywords: keywords
                    };
                }
                else {
                    content = {
                        type: 'text',
                        value: hasSeparator ? splitText[0] : q.text,
                        mentionedJid: q.mentionedJid || [],
                        creator: m.sender
                    };
                    if (hasSeparator)
                        content.requiredKeywords = requiredKeywords;
                    else
                        content.keywords = keywords;
                }
            }
            else {
                throw new Error(saveMessages.unsupportedContentType);
            }
        }
        else {
            if (!hasSeparator) {
                if (isCommandFormat)
                    throw saveMessages.noContent(usedPrefix, command);
                throw new Error(saveMessages.invalidFormat(usedPrefix, command));
            }
            content = {
                type: 'text',
                value: splitText[0],
                requiredKeywords: splitText[1].split(',').map(k => k.trim().toLowerCase()),
                mentionedJid: [],
                creator: m.sender
            };
        }
        if (!content.type)
            throw new Error(saveMessages.unsupportedContentType);
        if (isOwner) {
            const globalContent = global.db.data.globalContent || {};
            const key = content.keywords ? content.keywords[0] : content.requiredKeywords[0];
            globalContent[key] = content;
            global.db.data.globalContent = globalContent;
            await conn.reply(m.chat, saveMessages.globalSaveSuccess(content.keywords ? content.keywords.join(', ') : content.requiredKeywords.join(', ')), m);
        }
        else {
            const chatContent = global.db.data.localContent[m.chat] || { savedContent: {} };
            const key = content.keywords ? content.keywords[0] : content.requiredKeywords[0];
            chatContent.savedContent[key] = content;
            global.db.data.localContent[m.chat] = chatContent;
            await conn.reply(m.chat, saveMessages.chatSaveSuccess(content.keywords ? content.keywords.join(', ') : content.requiredKeywords.join(', ')), m);
        }
        await m.react("✅");
    }
}
export default SaveCommand;
//# sourceMappingURL=SaveCommand.js.map