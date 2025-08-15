import { BOT_AUDIOS_RESPONSES } from '../../content/audio/bot-audios-responses';
class BotAudiosPlugin {
    name = "BotAudiosPlugin";
    commands = [
        {
            name: "botaudios",
            alias: [],
            desc: "Reproduce audios predefinidos basados en el texto del mensaje.",
            category: "Audio",
            react: "🔊",
            execute: async (Yaka, m, { conn, text }) => {
                conn.reply(m.chat, "Este comando funciona automáticamente al detectar frases clave.", m);
            }
        }
    ];
    async all(m, { conn }) {
        const text = m.text?.toLowerCase();
        if (!text)
            return false;
        if (global.db?.data?.chats?.[m.chat]?.audios) {
            const audioResponse = BOT_AUDIOS_RESPONSES.find(audio => audio.phrase === text);
            if (audioResponse) {
                conn.sendPresenceUpdate('recording', m.chat);
                await conn.sendFile(m.chat, audioResponse.url, `${text}.mp3`, null, m, true, { type: 'audioMessage' });
                return true;
            }
        }
        return false;
    }
}
export default BotAudiosPlugin;
//# sourceMappingURL=BotAudiosCommand.js.map