export const TIKTOK_MP3_NO_URL = (usedPrefix, command) => `🎩 Ingrese una URL de TikTok\n*Ejemplo:* ${usedPrefix + command} https://vm.tiktok.com/ZMh3KL31o/`;
export const TIKTOK_MP3_INVALID_URL = "❌ La URL proporcionada no parece ser una URL de TikTok válida.";
export const TIKTOK_MP3_API_ERROR = (status, statusText) => `❌ La API de TikTok devolvió un error (Estado: ${status}). Intenta de nuevo más tarde.`;
export const TIKTOK_MP3_API_ERROR_DETAILS = (message) => `❌ La API de TikTok devolvió un error: ${message}. Intenta de nuevo más tarde.`;
export const TIKTOK_MP3_NO_AUDIO_FOUND = "❌ No se encontró el audio para esta URL de TikTok. La API no devolvió el campo de audio esperado.";
export const TIKTOK_MP3_DOWNLOAD_ERROR = (message) => `❌ Ocurrió un error al obtener el audio de TikTok: ${message}. Intenta de nuevo más tarde.`;
//# sourceMappingURL=tiktok-mp3-responses.js.map