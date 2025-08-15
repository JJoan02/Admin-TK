import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { SETPP_BOT_NO_REPLY, SETPP_BOT_NO_IMAGE, SETPP_BOT_SUCCESS, SETPP_BOT_ERROR } from '../../content/propietario/setpp-bot-responses';
class EstablecerFotoPerfilBotPlugin {
    name = 'EstablecerFotoPerfilBotPlugin';
    commands = [
        {
            name: 'setpp',
            alias: ['setppbot', 'setbotpp'],
            desc: 'Establece la foto de perfil del bot.',
            category: 'Propietario',
            react: '🖼️',
            execute: async (Yaka, m, { conn }) => {
                if (!m.quoted || !m.quoted.message) {
                    return conn.reply(m.chat, SETPP_BOT_NO_REPLY, m);
                }
                const quotedMessage = m.quoted.message;
                const mediaType = Object.keys(quotedMessage)[0];
                if (!quotedMessage.imageMessage && !quotedMessage.stickerMessage) {
                    return conn.reply(m.chat, SETPP_BOT_NO_IMAGE, m);
                }
                try {
                    const stream = await downloadContentFromMessage(quotedMessage[mediaType], 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) {
                        buffer = Buffer.concat([buffer, chunk]);
                    }
                    await conn.updateProfilePicture(conn.user.jid, buffer);
                    conn.reply(m.chat, SETPP_BOT_SUCCESS, m);
                }
                catch (error) {
                    console.error('Error en el comando setpp:', error);
                    conn.reply(m.chat, SETPP_BOT_ERROR, m);
                }
            }
        }
    ];
}
export default EstablecerFotoPerfilBotPlugin;
//# sourceMappingURL=establecer_foto_perfil_bot_plugin.js.map