import { BAN_BOT_NOT_ADMIN, BAN_BOT_ALREADY_BANNED, BAN_BOT_BANNED, BAN_BOT_ALREADY_OFF, BAN_BOT_OFF, BAN_BOT_ERROR } from '../../content/administracion_grupos/ban-bot-responses';
class BanBotPlugin {
    name = "BanBotPlugin";
    commands = [
        {
            name: "banearbot",
            alias: ["botoff", "offbot", "bot-off", "banchat"],
            desc: "Banea o desactiva el bot en este chat.",
            category: "Administración/Grupos",
            react: "🚫",
            execute: async (Yaka, m, { conn, isAdmin, isOwner, isROwner, command, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!(isAdmin || isOwner || isROwner)) {
                    return conn.reply(m.chat, BAN_BOT_NOT_ADMIN, m);
                }
                try {
                    const chat = global.db.data.chats[m.chat] || {};
                    if (command === 'banchat') {
                        if (chat.isBanned) {
                            return conn.reply(m.chat, BAN_BOT_ALREADY_BANNED, m);
                        }
                        global.db.data.chats[m.chat].isBanned = true;
                        await conn.reply(m.chat, BAN_BOT_BANNED, m);
                    }
                    else {
                        if (chat.isBanned) {
                            return conn.reply(m.chat, BAN_BOT_ALREADY_OFF, m);
                        }
                        global.db.data.chats[m.chat].isBanned = true;
                        await conn.reply(m.chat, BAN_BOT_OFF, m);
                    }
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al manejar comando ${command}: ${e.message}`);
                    await conn.reply(m.chat, BAN_BOT_ERROR, m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default BanBotPlugin;
//# sourceMappingURL=BanBotCommand.js.map