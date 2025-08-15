import { DELETE_MESSAGE_BOT_NOT_ADMIN, DELETE_MESSAGE_SENDER_NOT_ADMIN, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_ERROR, DELETE_MESSAGE_NO_QUOTED } from '../../content/administracion_grupos/delete-message-responses';
class DeletePlugin {
    name = "DeletePlugin";
    commands = [
        {
            name: "del",
            alias: ["delete"],
            desc: "Elimina un mensaje en el grupo.",
            category: "Administración/Grupos",
            react: "🗑️",
            execute: async (Yaka, m, { conn, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply(DELETE_MESSAGE_SENDER_NOT_ADMIN);
                }
                if (!isBotAdmin) {
                    return m.reply(DELETE_MESSAGE_BOT_NOT_ADMIN);
                }
                const quotedMessageId = m.message?.extendedTextMessage?.contextInfo?.stanzaId;
                const quotedParticipant = m.message?.extendedTextMessage?.contextInfo?.participant;
                if (quotedMessageId) {
                    try {
                        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: quotedMessageId, participant: quotedParticipant } });
                        await conn.sendMessage(m.chat, { text: DELETE_MESSAGE_SUCCESS });
                    }
                    catch (e) {
                        await conn.sendMessage(m.chat, { text: DELETE_MESSAGE_ERROR });
                    }
                }
                else {
                    await conn.sendMessage(m.chat, { text: DELETE_MESSAGE_NO_QUOTED });
                }
            }
        }
    ];
}
export default DeletePlugin;
//# sourceMappingURL=DeleteCommand.js.map