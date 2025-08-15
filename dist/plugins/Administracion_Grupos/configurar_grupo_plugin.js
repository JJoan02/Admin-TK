import { GROUP_CONFIG_USAGE, GROUP_CONFIG_SUCCESS, GROUP_CONFIG_ERROR } from '../../content/admin-responses';
class ConfigurarGrupoPlugin {
    name = "ConfigurarGrupoPlugin";
    commands = [
        {
            name: "configurar_grupo",
            alias: ["group", "grupo"],
            desc: "Configura los ajustes del grupo (abrir/cerrar, bloquear/desbloquear).",
            category: "Administración/Grupos",
            react: "⚙️",
            execute: async (Yaka, m, { conn, args, usedPrefix, command, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                const isClose = {
                    'abrir': 'not_announcement',
                    'cerrar': 'announcement',
                    'desbloquear': 'unlocked',
                    'bloquear': 'locked'
                }[args[0] || ''];
                if (!isClose) {
                    return conn.reply(m.chat, GROUP_CONFIG_USAGE(command), m);
                }
                try {
                    await conn.groupSettingUpdate(m.chat, isClose);
                    conn.reply(m.chat, GROUP_CONFIG_SUCCESS, m);
                    await m.react('✅');
                }
                catch (error) {
                    console.error(error);
                    conn.reply(m.chat, GROUP_CONFIG_ERROR, m);
                }
            }
        }
    ];
}
export default ConfigurarGrupoPlugin;
//# sourceMappingURL=configurar_grupo_plugin.js.map