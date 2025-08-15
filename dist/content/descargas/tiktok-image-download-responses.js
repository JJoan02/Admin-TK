export const TIKTOK_IMAGE_NO_URL = (usedPrefix, command) => `*Ingresa un link de TikTok*\n*Ejemplo:* ${usedPrefix + command} https://vm.tiktok.com/ZMh3KL31o/`;
export const TIKTOK_IMAGE_INVALID_URL = "La URL proporcionada no parece ser una URL de TikTok válida.";
export const TIKTOK_IMAGE_API_ERROR = (status, statusText) => `La API de TikTok devolvió un error (Estado: ${status}). Intenta de nuevo más tarde.`;
export const TIKTOK_IMAGE_API_ERROR_DETAILS = (message) => `La API de TikTok devolvió un error: ${message}. Intenta de nuevo más tarde.`;
export const TIKTOK_IMAGE_NO_IMAGES_FOUND = "No se encontraron imágenes para esta URL de TikTok.";
export const TIKTOK_IMAGE_DOWNLOAD_ERROR = (message) => `Ocurrió un error al obtener las imágenes de TikTok: ${message}. Intenta de nuevo más tarde.`;
export const TIKTOK_IMAGE_CAPTION = (title) => `*Título:* ${title}`;
//# sourceMappingURL=tiktok-image-download-responses.js.map