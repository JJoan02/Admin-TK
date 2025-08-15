export const jadibotConnectMessages = {
    qrCode: (botName) => `Escanea este código QR para conectar tu ${botName} Sub-Bot.`,
    code: (botName) => `Usa este código para conectar tu ${botName} Sub-Bot.`,
    reconnecting: (subBotName, attempts, maxAttempts) => `Reconectando Sub-Bot ${subBotName}... Intento ${attempts}/${maxAttempts}.`,
    reconnectionLimitReached: (subBotName) => `Límite de reconexiones alcanzado para ${subBotName}.`,
    sessionReplaced: 'Tu sesión fue reemplazada por otra. Por favor, vuelve a conectar.',
    sessionPending: 'Tu sesión ha sido cerrada o las credenciales no son válidas. Por favor, vuelve a conectar.',
    connectionLost: 'Conexión perdida con el Sub-Bot. Borrando datos...',
    success: 'Sub-Bot conectado exitosamente!',
    newSubBotFound: (userName) => `¡Nuevo Sub-Bot conectado: ${userName}!`,
    importantInfo: (usedPrefix) => `
*Información Importante:*
- Para detener el Sub-Bot: ${usedPrefix}stop
- Para eliminar la sesión: ${usedPrefix}eliminarsesion
- Para obtener un nuevo QR: ${usedPrefix}jadibot
`,
};
//# sourceMappingURL=jadibot-content.js.map