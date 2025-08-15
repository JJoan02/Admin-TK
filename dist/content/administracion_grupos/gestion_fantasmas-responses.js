export const GHOST_MANAGEMENT_DESCRIPTION = "Gestiona miembros inactivos (fantasmas) en el grupo.";
export const GHOST_MANAGEMENT_NO_GHOSTS = "🎌 *Este grupo es activo, no tiene fantasmas*";
export const GHOST_MANAGEMENT_GHOST_LIST = (ghostList) => `🚩 *Revisión de inactivos*\n\n⚠️ *Lista de fantasmas*\n${ghostList}\n\n*📝 NOTA:*
Esto no es al 100% acertado, el bot inicia el conteo de mensajes a partir de que se active en este número`;
export const GHOST_MANAGEMENT_KICK_GHOST_LIST = (ghostList) => `🚩 *Eliminación de inactivos*\n\n⚠️ *Lista de fantasmas*\n${ghostList}\n\n❗ _El bot eliminará a los usuarios de la lista mencionada cada 10 segundos_`;
export const GHOST_MANAGEMENT_KICK_WARNING = (userJid) => `Advertencia: No se pudo eliminar al usuario ${userJid}.`;
//# sourceMappingURL=gestion_fantasmas-responses.js.map