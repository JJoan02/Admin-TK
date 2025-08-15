import { DELETE_COMMAND_NO_HASH, DELETE_COMMAND_LOCKED, DELETE_COMMAND_SUCCESS, DELETE_COMMAND_NOT_FOUND, DELETE_COMMAND_ERROR } from '../../content/administracion_grupos/delete-command-responses';
class DeleteCommandPlugin {
    name = "DeleteCommandPlugin";
    commands = [
        {
            name: "delcmd",
            alias: ["deletecmd", "removecmd"],
            desc: "Elimina un comando personalizado.",
            category: "Administración/Grupos",
            react: "🗑️",
            execute: async (Yaka, m, { conn, text, isOwner }) => {
                if (!isOwner) {
                    return m.reply("Solo el propietario puede usar este comando.");
                }
                let hash = text;
                if (m.quoted && m.quoted.fileSha256) {
                    hash = m.quoted.fileSha256.toString('base64');
                }
                if (!hash) {
                    return conn.reply(m.chat, DELETE_COMMAND_NO_HASH, m);
                }
                try {
                    const customCommands = global.db.data.chats[m.chat]?.customCommands || {};
                    const stickerData = customCommands[hash];
                    if (stickerData && stickerData.locked) {
                        return conn.reply(m.chat, DELETE_COMMAND_LOCKED, m);
                    }
                    if (stickerData) {
                        delete customCommands[hash];
                        global.db.data.chats[m.chat].customCommands = customCommands;
                        conn.reply(m.chat, DELETE_COMMAND_SUCCESS, m);
                    }
                    else {
                        conn.reply(m.chat, DELETE_COMMAND_NOT_FOUND(hash), m);
                    }
                }
                catch (e) {
                    console.error(`Error al eliminar comando: ${e.message}`);
                    conn.reply(m.chat, DELETE_COMMAND_ERROR, m);
                }
            }
        }
    ];
}
export default DeleteCommandPlugin;
//# sourceMappingURL=DeleteCommandCommand.js.map