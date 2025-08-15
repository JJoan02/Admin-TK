import { BLOCK_USER_NO_TARGET, BLOCK_USER_SUCCESS, BLOCK_USER_ERROR } from '../../content/administracion_grupos/block-user-responses';
class BloquearUsuarioPlugin {
    name = "BloquearUsuarioPlugin";
    commands = [
        {
            name: "block",
            alias: ["bloquear"],
            desc: "Bloquea a un usuario.",
            category: "Administración/Grupos",
            react: "🚫",
            execute: async (Yaka, m, { conn, text, participants, quoted, isAdmin }) => {
                if (!isAdmin) {
                    return conn.reply(m.chat, "Solo un administrador puede usar este comando.", m);
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
                    return conn.reply(m.chat, BLOCK_USER_NO_TARGET, m);
                }
                if (!target) {
                    return conn.reply(m.chat, BLOCK_USER_NO_TARGET, m);
                }
                try {
                    await conn.updateBlockStatus(target, 'block');
                    conn.reply(m.chat, BLOCK_USER_SUCCESS(target.split('@')[0]), m, { mentions: [target] });
                }
                catch (err) {
                    conn.reply(m.chat, BLOCK_USER_ERROR(err.message), m);
                }
            }
        }
    ];
}
export default BloquearUsuarioPlugin;
//# sourceMappingURL=bloquear_usuario_plugin.js.map