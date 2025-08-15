import { BANCHAT_HEADER, BANCHAT_SUCCESS, BANCHAT_ERROR } from '../../content/admin-responses';
class BanearChatPlugin {
    name = "BanearChatPlugin";
    commands = [
        {
            name: "banear_chat",
            alias: ["banearbot", "botoff", "offbot", "bot-off"],
            desc: "Desactiva el bot en este grupo.",
            category: "Administración/Grupos",
            react: "🚫",
            execute: async (Yaka, m, { conn, isAdmin, isROwner, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!(isAdmin || isROwner)) {
                    dfail('admin', m, conn);
                    return;
                }
                try {
                    global.db.data.chats[m.chat].isBanned = true;
                    await conn.reply(m.chat, `${BANCHAT_HEADER}\n\n${BANCHAT_SUCCESS}`, m, rcanal);
                    await m.react('✅');
                }
                catch (e) {
                    console.error("Error al banear chat:", e);
                    m.reply(BANCHAT_ERROR);
                }
            }
        }
    ];
}
export default BanearChatPlugin;
//# sourceMappingURL=banear_chat_plugin.js.map