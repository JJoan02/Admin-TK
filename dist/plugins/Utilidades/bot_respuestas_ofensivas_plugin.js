import { OFFENSIVE_PHRASES_REGEX, OFFENSIVE_RESPONSES } from '../../content/utilidades/bot_respuestas_ofensivas-responses';
class BotRespuestasOfensivasPlugin {
    async all(m, { conn }) {
        if (m.text && OFFENSIVE_PHRASES_REGEX.test(m.text)) {
            const response = OFFENSIVE_RESPONSES[Math.floor(Math.random() * OFFENSIVE_RESPONSES.length)];
            await conn.reply(m.chat, response, m);
        }
    }
}
export default new BotRespuestasOfensivasPlugin();
//# sourceMappingURL=bot_respuestas_ofensivas_plugin.js.map