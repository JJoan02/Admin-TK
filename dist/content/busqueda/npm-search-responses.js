export const NPM_SEARCH_NO_TEXT = (usedPrefix, command) => `🚩 Escribe el nombre del scraper.\nEjemplo: ${usedPrefix + command} yt-search`;
export const NPM_SEARCH_SEARCHING_MESSAGE = "🚩 Buscando el scraper....";
export const NPM_SEARCH_NO_RESULTS = (text) => `『✦』 No se encontró resultado de: ${text}`;
export const NPM_SEARCH_RESULT_HEADER = "《✧》 𝖲craper - Genesis 《✧》\n\n";
export const NPM_SEARCH_RESULT_ITEM = (pkg) => `✦ 𝐍𝐨𝐦𝐛𝐫𝐞: ${pkg.name}\n✦ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: V${pkg.version}\n✦ 𝐄𝐧𝐥𝐚𝐜𝐞: ${pkg.links.npm}\n✦ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧: ${pkg.description}\n\n----------`;
export const NPM_SEARCH_ERROR = "🌱 Ocurrió un error";
//# sourceMappingURL=npm-search-responses.js.map