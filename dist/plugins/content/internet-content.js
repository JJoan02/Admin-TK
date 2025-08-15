export const googleSearchMessages = {
    noText: '🍟 Ingresa lo que deseas buscar en Google.',
    processing: '🚩 Buscando Su Información...',
    resultHeader: (text) => `🍟 *Resultado de* : ${text}\n\n`,
    resultItem: (title, snippet, link) => `🐢 *Titulo ∙* ${title}\n🚩 *Info ∙* ${snippet}\n🔗 *Url ∙* ${link}\n\n`,
};
export const mercadoLibreSearchMessages = {
    invalidFormat: (usedPrefix, command) => `🚩 *Formato incorrecto*\n*Ejemplo:*\n\n${usedPrefix + command} TV Pantalla plana`,
    header: "`🚩 M E R C A D O - L I B R E 🚩`\n\n",
    item: (title, state, link) => `*• Nombre:* ${title}\n*• Estado:* ${state}\n*• Link:* ${link}\n`,
    separator: '\n' + '••••••••••••••••••••••••' + '\n',
};
export const npmSearchMessages = {
    noText: (usedPrefix, command) => `🚩 Escribe el nombre del scraper.\nEjemplo: ${usedPrefix + command} yt-search`,
    processing: '🚩 Buscando el scraper....',
    noResult: (text) => `『✦』 No se encontró resultado de: ${text}`,
    resultHeader: '《✧》 𝖲craper - Admin-TK 《✧》\n\n',
    resultItem: (name, version, link, description) => `✦ 𝐍𝐨𝐦𝐛𝐫𝐞: ${name}\n✦ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: V${version}\n✦ 𝐄𝐧𝐥𝐚𝐜𝐞: ${link}\n✦ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧: ${description}\n\n\n----------`,
    error: '🌱 Ocurrió un error',
};
//# sourceMappingURL=internet-content.js.map