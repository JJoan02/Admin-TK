export const instagramStalkMessages = {
    noUsername: (usedPrefix, command) => `${global.lenguajeTK.smsAvisoMG()}${global.mid.smsInsta2}\n*${usedPrefix + command} JJoan02*`,
    noProfileFound: (username) => `No se encontró información de perfil para \"${username}\".`,
    profileInfo: (profileData) => `┃ 𓃠 *${global.gt} ${global.vs}*\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n┃ ${global.mid.user}\n┃ ${profileData.username}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ ${global.mid.name}\n┃ ${profileData.full_name}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ ${global.mid.smsinsta4} \n┃ ${profileData.biography}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ *VERIFICADO*: \n┃ ${profileData.verified ? 'Sí' : 'No'}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ *CUENTA PRIVADA*: \n┃ ${profileData.private ? 'Sí' : 'No'}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ ${global.mid.smsinsta1}\n┃ ${profileData.followers}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ ${global.mid.smsinsta2}\n┃ ${profileData.following}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ \n┃ ${global.mid.smsinsta3} \n┃ ${profileData.posts}\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ *URL*: \n┃ ${profileData.url}`,
    errorGeneral: (usedPrefix, command) => `${global.lenguajeTK.smsMalError3()}#report ${global.lenguajeTK.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`,
    downloadError: `No se pudo descargar el contenido de Instagram. Inténtalo de nuevo más tarde.`,
    processError: `Ocurrió un error al enviar el video o al procesar la solicitud.`
};
export const tiktokMessages = {
    usage: (usedPrefix, command) => `Usa el formato: ${usedPrefix + command} <enlace de TikTok> o ${usedPrefix}tiktokvid <texto de búsqueda>`,
    noDownload: `No se pudo descargar el contenido de TikTok. Asegúrate de que el enlace sea válido e inténtalo nuevamente.`,
    noVideoNoWatermark: `No se pudo obtener el video sin marca de agua.`,
    errorProcessing: `Ocurrió un error al procesar la solicitud. Asegúrate de que el enlace de TikTok sea válido e inténtalo nuevamente.`,
    noSearchResults: (query) => `No se encontraron videos para "${query}".`,
    errorSearching: `Ocurrió un error al buscar videos de TikTok.`
};
export const apkDownload = {
    noText: (usedPrefix, command) => `Ingresa el nombre de la aplicación que quieres descargar. *Ejemplo:*
${usedPrefix + command} Clash Royale`,
    downloading: 'Su aplicación se enviará en un momento...',
    name: '*Nombre*',
    size: '*Tamaño*',
    package: '*Package*',
    lastUpdate: '*Actualizado*',
};
export const spotifyDownload = {
    noText: (usedPrefix, command) => `╭─⬣「 *Barboza AI* 」⬣\n│ ≡◦ 🎧 *Uso correcto del comando:*\n│ ≡◦ ${usedPrefix + command} shakira soltera\n╰─⬣\n> © Barboza AI`,
    notFound: (text) => `╭─⬣「 *Barboza AI* 」⬣\n│ ≡◦ ❌ *No se encontró resultado para:* ${text}\n╰─⬣`,
    title: '*MÚSICA SPOTIFY*',
    artist: '*Artista*',
    duration: '*Duración*',
    spotifyLink: '*Spotify*',
    errorProcessing: `╭─⬣「 *Barboza AI* 」⬣\n│ ≡◦ ⚠️ *Error al procesar la solicitud.*\n│ ≡◦ Intenta nuevamente más tarde.\n╰─⬣`,
};
//# sourceMappingURL=descargas-content.js.map