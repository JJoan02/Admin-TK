import ws from 'ws';
import { SETPRIMARY_ALREADY_PRIMARY_V2, SETPRIMARY_SUCCESS_V2, SETPRIMARY_ERROR_V2, DELPRIMARY_NO_PRIMARY_BOT, DELPRIMARY_SUCCESS, DELPRIMARY_ERROR, SETPRIMARY_JADIBOT_USAGE, SETPRIMARY_JADIBOT_NOT_FOUND } from '../../content/administracion_grupos/gestionar_bot_principal-responses';
class GestionarBotPrincipalPlugin {
    name = "GestionarBotPrincipalPlugin";
    commands = [
        {
            name: "establecer_principal",
            alias: ["setprimary"],
            desc: "Establece un bot primario para el grupo.",
            category: "Administración/Grupos",
            react: "👑",
            execute: async (Yaka, m, { conn, command, isGroup, isAdmin, usedPrefix, args }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                const subBots = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn.user.jid)])];
                if (!subBots.includes(global.conn.user.jid)) {
                    subBots.push(global.conn.user.jid);
                }
                const who = m?.message?.extendedTextMessage?.contextInfo?.participant || m?.mentionedJid[0] || await m?.quoted?.sender;
                const chat = global.db.data.chats[m.chat];
                if (!args[0] && !m.mentionedJid[0] && !m.quoted) {
                    return m.reply(await tr(SETPRIMARY_JADIBOT_USAGE(usedPrefix)));
                }
                let botJid;
                let selectedBot;
                if (m.mentionedJid && m.mentionedJid.length > 0) {
                    botJid = m.mentionedJid[0];
                    if (botJid === conn.user.jid || global.conn.user.jid) {
                        selectedBot = conn;
                    }
                    else {
                        selectedBot = subBots.find((jid) => jid === botJid);
                    }
                }
                else {
                    botJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                    if (botJid === conn.user.jid) {
                        selectedBot = conn;
                    }
                    else {
                        selectedBot = subBots.find((jid) => jid === botJid);
                    }
                }
                if (!selectedBot) {
                    return m.reply(await tr(SETPRIMARY_JADIBOT_NOT_FOUND));
                }
                if (chat.primaryBot === botJid) {
                    return conn.reply(m.chat, SETPRIMARY_ALREADY_PRIMARY_V2(botJid), m, { mentions: [botJid] });
                }
                try {
                    chat.primaryBot = botJid;
                    conn.reply(m.chat, SETPRIMARY_SUCCESS_V2(botJid), m, { mentions: [botJid] });
                }
                catch (e) {
                    await m.reply(SETPRIMARY_ERROR_V2);
                }
            }
        },
        {
            name: "eliminar_principal",
            alias: ["delprimary"],
            desc: "Elimina el bot primario del grupo.",
            category: "Administración/Grupos",
            react: "🗑️",
            execute: async (Yaka, m, { conn, command, isGroup, isAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                const chat = global.db.data.chats[m.chat];
                if (!chat.primaryBot) {
                    return conn.reply(m.chat, DELPRIMARY_NO_PRIMARY_BOT, m);
                }
                try {
                    const previousBot = chat.primaryBot;
                    chat.primaryBot = null;
                    conn.reply(m.chat, DELPRIMARY_SUCCESS(previousBot), m, { mentions: [previousBot] });
                }
                catch (e) {
                    await m.reply(DELPRIMARY_ERROR);
                }
            }
        }
    ];
}
export default GestionarBotPrincipalPlugin;
//# sourceMappingURL=gestionar_bot_principal_plugin.js.map