export const YOUTUBE_SEARCH_NO_TEXT = (usedPrefix, command) => `Uso: ${usedPrefix + command} <término de búsqueda>\nEjemplo: ${usedPrefix + command} Nio Garcia Infinitamente remix`;
export const YOUTUBE_SEARCH_SEARCHING = (query) => `Buscando en YouTube por: ${query}`;
export const YOUTUBE_SEARCH_NO_RESULTS = "No se encontraron resultados en YouTube.";
export const YOUTUBE_SEARCH_VIDEO_HEADER = "⌘━─━─≪𓄂*Barboza*𝄢─━─━⌘\n\n";
export const YOUTUBE_SEARCH_VIDEO_TITLE = (title) => `➷ Título: ${title}\n`;
export const YOUTUBE_SEARCH_VIDEO_DURATION = (duration) => `➷ Duración: ${duration}\n`;
export const YOUTUBE_SEARCH_DOWNLOAD_INSTRUCTIONS = "SI QUIERES DESCARGAR AUDIO/VIDEO USA LOS COMANDOS MAS LA URL DEL VIDEO\n";
export const YOUTUBE_SEARCH_DOWNLOAD_AUDIO_COMMAND = (url) => `.ytmp3+ ${url} Audio\n`;
export const YOUTUBE_SEARCH_DOWNLOAD_VIDEO_COMMAND = (url) => `.ytmp4+ ${url} Video\n\n`;
export const YOUTUBE_SEARCH_FOOTER = "> © Prohibido la copia, Código Oficial de Barboza MD™";
export const YOUTUBE_SEARCH_ERROR = (error) => `🚨 *Error:* ${error}`;
//# sourceMappingURL=youtube-search-responses.js.map