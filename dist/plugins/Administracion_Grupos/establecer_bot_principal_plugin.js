import ws from 'ws';
import { SETPRIMARY_NO_MENTION, SETPRIMARY_NOT_BOT, SETPRIMARY_ALREADY_PRIMARY, SETPRIMARY_SUCCESS, BOT_NAME_ADMIN_TK } from '../../content/admin-responses';
class EstablecerBotPrincipalPlugin {
    name = "EstablecerBotPrincipalPlugin";
    commands = [
        {
            name: "establecer_principal",
            alias: ["setprimary"],
            desc: "Establece un bot primario para el grupo.",
            category: "Administración/Grupos",
            react: "👑",
            execute: async (Yaka, m, { conn, usedPrefix, args, isGroup, isAdmin, isBotAdmin, isCreator }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!args[0] && !m.quoted) {
                    return m.reply(SETPRIMARY_NO_MENTION);
                }
                const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
                let chat = global.db.data.chats[m.chat];
                let botJid;
                let selectedBot;
                if (m.mentionedJid && m.mentionedJid.length > 0) {
                    botJid = m.mentionedJid[0];
                }
                else if (m.quoted) {
                    botJid = m.quoted.sender;
                }
                else {
                    botJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                }
                if (botJid === conn.user.jid || botJid === global.conn.user.jid) {
                    selectedBot = conn;
                }
                else {
                    selectedBot = users.find((conn) => conn.user.jid === botJid);
                }
                if (!selectedBot) {
                    return conn.reply(m.chat, SETPRIMARY_NOT_BOT(BOT_NAME_ADMIN_TK), m);
                }
                if (chat.primaryBot === botJid) {
                    return conn.reply(m.chat, SETPRIMARY_ALREADY_PRIMARY(botJid), m, { mentions: [botJid] });
                }
                chat.primaryBot = botJid;
                conn.sendMessage(m.chat, { text: SETPRIMARY_SUCCESS(botJid), mentions: [botJid] }, { quoted: m });
            }
        }
    ];
}
export default EstablecerBotPrincipalPlugin;
//# sourceMappingURL=establecer_bot_principal_plugin.js.map