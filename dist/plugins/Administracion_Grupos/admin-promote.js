import { PROMOTE_NO_TARGET, PROMOTE_INVALID_NUMBER, PROMOTE_SUCCESS, PROMOTE_ERROR } from '../../content/administracion_grupos/promote-responses';
class PromotePlugin {
    name = 'PromotePlugin';
    commands = [
        {
            name: 'promote',
            alias: ['darpija', 'promover'],
            desc: 'Promueve a un miembro a administrador del grupo.',
            category: 'Administración/Grupos',
            react: '⬆️',
            execute: async (Yaka, m, { conn, usedPrefix, command, text }) => {
                let number;
                if (isNaN(Number(text)) && !text.match(/@/g)) {
                }
                else if (isNaN(Number(text))) {
                    number = text.split('@')[1];
                }
                else if (!isNaN(Number(text))) {
                    number = text;
                }
                if (!text && !m.quoted) {
                    return conn.reply(m.chat, PROMOTE_NO_TARGET(usedPrefix, command), m);
                }
                if (number && (number.length > 13 || (number.length < 11 && number.length > 0))) {
                    return conn.reply(m.chat, PROMOTE_INVALID_NUMBER, m);
                }
                let user;
                try {
                    if (text) {
                        user = number + '@s.whatsapp.net';
                    }
                    else if (m.quoted && m.quoted.sender) {
                        user = m.quoted.sender;
                    }
                    else if (m.mentionedJid && m.mentionedJid[0]) {
                        user = m.mentionedJid[0];
                    }
                }
                catch (e) {
                }
                finally {
                    if (user) {
                        await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
                        conn.reply(m.chat, PROMOTE_SUCCESS, m);
                    }
                    else {
                        conn.reply(m.chat, PROMOTE_ERROR, m);
                    }
                }
            }
        }
    ];
}
export default PromotePlugin;
//# sourceMappingURL=admin-promote.js.map