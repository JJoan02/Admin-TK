export const ANIMEFLV_DOWNLOAD_USAGE = (usedPrefix, command) => `❗ *Uso incorrecto del comando.*

✨ *Formato correcto:* ${usedPrefix + command} <anime-id> <episodio>
🎉 *Ejemplo:* ${usedPrefix + command} to-love-ru-ova 1`;
export const ANIMEFLV_DOWNLOAD_API_ERROR = "⚠️ *Error al obtener datos de la API de AnimeFLV.*";
export const ANIMEFLV_DOWNLOAD_MEGA_LINK_UNAVAILABLE = "⚠️ *Enlace de descarga de Mega no disponible para este episodio.*";
export const ANIMEFLV_DOWNLOAD_FILE_SIZE_EXCEEDED = (limit) => `⚠️ *El archivo supera el límite de ${limit} MB y no puede ser enviado directamente.*`;
export const ANIMEFLV_DOWNLOAD_STARTING = (fileName) => `🌩️ Descargando ${fileName}... Por favor, espera.`;
export const ANIMEFLV_DOWNLOAD_CAPTION = (fileName, fileSize) => `✨✨✨✨ *Descarga de AnimeFLV* ✨✨✨✨

🎬 *Nombre:* ${fileName}
📂 *Tamaño:* ${fileSize}

🚀 *Cargando...*`;
export const ANIMEFLV_DOWNLOAD_SENDING = (fileName) => `✨ *Descargando ${fileName}...* ✨`;
export const ANIMEFLV_DOWNLOAD_ERROR_GENERIC = (error) => `⚠️ *Error:* ${error}`;
export const ANIMEFLV_DOWNLOAD_MAX_FILE_SIZE_MB = 300;
//# sourceMappingURL=animeflv-download-responses.js.map