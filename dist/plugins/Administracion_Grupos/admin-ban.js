import * as fs from 'fs';
import * as path from 'path';
import { ADMIN_BAN_NO_ADMIN, ADMIN_BAN_NO_TARGET, ADMIN_BAN_NOT_MEMBER, ADMIN_BAN_CANNOT_BAN_ADMIN, ADMIN_BAN_SUCCESS, ADMIN_BAN_ERROR } from '../../content/administracion_grupos/admin-ban-responses';
const bannedUsersPath = path.join(process.cwd(), 'data', 'banned.json');
function readBannedUsers() {
    if (!fs.existsSync(bannedUsersPath)) {
        return [];
    }
    try {
        return JSON.parse(fs.readFileSync(bannedUsersPath, 'utf-8'));
    }
    catch (e) {
        console.error("Error reading banned.json:", e);
        return [];
    }
}
function writeBannedUsers(users) {
    const dataDir = path.dirname(bannedUsersPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(bannedUsersPath, JSON.stringify(users, null, 2));
}
class AdminBanPlugin {
    name = "AdminBanPlugin";
    commands = [
        {
            name: "ban",
            alias: ["kick"],
            desc: "Expulsa a un miembro del grupo y lo añade a la lista de baneados.",
            category: "Administración/Grupos",
            react: "🚫",
            execute: async (Yaka, m, { conn, text, participants, quoted, isAdmin, isBotAdmin }) => {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const groupAdmins = groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
                if (!isAdmin) {
                    return conn.reply(m.chat, ADMIN_BAN_NO_ADMIN, m);
                }
                if (!isBotAdmin) {
                    return conn.reply(m.chat, "El bot necesita ser administrador del grupo para usar este comando.", m);
                }
                let target;
                if (m.mentionedJid && m.mentionedJid.length > 0) {
                    target = m.mentionedJid[0];
                }
                else if (quoted) {
                    target = quoted.sender;
                }
                else if (text) {
                    target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                }
                else {
                    return conn.reply(m.chat, ADMIN_BAN_NO_TARGET, m);
                }
                if (!target) {
                    return conn.reply(m.chat, ADMIN_BAN_NO_TARGET, m);
                }
                const isMember = participants.find(p => p.id === target);
                if (!isMember)
                    return conn.reply(m.chat, ADMIN_BAN_NOT_MEMBER, m);
                if (groupAdmins.includes(target))
                    return conn.reply(m.chat, ADMIN_BAN_CANNOT_BAN_ADMIN, m);
                try {
                    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
                    conn.reply(m.chat, ADMIN_BAN_SUCCESS(target.split('@')[0]), m, { mentions: [target] });
                    const bannedUsers = readBannedUsers();
                    if (!bannedUsers.includes(target)) {
                        bannedUsers.push(target);
                        writeBannedUsers(bannedUsers);
                    }
                }
                catch (err) {
                    conn.reply(m.chat, ADMIN_BAN_ERROR(err.message), m);
                }
            }
        }
    ];
}
export default AdminBanPlugin;
//# sourceMappingURL=admin-ban.js.map