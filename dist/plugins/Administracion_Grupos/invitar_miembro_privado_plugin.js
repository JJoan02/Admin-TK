import { ADD_RESTRICT_DISABLED, ADD_ERROR, INVITE_NO_NUMBER_PROVIDED, INVITE_NO_PLUS_SYMBOL, INVITE_ONLY_NUMBERS, INVITE_GROUP_INVITATION_HEADER, INVITE_GROUP_INVITATION_MESSAGE, INVITE_SUCCESS_CONFIRMATION } from '../../content/admin-responses';
import { WHATSAPP_GROUP_LINK_BASE } from '../../content/admin-responses';
class InvitarMiembroPrivadoPlugin {
    name = "InvitarMiembroPrivadoPlugin";
    commands = [
        {
            name: "invitar_miembro_privado",
            alias: ["add", "agregar", "añadir", "invite", "invitar"],
            desc: "Invita a un miembro a un grupo enviando el enlace de invitación por privado.",
            category: "Administración/Grupos",
            react: "✉️",
            execute: async (Yaka, m, { conn, args, text, usedPrefix, command, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                if (!global.db.data.settings[conn.user.jid].restrict) {
                    return conn.reply(m.chat, ADD_RESTRICT_DISABLED, m);
                }
                if (!text) {
                    return conn.reply(m.chat, INVITE_NO_NUMBER_PROVIDED(usedPrefix, command), m);
                }
                if (text.includes('+')) {
                    return conn.reply(m.chat, INVITE_NO_PLUS_SYMBOL, m);
                }
                if (isNaN(text)) {
                    return conn.reply(m.chat, INVITE_ONLY_NUMBERS, m);
                }
                let who;
                if (m.isGroup) {
                    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
                }
                else {
                    who = m.chat;
                }
                let name = await conn.getName(m.sender);
                let user = global.db.data.users[who];
                let nom = await conn.getName(m.sender);
                let group = m.chat;
                let link = WHATSAPP_GROUP_LINK_BASE + await conn.groupInviteCode(group);
                try {
                    await conn.reply(text + '@s.whatsapp.net', `${INVITE_GROUP_INVITATION_HEADER}\n\n${INVITE_GROUP_INVITATION_MESSAGE(link)}`, m, { mentions: [m.sender] });
                    m.reply(INVITE_SUCCESS_CONFIRMATION);
                }
                catch (e) {
                    console.error("Error al invitar miembro por privado:", e);
                    m.reply(ADD_ERROR);
                }
            }
        }
    ];
}
export default InvitarMiembroPrivadoPlugin;
//# sourceMappingURL=invitar_miembro_privado_plugin.js.map