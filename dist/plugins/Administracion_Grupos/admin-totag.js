import { ADMIN_TOTAG_NO_QUOTED, ADMIN_TOTAG_ERROR } from '../../content/administracion_grupos/admin-totag-responses';
class AdminTotagPlugin {
    name = "AdminTotagPlugin";
    commands = [
        {
            name: "totag",
            alias: ["tag"],
            desc: "Reenvía un mensaje y etiqueta a todos los participantes del grupo.",
            category: "Administración/Grupos",
            react: "🗣️",
            execute: async (Yaka, m, { conn, text, participants, quoted, isGroup, isAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!quoted) {
                    return conn.reply(m.chat, ADMIN_TOTAG_NO_QUOTED, m);
                }
                let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);
                const forwardedMessage = quoted.fakeObj || quoted;
                try {
                    await conn.sendMessage(m.chat, { forward: forwardedMessage, mentions: users });
                }
                catch (e) {
                    console.error("Error al intentar etiquetar a todos:", e);
                    conn.reply(m.chat, ADMIN_TOTAG_ERROR, m);
                }
            }
        }
    ];
}
export default AdminTotagPlugin;
//# sourceMappingURL=admin-totag.js.map