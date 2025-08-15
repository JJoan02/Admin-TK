import { DEMOTE_NO_MENTION, DEMOTE_INVALID_NUMBER, DEMOTE_SUCCESS, DEMOTE_ERROR } from '../../content/administracion_grupos/degradar_admin_grupo-responses';
class DegradarAdminGrupoPlugin {
    name = "DegradarAdminGrupoPlugin";
    commands = [
        {
            name: "degradar_admin",
            alias: ["demote", "degradar"],
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
                if (isNaN(text) && !text.match(/@/g)) {
                }
                else if (isNaN(text)) {
                    number = text.split('@')[1];
                }
                else if (!isNaN(text)) {
                    number = text;
                }
                else {
                    return conn.reply(m.chat, DEMOTE_NO_MENTION, m, rcanal);
                }
                if (!text && !m.quoted) {
                    return conn.reply(m.chat, DEMOTE_NO_MENTION, m, rcanal);
                }
                if (number && (number.length > 13 || (number.length < 11 && number.length > 0))) {
                    return conn.reply(m.chat, DEMOTE_INVALID_NUMBER, m, fake);
                }
                try {
                    let user;
                    if (text) {
                        user = number + '@s.whatsapp.net';
                    }
                    else if (m.quoted && m.quoted.sender) {
                        user = m.quoted.sender;
                    }
                    else if (m.mentionedJid && m.mentionedJid[0]) {
                        user = m.mentionedJid[0];
                    }
                    else {
                        return conn.reply(m.chat, DEMOTE_NO_MENTION, m, rcanal);
                    }
                    await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
                    conn.reply(m.chat, DEMOTE_SUCCESS, m, fake);
                }
                catch (e) {
                    console.error("Error al degradar administrador:", e);
                    conn.reply(m.chat, DEMOTE_ERROR, m, fake);
                }
            }
        }
    ];
}
export default DegradarAdminGrupoPlugin;
//# sourceMappingURL=degradar_admin_grupo_plugin.js.map