import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTIBOT_MESSAGE } from '../../content/anti/anti-bot-responses';
class AntiBotPlugin {
    name = "AntiBotPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin }) {
        if (!m.isGroup)
            return false;
        if (m.fromMe)
            return false;
        let chat = global.db.data.chats[m.chat];
        let delet = m.key.participant;
        let bang = m.key.id;
        if (m.id.startsWith('3EB0') && m.id.length === 22) {
            if (chat?.antiBot) {
                if (isBotAdmin) {
                    await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                }
            }
        }
        return true;
    }
}
export default AntiBotPlugin;
//# sourceMappingURL=_antibot.js.map