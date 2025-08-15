export const ANTI_LINK_GROUP_REGEX = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
export const ANTI_LINK_CHANNEL_REGEX = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;
export const ANTI_LINK_ADMIN_BYPASS = "🚩 El antilink está activo pero te salvaste por ser adm.";
export const ANTI_LINK_DETECTED_MESSAGE = (user) => `*「 ANTILINK DETECTADO 」*\n\n${user} Rompiste las reglas del Grupo serás eliminado...`;
export const ANTI_LINK_BOT_NOT_ADMIN = (listAdmin) => `🚩 El antilink está activo pero no puedo eliminarte porque no soy adm.`;
//# sourceMappingURL=anti-link-group-responses.js.map