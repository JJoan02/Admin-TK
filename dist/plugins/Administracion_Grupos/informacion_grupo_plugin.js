import { GROUPINFO_HEADER, GROUPINFO_ID, GROUPINFO_NAME, GROUPINFO_MEMBERS, GROUPINFO_OWNER, GROUPINFO_ADMINS, GROUPINFO_SETTINGS_HEADER, GROUPINFO_BANNED, GROUPINFO_WELCOME, GROUPINFO_DETECT, GROUPINFO_ANTI_DELETE, GROUPINFO_ANTI_LINK, GROUPINFO_MESSAGE_SETTINGS_HEADER, GROUPINFO_WELCOME_MSG, GROUPINFO_GOODBYE_MSG, GROUPINFO_PROMOTE_MSG, GROUPINFO_DEMOTE_MSG, GROUPINFO_DESCRIPTION_HEADER, GROUPINFO_DESCRIPTION_UNKNOWN, GROUPINFO_ERROR } from '../../content/admin-responses';
class InformacionGrupoPlugin {
    name = "InformacionGrupoPlugin";
    commands = [
        {
            name: "informacion_grupo",
            alias: ["infogrupo", "groupinfo", "infogp"],
            desc: "Muestra información detallada del grupo.",
            category: "Administración/Grupos",
            react: "ℹ️",
            execute: async (Yaka, m, { conn, participants, groupMetadata, isGroup }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                try {
                    const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png';
                    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat];
                    const groupAdmins = participants.filter((p) => p.admin);
                    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
                    const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split('-')[0] + '@s.whatsapp.net';
                    let text = `${GROUPINFO_HEADER}\n` +
                        `║❥ ${GROUPINFO_ID} ${groupMetadata.id}\n` +
                        `║❥ ${GROUPINFO_NAME} ${groupMetadata.subject}\n` +
                        `║❥ ${GROUPINFO_MEMBERS} ${participants.length}\n` +
                        `║❥ ${GROUPINFO_OWNER} @${owner.split('@')[0]}\n` +
                        `║❥ ${GROUPINFO_ADMINS} \n${listAdmin}\n` +
                        `║❥ ${GROUPINFO_SETTINGS_HEADER}\n` +
                        `║❥ • ${isBanned ? '✅' : '❎'} ${GROUPINFO_BANNED}\n` +
                        `║❥ • ${welcome ? '✅' : '❎'} ${GROUPINFO_WELCOME}\n` +
                        `║❥ • ${detect ? '✅' : '❎'} ${GROUPINFO_DETECT}\n` +
                        `║❥ • ${del ? '❎' : '✅'} ${GROUPINFO_ANTI_DELETE}\n` +
                        `║❥ • ${antiLink ? '✅' : '❎'} ${GROUPINFO_ANTI_LINK}\n` +
                        `╰────\n` +
                        `${GROUPINFO_MESSAGE_SETTINGS_HEADER}\n` +
                        `• ${GROUPINFO_WELCOME_MSG} ${sWelcome}\n` +
                        `• ${GROUPINFO_GOODBYE_MSG} ${sBye}\n` +
                        `• ${GROUPINFO_PROMOTE_MSG} ${sPromote}\n` +
                        `• ${GROUPINFO_DEMOTE_MSG} ${sDemote}\n\n` +
                        `${GROUPINFO_DESCRIPTION_HEADER}\n` +
                        `• ${groupMetadata.desc?.toString() || GROUPINFO_DESCRIPTION_UNKNOWN}\n`;
                    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map((v) => v.id), owner] });
                }
                catch (e) {
                    console.error("Error al obtener información del grupo:", e);
                    m.reply(GROUPINFO_ERROR);
                }
            }
        }
    ];
}
export default InformacionGrupoPlugin;
//# sourceMappingURL=informacion_grupo_plugin.js.map