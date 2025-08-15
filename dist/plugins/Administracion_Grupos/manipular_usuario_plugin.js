import { CHETARUSER_OWNER_DENIED, CHETARUSER_SUCCESS, CHETARUSER_ERROR, CHETARUSER_USER_NOT_FOUND } from '../../content/administracion_grupos/manipular_usuario-responses';
class ManipularUsuarioPlugin {
    name = "ManipularUsuarioPlugin";
    commands = [
        {
            name: "manipular_usuario",
            alias: ["ilimitado2", "infiniy2", "chetaruser"],
            desc: "Otorga recursos ilimitados al usuario (solo para pruebas).",
            category: "Administración/Grupos",
            react: "♾️",
            execute: async (Yaka, m, { conn }) => {
                const user = global.db.data.users[m.sender];
                if (!user) {
                    console.error(CHETARUSER_USER_NOT_FOUND, m.sender);
                    return;
                }
                const username = m.sender.split('@')[0];
                if (m.sender === global.owner.number) {
                    await conn.sendMessage(m.chat, { text: CHETARUSER_OWNER_DENIED }, { quoted: fkontak });
                    return;
                }
                try {
                    await conn.sendMessage(m.chat, { text: CHETARUSER_SUCCESS(username), mentions: [m.sender] }, { quoted: fkontak });
                    user.money = Infinity;
                    user.estrellas = Infinity;
                    user.level = Infinity;
                    user.exp = Infinity;
                    console.log(`Recursos cheteados para ${username}`);
                }
                catch (error) {
                    console.error("Error al chetear recursos:", error);
                    await conn.sendMessage(m.chat, { text: CHETARUSER_ERROR }, { quoted: fkontak });
                }
            }
        }
    ];
}
export default ManipularUsuarioPlugin;
//# sourceMappingURL=manipular_usuario_plugin.js.map