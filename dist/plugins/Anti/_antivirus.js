import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
class AntiVirusPlugin {
    name = "AntiVirusPlugin";
    commands = [];
    async all(m, { conn, isBotAdmin }) {
        if (m.messageStubType === 68) {
            let log = {
                key: m.key,
                content: m.msg,
                sender: m.sender
            };
            await conn.modifyChat(m.chat, 'clear', {
                includeStarred: false
            }).catch(console.log);
        }
        return true;
    }
}
export default AntiVirusPlugin;
//# sourceMappingURL=_antivirus.js.map