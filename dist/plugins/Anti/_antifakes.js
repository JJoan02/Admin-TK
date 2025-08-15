import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_FAKES_PREFIXES } from '../../content/anti/anti-fakes-responses';
class AntiFakesPlugin {
    name = "AntiFakesPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin }) {
        if (!m.isGroup)
            return false;
        if (m.fromMe)
            return false;
        if (!isBotAdmin)
            return false;
        let chat = global.db.data.chats[m.chat];
        if (!chat?.antifake)
            return false;
        const senderNumber = m.sender.split('@')[0];
        const isFake = ANTI_FAKES_PREFIXES.some(prefix => senderNumber.startsWith(prefix));
        if (isFake) {
            global.db.data.users[m.sender].block = true;
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }
        return true;
    }
}
export default AntiFakesPlugin;
//# sourceMappingURL=_antifakes.js.map