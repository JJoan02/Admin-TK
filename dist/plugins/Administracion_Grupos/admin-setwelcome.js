import { SETWELCOME_SUCCESS, SETWELCOME_NO_TEXT } from '../../content/administracion_grupos/setwelcome-responses';
class SetWelcomePlugin {
    name = 'SetWelcomePlugin';
    commands = [
        {
            name: 'setwelcome',
            alias: ['bienvenida'],
            desc: 'Configura el mensaje de bienvenida del grupo.',
            category: 'Administración/Grupos',
            react: '👋',
            execute: async (Yaka, m, { conn, text, isROwner, isOwner }) => {
                if (text) {
                    global.db.data.chats[m.chat].welcome = text;
                    m.reply(SETWELCOME_SUCCESS);
                }
                else {
                    throw SETWELCOME_NO_TEXT;
                }
            }
        }
    ];
}
export default SetWelcomePlugin;
//# sourceMappingURL=admin-setwelcome.js.map