import { AUTOACEPTAR_LATIN_PREFIX } from '../../content/utilidades/autoaceptar-responses';
class AutoAceptarPlugin {
    async before(m, { conn, isAdmin, isBotAdmin }) {
        if (!m.isGroup)
            return false;
        let chat = global.db.data.chats[m.chat];
        if (chat && chat.autoAceptar && !isAdmin) {
            if (!isBotAdmin)
                return false;
            const participants = await conn.groupRequestParticipantsList(m.chat);
            const filteredParticipants = participants.filter((p) => p.jid.includes('@s.whatsapp.net') && p.jid.split('@')[0].startsWith(AUTOACEPTAR_LATIN_PREFIX));
            for (const participant of filteredParticipants) {
                await conn.groupRequestParticipantsUpdate(m.chat, [participant.jid], "approve");
            }
            if (m.messageStubType === 172 && m.messageStubParameters) {
                const [jid] = m.messageStubParameters;
                if (jid.includes('@s.whatsapp.net') && jid.split('@')[0].startsWith(AUTOACEPTAR_LATIN_PREFIX)) {
                    await conn.groupRequestParticipantsUpdate(m.chat, [jid], "approve");
                }
            }
        }
        return false;
    }
}
export default new AutoAceptarPlugin();
//# sourceMappingURL=autoaceptar_plugin.js.map