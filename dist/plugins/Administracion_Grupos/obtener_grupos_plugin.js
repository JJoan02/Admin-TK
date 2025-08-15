import { GETGROUPS_HEADER, GETGROUPS_NO_NAME, GETGROUPS_ERROR } from '../../content/admin-responses';
class ObtenerGruposPlugin {
    name = "ObtenerGruposPlugin";
    commands = [
        {
            name: "obtener_grupos",
            alias: ["getgroups", "grupos"],
            desc: "Muestra la lista de grupos en los que el bot está participando.",
            category: "Administración/Grupos",
            react: "👥",
            execute: async (Yaka, m, { conn }) => {
                try {
                    const chats = await conn.groupFetchAllParticipating();
                    const groupIds = Object.keys(chats);
                    let message = GETGROUPS_HEADER;
                    groupIds.forEach((id) => {
                        const groupName = chats[id].subject || GETGROUPS_NO_NAME;
                        message += `- ${groupName}: ${id}\n`;
                    });
                    m.reply(message);
                }
                catch (e) {
                    console.error("Error al obtener grupos:", e);
                    m.reply(GETGROUPS_ERROR);
                }
            }
        }
    ];
}
export default ObtenerGruposPlugin;
//# sourceMappingURL=obtener_grupos_plugin.js.map