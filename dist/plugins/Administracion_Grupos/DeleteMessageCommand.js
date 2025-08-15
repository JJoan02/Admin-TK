import { DELETE_MESSAGE_NO_QUOTED_MESSAGE, DELETE_MESSAGE_NO_INFO, DELETE_MESSAGE_ERROR_GENERIC } from '../../content/administracion_grupos/delete-message-responses';
class DeleteMessagePlugin {
    name = "DeleteMessagePlugin";
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
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                if (!m.quoted) {
                    return conn.reply(m.chat, DELETE_MESSAGE_NO_QUOTED_MESSAGE, m);
                }
                try {
                    if (m.quoted.message?.extendedTextMessage?.contextInfo) {
                        const participant = m.quoted.message.extendedTextMessage.contextInfo.participant;
                        const stanzaId = m.quoted.message.extendedTextMessage.contextInfo.stanzaId;
                        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: stanzaId, participant: participant } });
                    }
                    else if (m.quoted.vM && m.quoted.vM.key) {
                        await conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
                    }
                    else {
                        return conn.reply(m.chat, DELETE_MESSAGE_NO_INFO, m);
                    }
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al eliminar mensaje: ${e.message}`);
                    conn.reply(m.chat, DELETE_MESSAGE_ERROR_GENERIC, m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default DeleteMessagePlugin;
//# sourceMappingURL=DeleteMessageCommand.js.map