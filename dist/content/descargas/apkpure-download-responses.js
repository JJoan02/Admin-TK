export const APKPURE_NO_TEXT = (smsAvisoMG, smsApk) => `${smsAvisoMG} ${smsApk}`;
export const APKPURE_NO_RESULTS = (query) => `No se encontraron resultados en Apkpure para "${query}".`;
export const APKPURE_NO_DOWNLOAD_LINK = (query) => `No se pudo obtener el enlace de descarga para "${query}".`;
export const APKPURE_INFO_HEADER = (eg) => `${eg}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`;
export const APKPURE_INFO_NAME = (name) => `┃💫 Nombre: ${name}`;
export const APKPURE_INFO_PACKAGE = (packe) => `┃📦 PACKAGE: ${packe}`;
export const APKPURE_INFO_LAST_UPDATE = (smsApk2, lastup) => `┃🕒 ${smsApk2}: ${lastup}`;
export const APKPURE_INFO_SIZE = (smsYT11, size) => `┃💪 ${smsYT11} ${size}`;
export const APKPURE_INFO_FOOTER = (smsApk3) => `┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ ${smsApk3} 🚀🚀🚀`;
export const APKPURE_SIZE_LIMIT_EXCEEDED = (smsApk4) => `${smsApk4}`;
export const APKPURE_ERROR_REPORT = (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}\n\n${wm}`;
//# sourceMappingURL=apkpure-download-responses.js.map