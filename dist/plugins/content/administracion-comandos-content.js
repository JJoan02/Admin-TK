export const adminCommandsContent = {
    delete: {
        description: 'Elimina un comando personalizado. Uso: !delcmd <texto_del_comando> o respondiendo a un mensaje.',
        noHash: '🚩 Ingresa el nombre del comando o responde a un mensaje para obtener su hash.',
        locked: '🚩 No puedes borrar este comando, está bloqueado.',
        success: '🚩 Comando eliminado con éxito.',
        notFound: (hash) => `🚩 El comando ${hash} no fue encontrado o no se pudo eliminar.`,
        error: 'Ocurrió un error al intentar eliminar el comando.',
    },
    list: {
        description: 'Muestra una lista de comandos personalizados.',
        noCommands: 'No hay comandos personalizados registrados.',
        header: '*LISTA DE COMANDOS PERSONALIZADOS*',
        info: '*Info:* Si está en *negrita* está bloqueado',
        separator: '──────────────────',
        commandLine: (index, key, value) => `${index + 1}. ${value.locked ? `(bloqueado) *${key}*` : key} : ${value.text}`,
        error: 'Ocurrió un error al intentar listar los comandos.',
    },
    set: {
        description: 'Guarda un comando personalizado. Uso: Responde a un mensaje con !setcmd <nombre_del_comando>',
        noQuotedMessage: '🚩 Responde a un mensaje (sticker, imagen, video, etc.) para guardar su hash como comando.',
        noCommandName: '🚩 Ingresa el nombre del comando que deseas asignar.',
        locked: '🚩 No tienes permiso para cambiar este comando, está bloqueado.',
        success: (commandName) => `🚩 Comando '${commandName}' guardado con éxito.`,
        error: 'Ocurrió un error al intentar guardar el comando.',
    },
};
//# sourceMappingURL=administracion-comandos-content.js.map