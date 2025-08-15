export const WIKIPEDIA_SEARCH_NO_TEXT = (smsAvisoMG, smsMalused, usedPrefix, command) => `${smsAvisoMG}${smsMalused}\n*${usedPrefix + command} Universe*`;
export const WIKIPEDIA_SEARCH_RESULTS_HEADER = (midBuscador9) => `${midBuscador9}\n\n`;
export const WIKIPEDIA_SEARCH_ERROR_REPORT = (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}\n\n${wm}`;
export const WIKIPEDIA_SEARCH_ERROR_MESSAGE = "*Ocurrió un error al buscar en Wikipedia.*";
//# sourceMappingURL=wikipedia-search-responses.js.map