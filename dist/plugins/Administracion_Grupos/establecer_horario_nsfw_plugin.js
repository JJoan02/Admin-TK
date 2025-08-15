import { SET_NSFW_SCHEDULE_NO_TIME, SET_NSFW_SCHEDULE_WRONG_FORMAT, SET_NSFW_SCHEDULE_SUCCESS, SET_NSFW_SCHEDULE_ERROR } from '../../content/administracion_grupos/set-nsfw-schedule-responses';
class EstablecerHorarioNsfwPlugin {
    name = 'EstablecerHorarioNsfwPlugin';
    commands = [
        {
            name: 'sethorario',
            alias: ['setnsfw', 'horarionsfw'],
            desc: 'Configura el horario para el contenido NSFW en el grupo.',
            category: 'Administración/Grupos',
            react: '⏰',
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                const args = text.split(' ').slice(1);
                if (args.length < 2) {
                    return conn.reply(m.chat, SET_NSFW_SCHEDULE_NO_TIME(usedPrefix, command), m);
                }
                let inicio, fin;
                const regex1 = /^(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/;
                const regex2 = /^(\d{2}:\d{2})\s*a\s*(\d{2}:\d{2})$/;
                const regex3 = /^(\d{2}:\d{2})\s*,\s*(\d{2}:\d{2})$/;
                let match;
                const fullText = args.join(' ');
                if ((match = fullText.match(regex1)) || (match = fullText.match(regex2)) || (match = fullText.match(regex3))) {
                    inicio = match[1];
                    fin = match[2];
                }
                else {
                    return conn.reply(m.chat, SET_NSFW_SCHEDULE_WRONG_FORMAT(usedPrefix, command), m);
                }
                try {
                    global.db.data.chats[m.chat].horarioNsfw = { inicio, fin };
                    conn.reply(m.chat, SET_NSFW_SCHEDULE_SUCCESS(inicio, fin), m);
                }
                catch (e) {
                    console.error(`Error al configurar horario NSFW: ${e.message}`);
                    conn.reply(m.chat, SET_NSFW_SCHEDULE_ERROR, m);
                }
            }
        }
    ];
}
export default EstablecerHorarioNsfwPlugin;
//# sourceMappingURL=establecer_horario_nsfw_plugin.js.map