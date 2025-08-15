import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys, isJidGroup } from '@whiskeysockets/baileys';
import { ANTILINK_URL_REGEX, ANTILINK_DELETE_MESSAGE, ANTILINK_KICK_MESSAGE, ANTILINK_WARN_MESSAGE, ANTILINK_KICK_AFTER_WARN_MESSAGE, ANTILINK_ERROR } from '../../content/anti/antilink-responses';
const WARN_COUNT = 3;
class AntilinkPlugin {
    name = "AntilinkPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isOwner, isROwner }) {
        const jid = m.key.remoteJid;
        if (!isJidGroup(jid))
            return false;
        const SenderMessage = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
        if (!SenderMessage || typeof SenderMessage !== 'string')
            return false;
        const sender = m.key.participant;
        if (!sender)
            return false;
        if (isAdmin || isOwner || isROwner)
            return false;
        if (!ANTILINK_URL_REGEX.test(SenderMessage.trim()))
            return false;
        const chat = global.db.data.chats[jid];
        if (!chat?.antilink)
            return false;
        const action = chat.antilinkAction || 'delete';
        try {
            await conn.sendMessage(jid, { delete: m.key });
            switch (action) {
                case 'delete':
                    await conn.sendMessage(jid, {
                        text: ANTILINK_DELETE_MESSAGE(sender.split('@')[0]),
                        mentions: [sender]
                    });
                    break;
                case 'kick':
                    await conn.groupParticipantsUpdate(jid, [sender], 'remove');
                    await conn.sendMessage(jid, {
                        text: ANTILINK_KICK_MESSAGE(sender.split('@')[0]),
                        mentions: [sender]
                    });
                    break;
                case 'warn':
                    let user = global.db.data.users[sender];
                    if (!user) {
                        global.db.data.users[sender] = { warningCount: 0 };
                    }
                    user.warningCount = (user.warningCount || 0) + 1;
                    if (user.warningCount >= WARN_COUNT) {
                        await conn.groupParticipantsUpdate(jid, [sender], 'remove');
                        user.warningCount = 0;
                        await conn.sendMessage(jid, {
                            text: ANTILINK_KICK_AFTER_WARN_MESSAGE(sender.split('@')[0], WARN_COUNT),
                            mentions: [sender]
                        });
                    }
                    else {
                        await conn.sendMessage(jid, {
                            text: ANTILINK_WARN_MESSAGE(sender.split('@')[0], user.warningCount, WARN_COUNT),
                            mentions: [sender]
                        });
                    }
                    break;
            }
        }
        catch (error) {
            console.error(ANTILINK_ERROR, error);
        }
        return true;
    }
}
export default AntilinkPlugin;
//# sourceMappingURL=antilink.js.map