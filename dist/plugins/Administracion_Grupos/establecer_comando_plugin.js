import { SET_COMMAND_NO_QUOTED_MESSAGE, SET_COMMAND_NO_COMMAND_NAME, SET_COMMAND_LOCKED, SET_COMMAND_SUCCESS, SET_COMMAND_ERROR } from '../../content/administracion_grupos/set-command-responses';
class EstablecerComandoPlugin {
    name = 'EstablecerComandoPlugin';
    commands = [
        {
            name: 'setcmd',
            alias: ['setcommand', 'addcmd', 'addcommand'],
            desc: 'Establece un comando personalizado.',
            category: 'Administración/Grupos',
            react: '➕',
            execute: async (Yaka, m, { conn, text }) => {
                if (!m.quoted || !m.quoted.fileSha256) {
                    return conn.reply(m.chat, SET_COMMAND_NO_QUOTED_MESSAGE, m);
                }
                if (!text) {
                    return conn.reply(m.chat, SET_COMMAND_NO_COMMAND_NAME, m);
                }
                try {
                    const hash = m.quoted.fileSha256.toString('base64');
                    const commandName = text.toLowerCase();
                    const customCommands = global.db.data.chats[m.chat]?.customCommands || {};
                    const existingCommand = customCommands[hash];
                    if (existingCommand && existingCommand.locked) {
                        return conn.reply(m.chat, SET_COMMAND_LOCKED, m);
                    }
                    global.db.data.chats[m.chat].customCommands = {
                        ...(global.db.data.chats[m.chat]?.customCommands || {}),
                        [hash]: {
                            text: commandName,
                            mentionedJid: m.mentionedJid || [],
                            creator: m.sender,
                            at: +new Date(),
                            locked: false,
                        }
                    };
                    conn.reply(m.chat, SET_COMMAND_SUCCESS(commandName), m);
                }
                catch (e) {
                    console.error(`Error al guardar comando: ${e.message}`);
                    conn.reply(m.chat, SET_COMMAND_ERROR, m);
                }
            }
        }
    ];
}
export default EstablecerComandoPlugin;
//# sourceMappingURL=establecer_comando_plugin.js.map