export const APK_DOWNLOAD_NO_TEXT = (usedPrefix, command) => `Por favor, proporciona el nombre de la aplicación que deseas buscar.\nEjemplo: ${usedPrefix + command} WhatsApp`;
export const APK_DOWNLOAD_INFO = (name, size, lastUpdate, packe) => `
   *Nombre* : ⇢ ${name} 📛
   *Tamaño* : ⇢ ${size} ⚖️
   *Package* : ⇢ ${packe} 📦
   *Actualizado* : ⇢ ${lastUpdate} 🗓️
    `;
export const APK_DOWNLOAD_ERROR = (error) => `Error al descargar el APK: ${error}`;
//# sourceMappingURL=apk-download-responses.js.map