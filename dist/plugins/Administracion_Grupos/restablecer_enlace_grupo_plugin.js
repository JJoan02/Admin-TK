import { RESETLINK_SUCCESS, RESETLINK_ERROR } from '../../content/administracion_grupos/restablecer_enlace_grupo-responses';
import { WHATSAPP_GROUP_LINK_BASE } from '../../content/admin-responses';
class RestablecerEnlaceGrupoPlugin {
    name = "RestablecerEnlaceGrupoPlugin";
    commands = [
        {
            name: "restablecer_enlace_grupo",
            alias: ["revoke", "resetlink", "anularlink"],
            desc: "Restablece el enlace de invitación del grupo.",
            category: "Administración/Grupos",
            react: "🔄",
            execute: async (Yaka, m, { conn, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                try {
                    let revoke = await conn.groupRevokeInvite(m.chat);
                    await conn.reply(m.chat, RESETLINK_SUCCESS(WHATSAPP_GROUP_LINK_BASE + revoke), m);
                }
                catch (e) {
                    console.error("Error al restablecer el enlace del grupo:", e);
                    m.reply(RESETLINK_ERROR);
                }
            }
        }
    ];
}
export default RestablecerEnlaceGrupoPlugin;
//# sourceMappingURL=restablecer_enlace_grupo_plugin.js.map