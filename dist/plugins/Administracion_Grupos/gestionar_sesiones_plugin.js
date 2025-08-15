import { promises as fs } from 'fs';
import path from 'path';
import { DS_MAIN_BOT_ONLY, DS_NO_FILES_FOUND, DS_FILES_DELETED_SUCCESS, DS_ERROR_READING_SESSIONS, DS_ERROR_DELETING_SESSIONS, DS_FINAL_MESSAGE } from '../../content/admin-responses';
class GestionarSesionesPlugin {
    name = "GestionarSesionesPlugin";
    commands = [
        {
            name: "gestionar_sesiones",
            alias: ["fixmsgespera", "ds"],
            desc: "Gestiona y elimina archivos de sesión para solucionar problemas de mensajes.",
            category: "Administración/Grupos",
            react: "🧹",
            execute: async (Yaka, m, { conn, usedPrefix, command, isGroup, isAdmin }) => {
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador para usar este comando.");
                }
                if (global.conn.user.jid !== conn.user.jid) {
                    return conn.sendMessage(m.chat, { text: DS_MAIN_BOT_ONLY }, { quoted: m });
                }
                const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender];
                const sessionPath = './sessions';
                try {
                    const files = await fs.readdir(sessionPath);
                    let filesDeleted = 0;
                    for (const file of files) {
                        for (const id of chatId) {
                            if (file.includes(id.split('@')[0])) {
                                await fs.unlink(path.join(sessionPath, file));
                                filesDeleted++;
                                break;
                            }
                        }
                    }
                    if (filesDeleted === 0) {
                        await conn.sendMessage(m.chat, { text: DS_NO_FILES_FOUND }, { quoted: m });
                    }
                    else {
                        await conn.sendMessage(m.chat, { text: DS_FILES_DELETED_SUCCESS(filesDeleted) }, { quoted: m });
                    }
                }
                catch (err) {
                    console.error(DS_ERROR_READING_SESSIONS, err);
                    await conn.sendMessage(m.chat, { text: DS_ERROR_DELETING_SESSIONS }, { quoted: m });
                }
                await conn.sendMessage(m.chat, { text: DS_FINAL_MESSAGE }, { quoted: m });
            }
        }
    ];
}
export default GestionarSesionesPlugin;
//# sourceMappingURL=gestionar_sesiones_plugin.js.map