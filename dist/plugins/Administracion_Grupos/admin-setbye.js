import { SETBYE_SUCCESS, SETBYE_NO_TEXT } from '../../content/administracion_grupos/setbye-responses';
class SetByePlugin {
    name = 'SetByePlugin';
    commands = [
        {
            name: 'setbye',
            alias: ['despedida'],
            desc: 'Configura el mensaje de despedida del grupo.',
            category: 'Administración/Grupos',
            react: '👋',
            execute: async (Yaka, m, { conn, text, isROwner, isOwner }) => {
                if (text) {
                    global.db.data.chats[m.chat].sBye = text;
                    conn.reply(m.chat, SETBYE_SUCCESS, m);
                }
                else {
                    conn.reply(m.chat, SETBYE_NO_TEXT, m);
                }
            }
        }
    ];
}
export default SetByePlugin;
//# sourceMappingURL=admin-setbye.js.map