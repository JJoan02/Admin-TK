import { GROUP_DESC_SUCCESS, GROUP_DESC_ERROR } from '../../content/admin-responses';
class EstablecerDescripcionGrupoPlugin {
    name = "EstablecerDescripcionGrupoPlugin";
    commands = [
        {
            name: "establecer_descripcion_grupo",
            alias: ["gpdesc", "groupdesc"],
            desc: "Establece la descripción del grupo.",
            category: "Administración/Grupos",
            react: "📝",
            execute: async (Yaka, m, { conn, args, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                const newDescription = args.join(' ');
                if (!newDescription) {
                    return m.reply("Por favor, ingresa la nueva descripción para el grupo.");
                }
                try {
                    await conn.groupUpdateDescription(m.chat, newDescription);
                    m.reply(GROUP_DESC_SUCCESS);
                }
                catch (e) {
                    console.error("Error al establecer la descripción del grupo:", e);
                    m.reply(GROUP_DESC_ERROR);
                }
            }
        }
    ];
}
export default EstablecerDescripcionGrupoPlugin;
//# sourceMappingURL=establecer_descripcion_grupo_plugin.js.map