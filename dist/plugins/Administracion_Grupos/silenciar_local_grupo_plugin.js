import { MUTE_LOCAL_BOT_NOT_ADMIN, MUTE_LOCAL_ADMIN_ONLY, MUTE_LOCAL_NO_QUOTED, MUTE_LOCAL_SUCCESS, UNMUTE_LOCAL_SUCCESS } from '../../content/administracion_grupos/silenciar_local_grupo-responses';
class SilenciarLocalGrupoPlugin {
    name = "SilenciarLocalGrupoPlugin";
    static mutedUsers = new Set();
    commands = [
        {
            name: "silenciar_local",
            alias: ["mute"],
            desc: "Silencia a un miembro del grupo localmente (elimina sus mensajes).",
            category: "Administración/Grupos",
            react: "🔇",
            execute: async (Yaka, m, { conn, command, isAdmin, isBotAdmin }) => {
                if (!isBotAdmin) {
                    return conn.reply(m.chat, MUTE_LOCAL_BOT_NOT_ADMIN, m);
                }
                if (!isAdmin) {
                    return conn.reply(m.chat, MUTE_LOCAL_ADMIN_ONLY, m);
                }
                let user;
                if (m.quoted) {
                    user = m.quoted.sender;
                }
                else {
                    return conn.reply(m.chat, MUTE_LOCAL_NO_QUOTED, m);
                }
                SilenciarLocalGrupoPlugin.mutedUsers.add(user);
                conn.reply(m.chat, MUTE_LOCAL_SUCCESS(user), m, { mentions: [user] });
            }
        },
        {
            name: "desilenciar_local",
            alias: ["unmute"],
            desc: "Desilencia a un miembro del grupo localmente.",
            category: "Administración/Grupos",
            react: "🔊",
            execute: async (Yaka, m, { conn, command, isAdmin, isBotAdmin }) => {
                if (!isBotAdmin) {
                    return conn.reply(m.chat, MUTE_LOCAL_BOT_NOT_ADMIN, m);
                }
                if (!isAdmin) {
                    return conn.reply(m.chat, MUTE_LOCAL_ADMIN_ONLY, m);
                }
                let user;
                if (m.quoted) {
                    user = m.quoted.sender;
                }
                else {
                    return conn.reply(m.chat, MUTE_LOCAL_NO_QUOTED, m);
                }
                SilenciarLocalGrupoPlugin.mutedUsers.delete(user);
                conn.reply(m.chat, UNMUTE_LOCAL_SUCCESS(user), m, { mentions: [user] });
            }
        }
    ];
    static async beforeMessage(m, conn) {
        if (SilenciarLocalGrupoPlugin.mutedUsers.has(m.sender) && m.mtype !== 'stickerMessage') {
            try {
                await conn.sendMessage(m.chat, { delete: m.key });
            }
            catch (e) {
                console.error("Error al eliminar mensaje de usuario muteado:", e);
            }
        }
    }
}
export default SilenciarLocalGrupoPlugin;
//# sourceMappingURL=silenciar_local_grupo_plugin.js.map