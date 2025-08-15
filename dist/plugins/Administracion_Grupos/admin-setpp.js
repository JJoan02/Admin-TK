import { SETPP_NO_IMAGE_QUOTED, SETPP_SUCCESS, SETPP_ERROR, SETPP_NO_IMAGE } from '../../content/administracion_grupos/setpp-responses';
class SetPpPlugin {
    name = 'SetPpPlugin';
    commands = [
        {
            name: 'setpp',
            alias: ['setppgc', 'setppgrup', 'setppgp', 'groupimage', 'groupimg'],
            desc: 'Establece la foto de perfil del grupo.',
            category: 'Administración/Grupos',
            react: '🖼️',
            execute: async (Yaka, m, { conn, usedPrefix, command, quoted }) => {
                const q = quoted ? quoted : m;
                const mime = (q.msg || q).mimetype || q.mediaType || '';
                if (/image/.test(mime)) {
                    const img = await q.download();
                    if (!img)
                        return conn.reply(m.chat, SETPP_NO_IMAGE_QUOTED, m);
                    try {
                        await conn.updateProfilePicture(m.chat, img);
                        conn.reply(m.chat, SETPP_SUCCESS, m);
                    }
                    catch (e) {
                        conn.reply(m.chat, SETPP_ERROR(e.message), m);
                    }
                }
                else {
                    return conn.reply(m.chat, SETPP_NO_IMAGE, m);
                }
            }
        }
    ];
}
export default SetPpPlugin;
//# sourceMappingURL=admin-setpp.js.map