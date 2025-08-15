import * as fs from 'fs';
import { CANAL_INVITE_MESSAGE, CANAL_SENDING_NOTICE, CANAL_ERROR_SENDING, CANAL_SUMMARY_HEADER, CANAL_SUMMARY_TOTAL, CANAL_SUMMARY_USERS, CANAL_SUMMARY_GROUPS, CANAL_SUMMARY_USERS_LIST, CANAL_SUMMARY_GROUPS_LIST, CANAL_OWNER_ONLY, CANAL_REGISTER_FILE, CANAL_LINK } from '../../content/canal-responses';
import { BOT_NAME_ADMIN_TK } from '../../content/admin-responses';
class GestionarCanalGrupoPlugin {
    name = "GestionarCanalGrupoPlugin";
    commands = [
        {
            name: "canal",
            alias: ["canal"],
            desc: "Envía un aviso sobre el canal oficial del bot a todos los chats.",
            category: "Administración/Grupos",
            react: "📢",
            execute: async (Yaka, m, { conn, isOwner }) => {
                if (!isOwner) {
                    throw CANAL_OWNER_ONLY;
                }
                await GestionarCanalGrupoPlugin.enviarAvisoCanal(conn, m.chat);
            }
        }
    ];
    static async enviarAvisoCanal(conn, notifyChat = null) {
        let yaNotificados = new Set();
        if (fs.existsSync(CANAL_REGISTER_FILE)) {
            yaNotificados = new Set(JSON.parse(fs.readFileSync(CANAL_REGISTER_FILE, 'utf-8')));
        }
        const mensaje = CANAL_INVITE_MESSAGE(BOT_NAME_ADMIN_TK, CANAL_LINK);
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => jid && chat.isChats);
        let usuarios = [];
        let grupos = [];
        if (notifyChat) {
            await conn.sendMessage(notifyChat, { text: CANAL_SENDING_NOTICE });
        }
        for (let [jid] of chats) {
            if (yaNotificados.has(jid))
                continue;
            const isGroup = jid.endsWith('@g.us');
            try {
                await conn.sendMessage(jid, { text: mensaje });
                if (isGroup)
                    grupos.push(jid);
                else
                    usuarios.push(jid);
                yaNotificados.add(jid);
            }
            catch (e) {
                console.log(CANAL_ERROR_SENDING(jid));
            }
            await new Promise(resolve => setTimeout(resolve, 400));
        }
        fs.writeFileSync(CANAL_REGISTER_FILE, JSON.stringify([...yaNotificados], null, 2));
        let resumen = CANAL_SUMMARY_HEADER;
        resumen += `${CANAL_SUMMARY_TOTAL(usuarios.length + grupos.length)}
`;
        resumen += `${CANAL_SUMMARY_USERS(usuarios.length)}
`;
        resumen += `${CANAL_SUMMARY_GROUPS(grupos.length)}

`;
        if (usuarios.length) {
            resumen += `${CANAL_SUMMARY_USERS_LIST}
` + usuarios.map(u => `• wa.me/${u.replace(/[^0-9]/g, '')}`).join('\n') + '\n\n';
        }
        if (grupos.length) {
            resumen += `${CANAL_SUMMARY_GROUPS_LIST}
`;
            for (const g of grupos) {
                try {
                    let metadata = await conn.groupMetadata(g);
                    resumen += `• ${metadata.subject}\n`;
                }
                catch {
                    resumen += `• ${g}\n`;
                }
            }
        }
        if (notifyChat) {
            await conn.sendMessage(notifyChat, { text: resumen });
        }
        return { usuarios, grupos };
    }
}
export default GestionarCanalGrupoPlugin;
//# sourceMappingURL=gestionar_canal_grupo_plugin.js.map