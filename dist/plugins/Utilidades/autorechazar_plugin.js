import { AUTORECHAZAR_FORBIDDEN_PREFIXES } from '../../content/utilidades/autorechazar-responses';
class AutoRechazarPlugin {
    async before(m, { conn, isBotAdmin }) {
        if (!m.isGroup)
            return;
        let chat = global.db.data.chats[m.chat];
        if (isBotAdmin && chat && chat.autoRechazar) {
            const senderNumber = m.sender.split('@')[0];
            for (const prefix of AUTORECHAZAR_FORBIDDEN_PREFIXES) {
                if (senderNumber.startsWith(prefix)) {
                    await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject');
                    console.log(`Solicitud de ${m.sender} rechazada automáticamente por prefijo prohibido: ${prefix}`);
                    return;
                }
            }
        }
    }
}
export default new AutoRechazarPlugin();
//# sourceMappingURL=autorechazar_plugin.js.map