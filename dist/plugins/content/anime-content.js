export const animeContent = {
    animeImages: {
        description: 'Obtiene imágenes de anime de diferentes personajes o temas. Uso: !<personaje>',
        carouselTitle: (command) => `🚩 Resultado de ${command}`,
        carouselBody: (command) => `🔎 Anime - ${command}`,
        error: (command) => `Ocurrió un error al intentar obtener imágenes de anime para ${command}.`,
        messiImageCaption: '*Messi*',
        ronaldoImageCaption: '*CR7*',
    },
    animeInfo: {
        description: 'Obtiene información sobre un anime o manga. Uso: !infoanime <nombre del anime>',
        noText: (smsAvisoMG, smsMalused2) => `${smsAvisoMG} ${smsMalused2}`,
        notFound: (text) => `No se encontró información para \"${text}\".`,
        infoTemplate: (smsYT1, title, buscador2, episodes, buscador3, source, buscador4, airedFrom, buscador5, popularity, buscador6, favorites, smsYT5, duration, buscador7, rating, buscador8, trailerUrl, smsYT4, url) => ` ${smsYT1}
❣ ${title}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈   
 ${buscador2}
❣ ${episodes}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${buscador3}
❣ ${source.toUpperCase()}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${buscador4}
❣ ${airedFrom}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${buscador5}
❣ ${popularity}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${buscador6}
❣ ${favorites}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${smsYT5}
❣ ${duration}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${buscador7}
❣ ${rating}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${buscador8}
❣ ${trailerUrl}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
 ${smsYT4}
❣ ${url}`,
        menuButton1: '𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖𝙨 | 𝙎𝙚𝙖𝙧𝙘𝙝𝙚𝙨 🔎',
        menuButton2: '𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨',
        menuButton3: '𝙋𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️',
        error: (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}\n\n${wm}`,
    },
    animeLinks: {
        description: 'Muestra una lista de enlaces relacionados con el anime.',
        links: ` 
━━━━━━━━━━━━━━━━━━━━┅
│                   *「 ANIME」*       
├━━━━━━━━━━━━━━━━━━━━┅
│ │ │ https://kusonime.com
│ │ │ https://huntersekaisub.blogspot.com
│ │ │ https://riie.jp
│ │ │ https://m.meownime.ai
│ │ │ https://nimegami.id
│ │ │ https://nontonanimeid.top
│ │ │ https://kazefuri.vip
│ │ │ https://pendekarsubs.us
│ │ │ https://myanimelist.net
└━━━━━━━━━━━━━━━━━━━━┅
 `,
        error: 'Ocurrió un error al intentar enviar los enlaces de anime.',
    },
    lolice: {
        description: 'Genera una imagen \"lolice\" con la foto de perfil de un usuario. Uso: !lolice @mencion o respondiendo a un mensaje.',
        imageCaption: '🍟 *L O L I C E* 🍟',
        error: 'Ocurrió un error al intentar generar la imagen lolice.',
    },
    waifu: {
        description: 'Obtiene una imagen aleatoria de waifu.',
        searching: '🍟 Buscando Su *Waifu*',
        fetchError: 'Ocurrió un fallo al obtener la waifu.',
        noUrl: 'No se pudo obtener la URL de la waifu.',
        imageCaption: '《✧》 *W A I F U* 《✧》',
        error: 'Ocurrió un error al intentar obtener la waifu.',
    },
};
//# sourceMappingURL=anime-content.js.map