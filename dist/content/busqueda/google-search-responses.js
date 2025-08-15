export const GOOGLE_SEARCH_NO_QUERY = (smsAvisoMG, usedPrefix, command) => `${smsAvisoMG}Por favor, ingresa lo que deseas buscar en Google.\nEjemplo: ${usedPrefix + command} GataBot-MD`;
export const GOOGLE_SEARCH_NOT_FOUND = (query) => `No se encontraron resultados para: ${query}.`;
export const GOOGLE_SEARCH_RESULTS_HEADER_NEW = (query) => `*Resultados de la búsqueda para:* ${query}\n\n`;
export const GOOGLE_SEARCH_RESULT_FORMAT = (title, url, description) => `*Título:* ${title}\n*URL:* ${url}\n*Descripción:* ${description}\n\n`;
export const GOOGLE_SEARCH_EXTERNAL_AD_REPLY_TITLE = "Resultados de Google";
export const GOOGLE_SEARCH_EXTERNAL_AD_REPLY_BODY = "Búsqueda potenciada por Admin-TK";
export const GOOGLE_SEARCH_ERROR_SEARCH = "Error al realizar la búsqueda en Google:";
export const GOOGLE_SEARCH_ERROR_GENERIC = (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}\n\n${wm}`;
//# sourceMappingURL=google-search-responses.js.map