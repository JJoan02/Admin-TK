import { ICommand, IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys, GroupMetadata } from '@whiskeysockets/baileys';
import { ANTIBADWORD_SETUP_MESSAGE, ANTIBADWORD_ALREADY_ENABLED, ANTIBADWORD_ENABLED_SUCCESS, ANTIBADWORD_ALREADY_DISABLED, ANTIBADWORD_DISABLED_SUCCESS, ANTIBADWORD_INVALID_ACTION, ANTIBADWORD_ACTION_SET, ANTIBADWORD_INVALID_COMMAND, ANTIBADWORD_MESSAGE_DELETED, ANTIBADWORD_MESSAGE_KICKED, ANTIBADWORD_MESSAGE_KICKED_AFTER_WARNINGS, ANTIBADWORD_MESSAGE_WARNING, BAD_WORDS_LIST } from '../../content/anti/anti-badword-responses';
class AntiBadwordPlugin {
    name = "AntiBadwordPlugin";
    commands = [
        {
            name: "antibadword",
            alias: [],
            desc: "Configura la función anti-malas palabras en el grupo.",
            category: "Anti",
            react: "🚫",
            execute: async (Yaka, m, { conn, args, isGroup, isAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                const match = args[0];
                if (!match) {
                    return conn.sendMessage(m.chat, { text: ANTIBADWORD_SETUP_MESSAGE });
                }
                let chat = global.db.data.chats[m.chat];
                if (!chat.antiBadword) {
                    chat.antiBadword = { enabled: false, action: 'delete' };
                }
                if (match === 'on') {
                    if (chat.antiBadword.enabled) {
                        return conn.sendMessage(m.chat, { text: ANTIBADWORD_ALREADY_ENABLED });
                    }
                    chat.antiBadword.enabled = true;
                    chat.antiBadword.action = args[1] && ['delete', 'kick', 'warn'].includes(args[1]) ? args[1] : 'delete';
                    return conn.sendMessage(m.chat, { text: ANTIBADWORD_ENABLED_SUCCESS });
                }
                if (match === 'off') {
                    if (!chat.antiBadword.enabled) {
                        return conn.sendMessage(m.chat, { text: ANTIBADWORD_ALREADY_DISABLED });
                    }
                    chat.antiBadword.enabled = false;
                    return conn.sendMessage(m.chat, { text: ANTIBADWORD_DISABLED_SUCCESS });
                }
                if (match === 'set') {
                    const action = args[1];
                    if (!action || !['delete', 'kick', 'warn'].includes(action)) {
                        return conn.sendMessage(m.chat, { text: ANTIBADWORD_INVALID_ACTION });
                    }
                    chat.antiBadword.action = action;
                    return conn.sendMessage(m.chat, { text: ANTIBADWORD_ACTION_SET(action) });
                }
                return conn.sendMessage(m.chat, { text: ANTIBADWORD_INVALID_COMMAND });
            }
        }
    ];
    async before(m, { conn, isGroup, isAdmin, isBotAdmin }) {
        if (!isGroup)
            return false;
        if (m.key.fromMe)
            return false;
        let chat = global.db.data.chats[m.chat];
        if (!chat?.antiBadword?.enabled)
            return false;
        if (isAdmin)
            return false;
        if (!isBotAdmin)
            return false;
        const userMessage = m.text || '';
        const senderId = m.sender;
        const cleanMessage = userMessage.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        let containsBadWord = false;
        const messageWords = cleanMessage.split(' ');
        for (const word of messageWords) {
            if (word.length < 2)
                continue;
            if (BAD_WORDS_LIST.includes(word)) {
                containsBadWord = true;
                break;
            }
            for (const badWord of BAD_WORDS_LIST) {
                if (badWord.includes(' ')) {
                    if (cleanMessage.includes(badWord)) {
                        containsBadWord = true;
                        break;
                    }
                }
            }
            if (containsBadWord)
                break;
        }
        if (!containsBadWord)
            return false;
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        }
        catch (err) {
            console.error('Error deleting message:', err);
            return false;
        }
        let user = global.db.data.users[senderId];
        if (!user) {
            global.db.data.users[senderId] = { warningCount: 0 };
        }
        if (!user.warningCount)
            user.warningCount = 0;
        switch (chat.antiBadword.action) {
            case 'delete':
                await conn.sendMessage(m.chat, {
                    text: ANTIBADWORD_MESSAGE_DELETED(senderId.split('@')[0]),
                    mentions: [senderId]
                });
                break;
            case 'kick':
                try {
                    await conn.groupParticipantsUpdate(m.chat, [senderId], 'remove');
                    await conn.sendMessage(m.chat, {
                        text: ANTIBADWORD_MESSAGE_KICKED(senderId.split('@')[0]),
                        mentions: [senderId]
                    });
                }
                catch (error) {
                    console.error('Error kicking user:', error);
                }
                break;
            case 'warn':
                user.warningCount++;
                if (user.warningCount >= 3) {
                    try {
                        await conn.groupParticipantsUpdate(m.chat, [senderId], 'remove');
                        user.warningCount = 0;
                        await conn.sendMessage(m.chat, {
                            text: ANTIBADWORD_MESSAGE_KICKED_AFTER_WARNINGS(senderId.split('@')[0]),
                            mentions: [senderId]
                        });
                    }
                    catch (error) {
                        console.error('Error kicking user after warnings:', error);
                    }
                }
                else {
                    await conn.sendMessage(m.chat, {
                        text: ANTIBADWORD_MESSAGE_WARNING(senderId.split('@')[0], user.warningCount),
                        mentions: [senderId]
                    });
                }
                break;
        }
        return true;
    }
}
export default AntiBadwordPlugin;
//# sourceMappingURL=antibadword.js.map