export const DEMOTE_GROUP_ONLY = "Este comando solo puede ser usado en grupos!";
export const DEMOTE_BOT_NOT_ADMIN = "❌ Error: Por favor, haz que el bot sea administrador primero para usar este comando.";
export const DEMOTE_SENDER_NOT_ADMIN = "❌ Error: Solo los administradores del grupo pueden usar el comando demote.";
export const DEMOTE_ERROR_ADMIN_CHECK = "❌ Error: Asegúrate de que el bot sea administrador de este grupo.";
export const DEMOTE_NO_TARGET = "❌ Error: ¡Menciona al usuario o responde a su mensaje para degradarlo!";
export const DEMOTE_FAILED = "❌ Falló la degradación del usuario(s). Asegúrate de que el bot sea administrador y tenga los permisos suficientes.";
export const DEMOTE_RATE_LIMIT = "❌ Límite de velocidad alcanzado. Inténtalo de nuevo en unos segundos.";
export const DEMOTE_MESSAGE_HEADER = "*『 DEGRADACIÓN DE GRUPO 』*";
export const DEMOTE_MESSAGE_USER = (count) => `👤 *Usuario${count > 1 ? 's' : ''} degradado${count > 1 ? 's' : ''}:*`;
export const DEMOTE_MESSAGE_BY = (promoter) => `👑 *Degradado Por:* ${promoter}`;
export const DEMOTE_MESSAGE_DATE = (date) => `📅 *Fecha:* ${date}`;
//# sourceMappingURL=demote-responses.js.map