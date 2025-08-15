export const LIST_COMMANDS_NO_COMMANDS = "No hay comandos personalizados registrados.";
export const LIST_COMMANDS_HEADER = "*LISTA DE COMANDOS PERSONALIZADOS*";
export const LIST_COMMANDS_INFO = "Aquí puedes ver los comandos personalizados que se han añadido.";
export const LIST_COMMANDS_SEPARATOR = "----------------------------------------";
export const LIST_COMMANDS_COMMAND_LINE = (index, command, response) => `${index + 1}. Comando: ${command} -> Respuesta: ${response.text || response.image || response.video || response.audio || response.sticker}`;
export const LIST_COMMANDS_ERROR = "Error al listar comandos.";
//# sourceMappingURL=list-commands-responses.js.map