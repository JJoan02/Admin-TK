import { ADMIN_DEMOTE_NO_TARGET, ADMIN_DEMOTE_INVALID_NUMBER, ADMIN_DEMOTE_SUCCESS, ADMIN_DEMOTE_ERROR } from '../../content/administracion_grupos/admin-demote-responses';
class AdminDemotePlugin {
    name = "AdminDemotePlugin";
    commands = [
        {
            name: "demote",
            alias: ["degradar"],
            desc: "Degrada a un administrador del grupo.",
            category: "Administración/Grupos",
            react: "⬇️",
            execute: async (Yaka, m, { conn, usedPrefix, command, text, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                let number;
                if (isNaN(Number(text)) && !text.match(/@/g)) {
                }
                else if (isNaN(Number(text))) {
                    number = text.split('@')[1];
                }
                else if (!isNaN(Number(text))) {
                    number = text;
                }
                if (!text && !m.quoted) {
                    return conn.reply(m.chat, ADMIN_DEMOTE_NO_TARGET(usedPrefix, command), m);
                }
                if (number && (number.length > 13 || (number.length < 11 && number.length > 0))) {
                    return conn.reply(m.chat, ADMIN_DEMOTE_INVALID_NUMBER, m);
                }
                let user;
                try {
                    if (text) {
                        user = number + '@s.whatsapp.net';
                    }
                    else if (m.quoted && m.quoted.sender) {
                        user = m.quoted.sender;
                    }
                    else if (m.mentionedJid && m.mentionedJid[0]) {
                        user = m.mentionedJid[0];
                    }
                }
                catch (e) {
                }
                finally {
                    if (user) {
                        await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
                        m.reply(ADMIN_DEMOTE_SUCCESS);
                    }
                    else {
                        m.reply(ADMIN_DEMOTE_ERROR);
                    }
                }
            }
        }
    ];
}
export default AdminDemotePlugin;
//# sourceMappingURL=admin-demote.js.map