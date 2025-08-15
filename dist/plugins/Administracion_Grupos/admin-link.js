import { LINK_SUCCESS, LINK_ERROR } from '../../content/administracion_grupos/link-responses';
class LinkPlugin {
    name = 'LinkPlugin';
    commands = [
        {
            name: 'link',
            alias: ['linkgroup'],
            desc: 'Obtiene el enlace de invitación del grupo.',
            category: 'Administración/Grupos',
            react: '🔗',
            execute: async (Yaka, m, { conn, groupMetadata }) => {
                try {
                    const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat);
                    conn.reply(m.chat, LINK_SUCCESS(groupMetadata.subject, link), m, { detectLink: true });
                }
                catch (e) {
                    conn.reply(m.chat, LINK_ERROR, m);
                }
            }
        }
    ];
}
export default LinkPlugin;
//# sourceMappingURL=admin-link.js.map