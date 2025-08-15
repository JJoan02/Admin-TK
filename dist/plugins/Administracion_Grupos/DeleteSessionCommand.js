import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { DELETE_SESSION_NOT_ON_MAIN_BOT, DELETE_SESSION_NO_FILES, DELETE_SESSION_DELETED, DELETE_SESSION_ERROR, DELETE_SESSION_HELLO } from '../../content/administracion_grupos/delete-session-responses';
class DeleteSessionPlugin {
    name = "DeleteSessionPlugin";
    commands = [
        {
            name: "ds",
            alias: ["deletesession", "clearsession"],
            desc: "Elimina archivos de sesión del bot.",
            category: "Administración/Grupos",
            react: "🗑️",
            execute: async (Yaka, m, { conn, isOwner }) => {
                if (!isOwner) {
                    return m.reply("Solo el propietario puede usar este comando.");
                }
                if (conn.user.jid !== conn.user.jid) {
                    return conn.sendMessage(m.chat, { text: DELETE_SESSION_NOT_ON_MAIN_BOT }, { quoted: m });
                }
                const sessionPath = path.resolve(process.cwd(), 'sessions');
                const targetIds = m.isGroup ? [m.chat, m.sender] : [m.sender];
                try {
                    const files = await readdir(sessionPath);
                    let filesDeleted = 0;
                    for (const file of files) {
                        for (const id of targetIds) {
                            if (file.includes(id.split('@')[0])) {
                                await unlink(path.join(sessionPath, file));
                                filesDeleted++;
                                console.log(`Archivo de sesión eliminado: ${file}`);
                                break;
                            }
                        }
                    }
                    if (filesDeleted === 0) {
                        await conn.sendMessage(m.chat, { text: DELETE_SESSION_NO_FILES }, { quoted: m });
                    }
                    else {
                        await conn.sendMessage(m.chat, { text: DELETE_SESSION_DELETED(filesDeleted) }, { quoted: m });
                    }
                }
                catch (err) {
                    console.error(`Error al eliminar archivos de sesión: ${err.message}`);
                    await conn.sendMessage(m.chat, { text: DELETE_SESSION_ERROR }, { quoted: m });
                }
                await conn.sendMessage(m.chat, { text: DELETE_SESSION_HELLO }, { quoted: m });
            }
        }
    ];
}
export default DeleteSessionPlugin;
//# sourceMappingURL=DeleteSessionCommand.js.map