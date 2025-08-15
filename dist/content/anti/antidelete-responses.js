export const ANTIDELETE_OWNER_ONLY = "*Solo el propietario del bot puede usar este comando.*";
export const ANTIDELETE_SETUP_MESSAGE = (status) => `*ANTIDELETE SETUP*\n\nCurrent Status: ${status}\n\n*.antidelete on* - Enable\n*.antidelete off* - Disable`;
export const ANTIDELETE_INVALID_COMMAND = "*Comando inválido. Usa .antidelete para ver el uso.*";
export const ANTIDELETE_ENABLED_SUCCESS = (status) => `*Antidelete ${status}*`;
export const ANTIDELETE_REPORT_HEADER = "*🔰 ANTIDELETE REPORT 🔰*\n\n";
export const ANTIDELETE_REPORT_DELETED_BY = (user) => `*🗑️ Eliminado Por:* @${user}\n`;
export const ANTIDELETE_REPORT_SENDER = (user) => `*👤 Remitente:* @${user}\n`;
export const ANTIDELETE_REPORT_NUMBER = (number) => `*📱 Número:* ${number}\n`;
export const ANTIDELETE_REPORT_TIME = (time) => `*🕒 Hora:* ${time}\n`;
export const ANTIDELETE_REPORT_GROUP = (group) => `*👥 Grupo:* ${group}\n`;
export const ANTIDELETE_REPORT_MESSAGE = (message) => `\n*💬 Mensaje Eliminado:*
${message}`;
export const ANTIDELETE_REPORT_MEDIA_CAPTION = (type, user) => `*Eliminado ${type}*\nDe: @${user}`;
export const ANTIDELETE_REPORT_MEDIA_ERROR = (error) => `⚠️ Error al enviar medios: ${error}`;
//# sourceMappingURL=antidelete-responses.js.map