export const cmdMessages = {
    noHashProvided: '🚩 Ingresa el nombre del comando.',
    cannotDeleteLocked: '🚩 No puedes borrar este comando.',
    commandDeleted: '🚩 Comando eliminado con éxito.',
    commandListHeader: '*LISTA DE  COMANDOS*',
    commandListInfo: '*Info:* Si esta en *negrita*  esta bloqueado',
    commandListItem: (index, locked, key, text) => `${index}. ${locked ? `(bloqueado) ${key}` : key} : ${text}`,
    replyToMessage: '🚩 Responde a un mensaje.',
    noFileSha256: '🚩 Responde a un mensaje con un archivo (sticker, imagen, etc.) para obtener su hash.',
    enterCommandName: '🚩 Ingresa el nombre del comando.',
    cannotChangeLocked: '🚩 No tienes permiso para cambiar este comando de Sticker.',
    commandSaved: '🚩 Comando guardado con exito.',
};
//# sourceMappingURL=cmd-content.js.map