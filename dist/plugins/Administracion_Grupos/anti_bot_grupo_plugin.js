import { ANTIBOT_ALREADY_ON, ANTIBOT_ACTIVATED, ANTIBOT_ALREADY_OFF, ANTIBOT_DEACTIVATED, ANTIBOT_USAGE } from '../../content/admin-responses';
class AntiBotGrupoPlugin {
    name = "AntiBotGrupoPlugin";
    commands = [
        {
            name: "anti_bot",
            alias: ["antibot"],
            desc: "Configura la función anti-bot para el grupo.",
            category: "Administración/Grupos",
            react: "🤖",
            execute: async (Yaka, m, { conn, args, usedPrefix, command, isGroup, isAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                let chat = global.db.data.chats[m.chat] || {};
                if (args[0] === 'on') {
                    if (chat.antiBot) {
                        return conn.reply(m.chat, ANTIBOT_ALREADY_ON, m);
                    }
                    chat.antiBot = true;
                    await conn.reply(m.chat, ANTIBOT_ACTIVATED, m);
                }
                else if (args[0] === 'off') {
                    if (!chat.antiBot) {
                        return conn.reply(m.chat, ANTIBOT_ALREADY_OFF, m, rcanal);
                    }
                    chat.antiBot = false;
                    await conn.reply(m.chat, ANTIBOT_DEACTIVATED, m);
                }
                else {
                    await conn.reply(m.chat, ANTIBOT_USAGE, m);
                }
            }
        }
    ];
}
export default AntiBotGrupoPlugin;
//# sourceMappingURL=anti_bot_grupo_plugin.js.map