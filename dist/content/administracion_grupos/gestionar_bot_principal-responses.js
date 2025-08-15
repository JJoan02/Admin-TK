export const SETPRIMARY_MENTION_BOT = "[✿] Por favor menciona un bot para modificar la configuración.";
export const SETPRIMARY_NOT_SUB_BOT = "[✿] El usuario mencionado no es Sub-Bot.";
export const SETPRIMARY_ALREADY_PRIMARY_V2 = (who) => `[❀] @${who.split('@')[0]} ya es el Bot principal del Grupo.`;
export const SETPRIMARY_SUCCESS_V2 = (who) => `[✿] Se ha establecido a @${who.split('@')[0]} como bot primario de este grupo.`;
export const SETPRIMARY_ERROR_V2 = "Ocurrió un error al establecer el bot primario.";
export const DELPRIMARY_NO_PRIMARY_BOT = "[✿] No hay un bot primario establecido en este grupo.";
export const DELPRIMARY_SUCCESS = (previousBot) => `[▶] @${previousBot.split('@')[0]} ha sido eliminado como bot primario del grupo.`;
export const DELPRIMARY_ERROR = "Ocurrió un error al eliminar el bot primario.";
export const SETPRIMARY_JADIBOT_USAGE = (usedPrefix) => `⚠️ Etiquetas en numero de algun bot\nEjemplo: ${usedPrefix}setprimary @tag`;
export const SETPRIMARY_JADIBOT_NOT_FOUND = "⚠️ No se encontró un bot conectado con esa mención o número. Usa #bots para ver los bots disponibles.";
export const SETPRIMARY_JADIBOT_SUCCESS = (botJid) => `✅ El bot @${botJid.split('@')[0]} ha sido establecido como primario en este grupo. Los demás bots no responderán aquí.`;
//# sourceMappingURL=gestionar_bot_principal-responses.js.map