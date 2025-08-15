import { AUTORECHAZAR_PREFIXES } from '../../content/administracion_grupos/autorechazar-responses';
class AutoRechazarPlugin {
    name = "AutoRechazarPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin }) {
        if (!m.isGroup)
            return false;
        let chat = global.db.data.chats[m.chat];
        if (isBotAdmin && chat?.autoRechazar) {
            if (AUTORECHAZAR_PREFIXES.some(prefix => m.sender.startsWith(prefix))) {
                await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject');
            }
        }
        return true;
    }
}
export default AutoRechazarPlugin;
//# sourceMappingURL=_autorechazar.js.map