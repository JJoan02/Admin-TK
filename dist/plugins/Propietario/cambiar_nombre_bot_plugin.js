import { SETNAME_NO_TEXT, SETNAME_SUCCESS, SETNAME_ERROR } from '../../content/propietario/cambiar-nombre-bot-responses';
class CambiarNombreBotPlugin {
    name = 'CambiarNombreBotPlugin';
    commands = [
        {
            name: 'setname',
            alias: ['cambiarnombre'],
            desc: 'Cambia el nombre del perfil del bot.',
            category: 'Propietario',
            react: '📝',
            execute: async (Yaka, m, { conn, text }) => {
                try {
                    if (!text) {
                        return m.reply(SETNAME_NO_TEXT);
                    }
                    await conn.updateProfileName(text);
                    m.reply(SETNAME_SUCCESS(text));
                }
                catch (error) {
                    console.error('Error al actualizar el nombre:', error);
                    m.reply(SETNAME_ERROR(error.message));
                }
            }
        }
    ];
}
export default CambiarNombreBotPlugin;
//# sourceMappingURL=cambiar_nombre_bot_plugin.js.map