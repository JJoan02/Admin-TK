import { SETEMOJI_NO_TEXT, SETEMOJI_INVALID_EMOJI, SETEMOJI_SUCCESS, SETEMOJI_ERROR } from '../../content/administracion_grupos/setemoji-responses';
const isEmoji = (text) => {
    const emojiRegex = /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
    return emojiRegex.test(text) && text.length <= 2;
};
class EstablecerEmojiTagallPlugin {
    name = 'EstablecerEmojiTagallPlugin';
    commands = [
        {
            name: 'setemoji',
            alias: ['setemo'],
            desc: 'Establece un emoji personalizado para el tagall del grupo.',
            category: 'Administración/Grupos',
            react: '✨',
            execute: async (Yaka, m, { conn, text, isROwner }) => {
                if (!text) {
                    return m.reply(SETEMOJI_NO_TEXT);
                }
                const emoji = text.trim();
                if (!isEmoji(emoji)) {
                    return m.reply(SETEMOJI_INVALID_EMOJI);
                }
                try {
                    global.db.data.chats[m.chat].customEmoji = emoji;
                    m.reply(SETEMOJI_SUCCESS(emoji));
                }
                catch (error) {
                    console.error(error);
                    m.reply(SETEMOJI_ERROR);
                }
            }
        }
    ];
}
export default EstablecerEmojiTagallPlugin;
//# sourceMappingURL=establecer_emoji_tagall_plugin.js.map