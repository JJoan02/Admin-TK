import { CHECK_EXPIRED_NOT_SET, CHECK_EXPIRED_NOT_SET_TARGET, CHECK_EXPIRED_EXPIRED, CHECK_EXPIRED_EXPIRES_IN, CHECK_EXPIRED_ERROR, msToDate } from '../../content/administracion_grupos/check-expired-responses';
class CheckExpiredPlugin {
    name = "CheckExpiredPlugin";
    commands = [
        {
            name: "checkexpired",
            alias: ["expiracion", "caducidad"],
            desc: "Verifica la fecha de caducidad de un grupo.",
            category: "Administración/Grupos",
            react: "⏳",
            execute: async (Yaka, m, { conn, args, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                try {
                    const chat = global.db.data.chats[m.chat];
                    if (!chat || chat.expired < 1) {
                        return conn.reply(m.chat, CHECK_EXPIRED_NOT_SET, m);
                    }
                    let targetChatId = m.chat;
                    if (args[0]) {
                        targetChatId = args[0];
                    }
                    const targetChat = global.db.data.chats[targetChatId];
                    if (!targetChat || targetChat.expired < 1) {
                        return conn.reply(m.chat, CHECK_EXPIRED_NOT_SET_TARGET(targetChatId), m);
                    }
                    const now = new Date().getTime();
                    const remainingMs = targetChat.expired - now;
                    if (remainingMs <= 0) {
                        return conn.reply(m.chat, CHECK_EXPIRED_EXPIRED, m);
                    }
                    const formattedTime = msToDate(remainingMs);
                    await conn.reply(m.chat, CHECK_EXPIRED_EXPIRES_IN(formattedTime), m);
                }
                catch (e) {
                    console.error(`Error al verificar caducidad del grupo: ${e.message}`);
                    conn.reply(m.chat, CHECK_EXPIRED_ERROR, m);
                }
            }
        }
    ];
}
export default CheckExpiredPlugin;
//# sourceMappingURL=CheckExpiredCommand.js.map