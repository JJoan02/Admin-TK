import { DEMOTE_GROUP_ONLY, DEMOTE_BOT_NOT_ADMIN, DEMOTE_SENDER_NOT_ADMIN, DEMOTE_NO_TARGET, DEMOTE_FAILED, DEMOTE_RATE_LIMIT, DEMOTE_MESSAGE_HEADER, DEMOTE_MESSAGE_USER, DEMOTE_MESSAGE_BY, DEMOTE_MESSAGE_DATE } from '../../content/administracion_grupos/demote-responses';
class DemotePlugin {
    name = "DemotePlugin";
    commands = [
        {
            name: "demote",
            alias: ["degradar"],
            desc: "Degrada a un administrador a miembro.",
            category: "Administración/Grupos",
            react: "⬇️",
            execute: async (Yaka, m, { conn, mentionedJids, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return conn.reply(m.chat, DEMOTE_GROUP_ONLY, m);
                }
                if (!isBotAdmin) {
                    return conn.reply(m.chat, DEMOTE_BOT_NOT_ADMIN, m);
                }
                if (!isAdmin) {
                    return conn.reply(m.chat, DEMOTE_SENDER_NOT_ADMIN, m);
                }
                let userToDemote = [];
                if (mentionedJids && mentionedJids.length > 0) {
                    userToDemote = mentionedJids;
                }
                else if (m.message?.extendedTextMessage?.contextInfo?.participant) {
                    userToDemote = [m.message.extendedTextMessage.contextInfo.participant];
                }
                if (userToDemote.length === 0) {
                    return conn.reply(m.chat, DEMOTE_NO_TARGET, m);
                }
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await conn.groupParticipantsUpdate(m.chat, userToDemote, "demote");
                    const usernames = await Promise.all(userToDemote.map(async (jid) => {
                        return `@${jid.split('@')[0]}`;
                    }));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const demotionMessage = `${DEMOTE_MESSAGE_HEADER}\n\n` +
                        `${DEMOTE_MESSAGE_USER(userToDemote.length)}:\n` +
                        `${usernames.map(name => `• ${name}`).join('\n')}\n\n` +
                        `${DEMOTE_MESSAGE_BY(`@${m.sender.split('@')[0]}`)}\n\n` +
                        `${DEMOTE_MESSAGE_DATE(new Date().toLocaleString())}`;
                    await conn.sendMessage(m.chat, {
                        text: demotionMessage,
                        mentions: [...userToDemote, m.sender]
                    });
                }
                catch (error) {
                    console.error('Error in demote command:', error);
                    if (error.data === 429) {
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        conn.reply(m.chat, DEMOTE_RATE_LIMIT, m);
                    }
                    else {
                        conn.reply(m.chat, DEMOTE_FAILED, m);
                    }
                }
            }
        }
    ];
}
export default DemotePlugin;
//# sourceMappingURL=demote.js.map