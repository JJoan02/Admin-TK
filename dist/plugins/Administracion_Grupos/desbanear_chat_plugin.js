import { UNBANCHAT_SUCCESS } from '../../content/administracion_grupos/desbanear-chat-responses';
class DesbanearChatPlugin {
    name = 'DesbanearChatPlugin';
    commands = [
        {
            name: 'unbanchat',
            alias: ['desbanearbot', 'boton', 'bot-on', 'onbot'],
            desc: 'Activa el bot en el chat actual.',
            category: 'Administración/Grupos',
            react: '✅',
            execute: async (Yaka, m, { conn, isAdmin, isROwner }) => {
                if (!(isAdmin || isROwner))
                    return dfail('admin', m, conn);
                global.db.data.chats[m.chat].isBanned = false;
                await conn.reply(m.chat, UNBANCHAT_SUCCESS, m, rcanal);
                await m.react('✅');
            }
        }
    ];
}
export default DesbanearChatPlugin;
//# sourceMappingURL=desbanear_chat_plugin.js.map