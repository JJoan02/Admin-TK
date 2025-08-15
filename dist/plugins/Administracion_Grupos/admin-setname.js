import { ADMIN_SETNAME_NO_TEXT, ADMIN_SETNAME_SUCCESS, ADMIN_SETNAME_ERROR } from '../../content/administracion_grupos/admin-setname-responses';
class AdminSetnamePlugin {
    name = "AdminSetnamePlugin";
    commands = [
        {
            name: "setname",
            alias: ["setnm"],
            desc: "Cambia el nombre del grupo.",
            category: "Administración/Grupos",
            react: "📝",
            execute: async (Yaka, m, { conn, args, text, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                if (!text) {
                    return conn.reply(m.chat, ADMIN_SETNAME_NO_TEXT, m);
                }
                try {
                    await conn.groupUpdateSubject(m.chat, text);
                    conn.reply(m.chat, ADMIN_SETNAME_SUCCESS, m);
                }
                catch (e) {
                    console.error("Error al cambiar el nombre del grupo:", e);
                    conn.reply(m.chat, ADMIN_SETNAME_ERROR, m);
                }
            }
        }
    ];
}
export default AdminSetnamePlugin;
//# sourceMappingURL=admin-setname.js.map