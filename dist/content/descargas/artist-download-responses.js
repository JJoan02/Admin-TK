export const ARTIST_DOWNLOAD_ALREADY_DOWNLOADING = "⚠️ ¡Ya hay una descarga en curso! No interrumpas el proceso.";
export const ARTIST_DOWNLOAD_NO_ARTIST_NAME = (usedPrefix) => `⚠️ *¡Atención!*\n\n💡 Debes proporcionar el nombre del artista.\n📌 Ejemplo: ${usedPrefix}artista TWICE`;
export const ARTIST_DOWNLOAD_STARTING = "🔔 *Iniciando descarga de música por artista.*\n\n⏳ Por favor, no interrumpas el proceso.";
export const ARTIST_DOWNLOAD_NO_RESULTS = "⚠️ No se encontraron resultados para ese artista.";
export const ARTIST_DOWNLOAD_SEARCH_ERROR = (error) => `❌ *Error al buscar música:* ${error}`;
export const ARTIST_DOWNLOAD_TRACK_CAPTION = (title, artist, album) => `🎶 *${title}*\n👤 *Artista:* ${artist}\n💽 *Álbum:* ${album || "Desconocido"}`;
export const ARTIST_DOWNLOAD_SUCCESS = "✅ *Descargas Finalizadas Exitosamente.*";
export const ARTIST_DOWNLOAD_ERROR_DOWNLOAD_TRACK = "No se pudo obtener el enlace de descarga.";
export const ARTIST_DOWNLOAD_ERROR_FETCH_AUDIO = (status) => `No se pudo descargar el audio. Código: ${status}`;
//# sourceMappingURL=artist-download-responses.js.map