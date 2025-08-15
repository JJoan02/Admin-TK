import { KICK_NO_TARGET, KICK_NO_SELF_KICK, KICK_NO_OWNER_KICK, KICK_NO_BOT_OWNER_KICK, KICK_SUCCESS, KICK_ERROR } from '../../content/administracion_grupos/kick-responses';
class KickPlugin {
    name = 'KickPlugin';
    commands = [
        {
            name: 'kick',
            alias: ['echar', 'hechar', 'ban'],
            desc: 'Elimina a un miembro de un grupo.',
            category: 'Administración/Grupos',
            react: '👋',
            execute: async (Yaka, m, { conn, participants, usedPrefix, command }) => {
                if (!m.mentionedJid[0] && !m.quoted) {
                    return conn.reply(m.chat, KICK_NO_TARGET(usedPrefix, command), m);
                }
                const user = m.mentionedJid[0] ? m.mentionedJid[0] : await m.quoted.sender;
                const groupInfo = await conn.groupMetadata(m.chat);
                const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
                const ownerBot = global.owner[0][0] + '@s.whatsapp.net';
                if (user === conn.user.jid) {
                    return conn.reply(m.chat, KICK_NO_SELF_KICK, m);
                }
                if (user === ownerGroup) {
                    return conn.reply(m.chat, KICK_NO_OWNER_KICK, m);
                }
                if (user === ownerBot) {
                    return conn.reply(m.chat, KICK_NO_BOT_OWNER_KICK, m);
                }
                try {
                    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    conn.reply(m.chat, KICK_SUCCESS, m);
                }
                catch (e) {
                    conn.reply(m.chat, KICK_ERROR, m);
                }
            }
        }
    ];
}
export default KickPlugin;
//# sourceMappingURL=admin-kick.js.map