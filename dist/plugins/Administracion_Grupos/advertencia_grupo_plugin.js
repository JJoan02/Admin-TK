import { WARN_USAGE_MESSAGE, WARN_SUCCESS_MESSAGE, WARN_RESTRICT_DISABLED, WARN_REMOVED_MESSAGE, WARN_DEFAULT_REASON, WARN_BOT_MENTIONED, WARN_ERROR_MESSAGE } from '../../content/administracion_grupos/advertencia_grupo-responses';
class AdvertenciaGrupoPlugin {
    name = "AdvertenciaGrupoPlugin";
    commands = [
        {
            name: "advertencia_grupo",
            alias: ["advertir", "advertencia", "warn", "warning"],
            desc: "Advierte a un miembro del grupo y lo expulsa después de 3 advertencias.",
            category: "Administración/Grupos",
            react: "⚠️",
            execute: async (Yaka, m, { conn, text, command, usedPrefix, isGroup, isAdmin, isBotAdmin }) => {
                try {
                    if (!isGroup) {
                        return m.reply("Este comando solo puede ser usado en grupos.");
                    }
                    if (!isAdmin) {
                        return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                    }
                    if (!isBotAdmin) {
                        return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                    }
                    if (m.mentionedJid.includes(conn.user.jid)) {
                        return m.reply(WARN_BOT_MENTIONED);
                    }
                    let who;
                    if (m.mentionedJid[0]) {
                        who = m.mentionedJid[0];
                    }
                    else if (m.quoted) {
                        who = m.quoted.sender;
                    }
                    else {
                        who = text;
                    }
                    if (!who) {
                        throw m.reply(WARN_USAGE_MESSAGE(usedPrefix, command, global.suittag), m.chat, { mentions: conn.parseMention(WARN_USAGE_MESSAGE(usedPrefix, command, global.suittag)) });
                    }
                    const user = global.db.data.users[who];
                    const botSettings = global.db.data.settings[conn.user.jid] || {};
                    const reason = text ? text.replace(/@\d+-?\d* /g, '') : WARN_DEFAULT_REASON;
                    if (!user) {
                        global.db.data.users[who] = { warn: 0 };
                    }
                    global.db.data.users[who].warn += 1;
                    await m.reply(WARN_SUCCESS_MESSAGE(who, reason, global.db.data.users[who].warn), null, { mentions: [who] });
                    if (global.db.data.users[who].warn >= 3) {
                        if (!botSettings.restrict) {
                            return m.reply(WARN_RESTRICT_DISABLED);
                        }
                        global.db.data.users[who].warn = 0;
                        await m.reply(WARN_REMOVED_MESSAGE(who), null, { mentions: [who] });
                        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
                    }
                }
                catch (error) {
                    console.error("Error en el comando de advertencia:", error);
                    m.reply(WARN_ERROR_MESSAGE);
                }
            }
        }
    ];
}
export default AdvertenciaGrupoPlugin;
//# sourceMappingURL=advertencia_grupo_plugin.js.map