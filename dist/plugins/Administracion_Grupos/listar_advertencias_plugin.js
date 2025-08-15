import { WARN_LIST_HEADER, WARN_LIST_TOTAL_USERS, WARN_LIST_USER_DETAIL, WARN_LIST_NO_USERS, WARN_LIST_WARNING_COUNT, WARN_LIST_ERROR } from '../../content/advertencia-responses';
import { BOT_NAME_ADMIN_TK } from '../../content/admin-responses';
class ListarAdvertenciasPlugin {
    name = "ListarAdvertenciasPlugin";
    commands = [
        {
            name: "listar_advertencias",
            alias: ["listaadv", "listadv", "adv", "advlist", "advlista"],
            desc: "Muestra la lista de usuarios con advertencias en el grupo.",
            category: "Administración/Grupos",
            react: "📋",
            execute: async (Yaka, m, { conn, isOwner }) => {
                try {
                    let adv = Object.entries(global.db.data.users).filter(([, user]) => user.warn);
                    const WARN_LIMIT = 4;
                    let caption = `${WARN_LIST_HEADER}\n*╭•·–––––––––––––––––––·•*\n│ ${WARN_LIST_TOTAL_USERS(adv.length)}`;
                    if (adv.length > 0) {
                        caption += adv.map(([jid, user], i) => {
                            const userName = conn.getName(jid) || WARN_LIST_NO_USERS;
                            return `\n│\n│ ${WARN_LIST_USER_DETAIL(i + 1, userName, user.warn, isOwner, jid)}`;
                        }).join('');
                    }
                    caption += `\n*╰•·–––––––––––––––––––·•*\n\n${WARN_LIST_WARNING_COUNT(WARN_LIMIT)}\n${BOT_NAME_ADMIN_TK}`;
                    await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) });
                }
                catch (e) {
                    console.error("Error al listar advertencias:", e);
                    m.reply(WARN_LIST_ERROR);
                }
            }
        }
    ];
}
export default ListarAdvertenciasPlugin;
//# sourceMappingURL=listar_advertencias_plugin.js.map