import { ADMINS_MESSAGE } from '../../content/administracion_grupos/admins-responses';
class AdminsPlugin {
    name = 'AdminsPlugin';
    commands = [
        {
            name: 'admins',
            alias: ['@admins', 'dmins'],
            desc: 'Menciona a todos los administradores del grupo.',
            category: 'Administración/Grupos',
            react: '📣',
            execute: async (Yaka, m, { conn, participants, groupMetadata, args }) => {
                const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/admins.jpg';
                const groupAdmins = participants.filter((p) => p.admin);
                const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
                const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split('-')[0] + '@s.whatsapp.net';
                const pesan = args.join ` `;
                const oi = `» ${pesan}`;
                const text = ADMINS_MESSAGE(oi, listAdmin);
                conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map((v) => v.id), owner] });
            }
        }
    ];
}
export default AdminsPlugin;
//# sourceMappingURL=AdminsCommand.js.map