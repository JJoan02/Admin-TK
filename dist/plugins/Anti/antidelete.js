import { ICommand, IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys, downloadContentFromMessage } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import { ANTIDELETE_OWNER_ONLY, ANTIDELETE_SETUP_MESSAGE, ANTIDELETE_INVALID_COMMAND, ANTIDELETE_ENABLED_SUCCESS, ANTIDELETE_REPORT_HEADER, ANTIDELETE_REPORT_DELETED_BY, ANTIDELETE_REPORT_SENDER, ANTIDELETE_REPORT_NUMBER, ANTIDELETE_REPORT_TIME, ANTIDELETE_REPORT_GROUP, ANTIDELETE_REPORT_MESSAGE, ANTIDELETE_REPORT_MEDIA_CAPTION, ANTIDELETE_REPORT_MEDIA_ERROR } from '../../content/anti/antidelete-responses';
const messageStore = new Map();
const TEMP_MEDIA_DIR = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(TEMP_MEDIA_DIR)) {
    fs.mkdirSync(TEMP_MEDIA_DIR, { recursive: true });
}
const getFolderSizeInMB = (folderPath) => {
    try {
        const files = fs.readdirSync(folderPath);
        let totalSize = 0;
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            if (fs.statSync(filePath).isFile()) {
                totalSize += fs.statSync(filePath).size;
            }
        }
        return totalSize / (1024 * 1024);
    }
    catch (err) {
        console.error('Error getting folder size:', err);
        return 0;
    }
};
const cleanTempFolderIfLarge = () => {
    try {
        const sizeMB = getFolderSizeInMB(TEMP_MEDIA_DIR);
        if (sizeMB > 100) {
            const files = fs.readdirSync(TEMP_MEDIA_DIR);
            for (const file of files) {
                const filePath = path.join(TEMP_MEDIA_DIR, file);
                fs.unlinkSync(filePath);
            }
        }
    }
    catch (err) {
        console.error('Temp cleanup error:', err);
    }
};
setInterval(cleanTempFolderIfLarge, 60 * 1000);
class AntiDeletePlugin {
    name = "AntiDeletePlugin";
    commands = [
        {
            name: "antidelete",
            alias: [],
            desc: "Activa o desactiva la función anti-eliminación de mensajes.",
            category: "Anti",
            react: "🗑️",
            execute: async (Yaka, m, { conn, args, isOwner }) => {
                if (!isOwner) {
                    return conn.sendMessage(m.chat, { text: ANTIDELETE_OWNER_ONLY });
                }
                const match = args[0];
                let chat = global.db.data.chats[m.chat];
                if (!chat.antidelete) {
                    chat.antidelete = false;
                }
                if (!match) {
                    return conn.sendMessage(m.chat, { text: ANTIDELETE_SETUP_MESSAGE(chat.antidelete ? '✅ Enabled' : '❌ Disabled') });
                }
                if (match === 'on') {
                    chat.antidelete = true;
                }
                else if (match === 'off') {
                    chat.antidelete = false;
                }
                else {
                    return conn.sendMessage(m.chat, { text: ANTIDELETE_INVALID_COMMAND });
                }
                return conn.sendMessage(m.chat, { text: ANTIDELETE_ENABLED_SUCCESS(match === 'on' ? 'enabled' : 'disabled') });
            }
        }
    ];
    async all(m, { conn }) {
        const chat = global.db.data.chats[m.chat];
        if (!chat?.antidelete)
            return false;
        if (!m.key?.id)
            return false;
        const messageId = m.key.id;
        let content = '';
        let mediaType = '';
        let mediaPath = '';
        const sender = m.key.participant || m.key.remoteJid;
        if (m.message?.conversation) {
            content = m.message.conversation;
        }
        else if (m.message?.extendedTextMessage?.text) {
            content = m.message.extendedTextMessage.text;
        }
        else if (m.message?.imageMessage) {
            mediaType = 'image';
            content = m.message.imageMessage.caption || '';
            const buffer = await downloadContentFromMessage(m.message.imageMessage, 'image');
            mediaPath = path.join(TEMP_MEDIA_DIR, `${messageId}.jpg`);
            await writeFile(mediaPath, buffer);
        }
        else if (m.message?.stickerMessage) {
            mediaType = 'sticker';
            const buffer = await downloadContentFromMessage(m.message.stickerMessage, 'sticker');
            mediaPath = path.join(TEMP_MEDIA_DIR, `${messageId}.webp`);
            await writeFile(mediaPath, buffer);
        }
        else if (m.message?.videoMessage) {
            mediaType = 'video';
            content = m.message.videoMessage.caption || '';
            const buffer = await downloadContentFromMessage(m.message.videoMessage, 'video');
            mediaPath = path.join(TEMP_MEDIA_DIR, `${messageId}.mp4`);
            await writeFile(mediaPath, buffer);
        }
        messageStore.set(messageId, {
            content,
            mediaType,
            mediaPath,
            sender,
            group: m.key.remoteJid?.endsWith('@g.us') ? m.key.remoteJid : null,
            timestamp: new Date().toISOString()
        });
        return true;
    }
    async handleMessageRevocation(sock, revocationMessage) {
        const chat = global.db.data.chats[revocationMessage.key.remoteJid];
        if (!chat?.antidelete)
            return;
        const messageId = revocationMessage.message?.protocolMessage?.key?.id;
        const deletedBy = revocationMessage.participant || revocationMessage.key.participant || revocationMessage.key.remoteJid;
        const ownerNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        if (deletedBy.includes(sock.user.id) || deletedBy === ownerNumber)
            return;
        const original = messageStore.get(messageId);
        if (!original)
            return;
        const sender = original.sender;
        const senderName = sender.split('@')[0];
        const groupName = original.group ? (await sock.groupMetadata(original.group)).subject : '';
        const time = new Date().toLocaleString('es-ES', {
            timeZone: 'America/La_Paz',
            hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit',
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
        let text = `${ANTIDELETE_REPORT_HEADER}` +
            `${ANTIDELETE_REPORT_DELETED_BY(deletedBy.split('@')[0])}` +
            `${ANTIDELETE_REPORT_SENDER(senderName)}` +
            `${ANTIDELETE_REPORT_NUMBER(sender)}` +
            `${ANTIDELETE_REPORT_TIME(time)}`;
        if (groupName)
            text += `${ANTIDELETE_REPORT_GROUP(groupName)}`;
        if (original.content) {
            text += `${ANTIDELETE_REPORT_MESSAGE(original.content)}`;
        }
        await sock.sendMessage(ownerNumber, {
            text,
            mentions: [deletedBy, sender]
        });
        if (original.mediaType && fs.existsSync(original.mediaPath)) {
            const mediaOptions = {
                caption: ANTIDELETE_REPORT_MEDIA_CAPTION(original.mediaType, senderName),
                mentions: [sender]
            };
            try {
                switch (original.mediaType) {
                    case 'image':
                        await sock.sendMessage(ownerNumber, {
                            image: { url: original.mediaPath },
                            ...mediaOptions
                        });
                        break;
                    case 'sticker':
                        await sock.sendMessage(ownerNumber, {
                            sticker: { url: original.mediaPath },
                            ...mediaOptions
                        });
                        break;
                    case 'video':
                        await sock.sendMessage(ownerNumber, {
                            video: { url: original.mediaPath },
                            ...mediaOptions
                        });
                        break;
                }
            }
            catch (err) {
                await sock.sendMessage(ownerNumber, {
                    text: ANTIDELETE_REPORT_MEDIA_ERROR(err.message)
                });
            }
            try {
                fs.unlinkSync(original.mediaPath);
            }
            catch (err) {
                console.error('Media cleanup error:', err);
            }
        }
        messageStore.delete(messageId);
    }
}
export default AntiDeletePlugin;
//# sourceMappingURL=antidelete.js.map