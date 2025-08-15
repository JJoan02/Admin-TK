import { KICKALL_SUCCESS, KICKALL_ERROR, KICKALL_NO_ADMIN, KICKALL_NO_BOT_ADMIN } from '../../content/administracion_grupos/kickall-responses';
class ExpulsarTodosPlugin {
    name = 'ExpulsarTodosPlugin';
    commands = [
        {
            name: 'kickall',
            alias: ['kickall'],
            desc: 'Expulsa a todos los miembros del grupo excepto al bot y al propietario.',
            category: 'Administración/Grupos',
            react: '💥',
            execute: async (Yaka, m, { conn, participants, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply(KICKALL_NO_ADMIN);
                }
                if (!isBotAdmin) {
                    return m.reply(KICKALL_NO_BOT_ADMIN);
                }
                try {
                    const groupOwner = (await conn.groupMetadata(m.chat)).owner || m.chat.split('-')[0] + '@s.whatsapp.net';
                    const usersToKick = participants.filter(p => p.id !== conn.user.jid && p.id !== groupOwner).map(p => p.id);
                    for (const user of usersToKick) {
                        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    }
                    conn.reply(m.chat, KICKALL_SUCCESS, m);
                }
                catch (e) {
                    console.error("Error al expulsar a todos los miembros:", e);
                    conn.reply(m.chat, KICKALL_ERROR, m);
                }
            }
        }
    ];
}
export default ExpulsarTodosPlugin;
//# sourceMappingURL=expulsar_todos_plugin.js.map