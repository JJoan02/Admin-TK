import { LIST_COMMANDS_NO_COMMANDS, LIST_COMMANDS_HEADER, LIST_COMMANDS_INFO, LIST_COMMANDS_SEPARATOR, LIST_COMMANDS_COMMAND_LINE, LIST_COMMANDS_ERROR } from '../../content/administracion_grupos/list-commands-responses';
class ListarComandosPlugin {
    name = 'ListarComandosPlugin';
    commands = [
        {
            name: 'listcmd',
            alias: ['listarc', 'comandos'],
            desc: 'Lista los comandos personalizados del grupo.',
            category: 'Administración/Grupos',
            react: '📋',
            execute: async (Yaka, m, { conn }) => {
                try {
                    const customCommands = global.db.data.chats[m.chat]?.customCommands || {};
                    if (Object.keys(customCommands).length === 0) {
                        return conn.reply(m.chat, LIST_COMMANDS_NO_COMMANDS, m);
                    }
                    let message = `${LIST_COMMANDS_HEADER}\n\n${LIST_COMMANDS_INFO}\n\n${LIST_COMMANDS_SEPARATOR}\n`;
                    Object.entries(customCommands).forEach(([key, value], index) => {
                        message += `${LIST_COMMANDS_COMMAND_LINE(index, key, value)}\n`;
                    });
                    await conn.reply(m.chat, message.trim(), m, {
                        mentions: Object.values(customCommands).map((x) => x.mentionedJid).filter(Boolean).flat()
                    });
                }
                catch (e) {
                    console.error(`Error al listar comandos: ${e.message}`);
                    conn.reply(m.chat, LIST_COMMANDS_ERROR, m);
                }
            }
        }
    ];
}
export default ListarComandosPlugin;
//# sourceMappingURL=listar_comandos_plugin.js.map