import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_TOXIC_REGEX, ANTI_TOXIC_WARN_MESSAGE, ANTI_TOXIC_REMOVE_MESSAGE, ANTI_TOXIC_IMAGE } from '../../content/anti/anti-toxic-responses';
class AntiToxicPlugin {
    name = "AntiToxicPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin, isOwner }) {
        if (m.isBaileys && m.fromMe)
            return false;
        if (!m.isGroup)
            return false;
        let delet = m.key.participant;
        let bang = m.key.id;
        let user = global.db.data.users[m.sender];
        let chat = global.db.data.chats[m.chat];
        const isToxic = toxicRegex.exec(m.text);
        if (isToxic && chat?.antitoxic && !isOwner && !isAdmin && isBotAdmin) {
            user.warn = (user.warn || 0) + 1;
            const toxicWord = isToxic[0];
            if (!(user.warn >= 4)) {
                await conn.reply(m.chat, ANTI_TOXIC_WARN_MESSAGE(toxicWord, user.warn), m);
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            }
            if (user.warn >= 4) {
                user.warn = 0;
                await conn.reply(m.chat, ANTI_TOXIC_REMOVE_MESSAGE(toxicWord), m);
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
        return true;
    }
}
export default AntiToxicPlugin;
//# sourceMappingURL=_antitoxic.js.map