import { KICK_BOT_SELF, KICK_GROUP_OWNER, KICK_BOT_OWNER, KICK_ERROR, KICK_NO_MENTION_OR_QUOTED_V2, KICK_USER_REMOVED_SUCCESS, KICK_PRIVATE_MESSAGE } from '../../content/admin-responses';
class ExpulsarMiembroPlugin {
    name = "ExpulsarMiembroPlugin";
    commands = [
        {
            name: "expulsar_miembro",
            alias: ["kick", "echar", "ban"],
            desc: "Expulsa a un miembro del grupo.",
            category: "Administración/Grupos",
            react: "👋",
            execute: async (Yaka, m, { conn, participants, usedPrefix, command, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                if (!m.mentionedJid[0] && !m.quoted) {
                    return conn.reply(m.chat, KICK_NO_MENTION_OR_QUOTED_V2, m);
                }
                let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
                const groupInfo = await conn.groupMetadata(m.chat);
                const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
                const ownerBot = global.owner[0][0] + '@s.whatsapp.net';
                if (user === conn.user.jid) {
                    return conn.reply(m.chat, KICK_BOT_SELF, m);
                }
                if (user === ownerGroup) {
                    return conn.reply(m.chat, KICK_GROUP_OWNER, m);
                }
                if (user === ownerBot) {
                    return conn.reply(m.chat, KICK_BOT_OWNER, m);
                }
                try {
                    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    conn.reply(m.chat, KICK_USER_REMOVED_SUCCESS, m);
                    conn.reply(KICK_PRIVATE_MESSAGE, user);
                }
                catch (e) {
                    console.error("Error al expulsar miembro:", e);
                    conn.reply(m.chat, KICK_ERROR, m);
                }
            }
        }
    ];
}
export default ExpulsarMiembroPlugin;
//# sourceMappingURL=expulsar_miembro_plugin.js.map