export const YTMP4_USAGE = (usedPrefix, command) => `👉 Uso: ${usedPrefix}${command} https://youtube.com/watch?v=iQEVguV71sI`;
export const YTMP4_INVALID_URL = "🚫 Enlace de YouTube inválido";
export const YTMP4_TOO_MANY_REQUESTS = "⏳ Demasiadas solicitudes rápidas. Por favor, espera 2 minutos.";
export const YTMP4_PROCESSING_HEAVY_FILE = "⏳ Espera, estoy procesando un archivo pesado.";
export const YTMP4_SIZE_UNKNOWN = "No se pudo determinar el tamaño del video";
export const YTMP4_SIZE_LIMIT_EXCEEDED = "♡ No puedo procesar esta descarga porque traspasa el límite de descarga";
export const YTMP4_ERROR_GENERIC = (error) => `❌ Error: ${error || 'No se pudo procesar la solicitud'}`;
export const YTMP4_DOWNLOADING_MESSAGE = "🤨 Espera, estoy lidiando con un archivo pesado";
export const YTMP4_CAPTION = (title, size, url) => `*💌 ${title}*\n> ⚖️ Peso: ${size}\n> 🌎 URL: ${url}`;
export const YTMP4_MAX_FILE_SIZE = 280 * 1024 * 1024;
export const YTMP4_VIDEO_THRESHOLD = 70 * 1024 * 1024;
export const YTMP4_HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024;
export const YTMP4_REQUEST_LIMIT = 3;
export const YTMP4_REQUEST_WINDOW_MS = 10000;
export const YTMP4_COOLDOWN_MS = 120000;
//# sourceMappingURL=youtube-mp4-responses.js.map