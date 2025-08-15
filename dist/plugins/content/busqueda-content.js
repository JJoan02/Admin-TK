export const busquedaContent = {
    animeFLVSearch: {
        description: 'Busca anime en AnimeFLV. Uso: !animeflv <nombre del anime>',
        noText: '「 Ingresa el nombre del anime que deseas buscar 」',
        notFound: '❝ No se encontraron animes con ese nombre ❞',
        resultTitle: (animeTitle) => `✦ *Titulo*: ${animeTitle}`,
        resultScore: (animeScore) => `⭒ Puntuación: ${animeScore}`,
        resultScoreUnavailable: '⭒ Puntuación: No disponible',
        resultId: (animeId) => `➤ *ID*: ${animeId}`,
        carouselBody: (text) => `「 Resultados para: ${text} 」`,
        carouselFooter: '❝ Hemos encontrado los siguientes resultados ❞\n\n✧ Creado por Admin-TK',
        error: (e) => `「 Error: ${e.message} 」`,
        errorSearch: 'Error al buscar en AnimeFLV:',
    },
    appleMusicSearch: {
        description: 'Busca música en Apple Music. Uso: !applemusicsearch <nombre de la canción>',
        noText: (usedPrefix, command) => `Ejemplo de uso: ${usedPrefix + command} <Nombre de la canción>`,
        notFound: (text) => `No se encontraron resultados en Apple Music para "${text}".`,
        resultFormat: (index, title, link) => `${index + 1}. *${title}*\n   Link: ${link}`,
        error: 'Ocurrió un error al intentar buscar en Apple Music.',
        errorSearch: 'Error al buscar en Apple Music:',
        appleMusicSearchError: 'Error en búsqueda de Apple Music:',
    },
    dafontSearch: {
        description: 'Busca y descarga fuentes de Dafont.com. Uso: !dafont <nombre de la fuente> o !dafont download <url de la fuente>',
        usageError: (usedPrefix) => `Uso incorrecto. 
Para buscar: *${usedPrefix}dafont <nombre de la fuente>*
Para descargar: *${usedPrefix}dafont download <url de la fuente>*
`,
        noQuery: '`¿Nombre de la fuente?`',
        searchResults: (query, results) => `*🔍 Resultados de búsqueda para* "- ${query}":\n\n${results}`,
        invalidUrl: '¡URL inválida! Asegúrate de usar un enlace válido de Dafont.',
        urlInaccessible: '¡URL inaccesible!',
        noDownloadLink: '¡No se encontró el enlace de descarga!',
        zipFailed: '¡Archivo ZIP fallido!',
        fontSent: 'Fuente enviada con éxito.',
        noFontsFound: 'No se encontraron fuentes.',
        errorSearch: 'Error al buscar en Dafont:',
        errorDownload: 'Error al descargar fuente de Dafont:',
        errorGetDownloadUrl: 'Error al obtener la URL de descarga.',
        errorDownloadFont: 'Error al descargar la fuente.',
        errorSendFont: 'Error al enviar la fuente.',
    },
    driveFolderSearch: {
        description: 'Extrae enlaces de archivos y subcarpetas de una URL de Google Drive Folder. Uso: !drivefolder <url>',
        noUrl: (smsAvisoMG) => `${smsAvisoMG} Ingrese una Url de un folder de Drive`,
        invalidUrl: (smsAvisoMG) => `${smsAvisoMG} La url ingresada no es válida.`,
        notFound: 'No se encontraron archivos o carpetas en la URL proporcionada.',
        sendingLinks: 'Enviando enlaces de archivos y subcarpetas',
        error: 'Ocurrió un error inesperado o la url no es de un folder válido.',
        errorSearch: 'Error al buscar en GitHub:',
    },
    gitHubSearch: {
        description: 'Busca repositorios en GitHub. Uso: !githubsearch <nombre del repositorio>',
        noText: (usedPrefix, command) => `🚩 *Ingrese el nombre de un repositorio de github*\n\nEjemplo, ${usedPrefix + command} Admin-TK`,
        notFound: (text) => `🚩 *No se encontró resultados de:* ${text}`,
        resultFormat: (index, repo) => `\n🍟 *Resultado:* ${1 + index}\n🔗 *Enlace:* ${repo.html_url}\n👑 *Creador:* ${repo.owner.login}\n🍟 *Nombre:* ${repo.name}\n🫂 *Creado:* ${repo.created_at}\n💥 *Actualizado:* ${repo.updated_at}\n👀 *Visitas:* ${repo.watchers}\n✨️ *Bifurcado:* ${repo.forks}\n🌟 *Estrellas:* ${repo.stargazers_count}\n🍂 *Issues:* ${repo.open_issues}\n🍭 *Descripción:* ${repo.description ? `${repo.description}` : 'Sin Descripción'}\n⭐️ *Clone:* ${repo.clone_url}\n`,
        carouselTitle: '🍟 G I T H U B - S E A R C H 🍟',
        error: 'Ocurrió un error al intentar buscar en GitHub.',
        errorSearch: 'Error al buscar en GitHub:',
    },
    googleSearch: {
        gitHubSearch: {
            description: 'Busca repositorios en GitHub. Uso: !githubsearch <nombre del repositorio>',
            noText: (usedPrefix, command) => `🚩 *Ingrese el nombre de un repositorio de github*

Ejemplo, ${usedPrefix + command} Admin-TK`,
            notFound: (text) => `🚩 *No se encontró resultados de:* ${text}`,
            resultFormat: (index, repo) => `
🍟 *Resultado:* ${1 + index}
🔗 *Enlace:* ${repo.html_url}
👑 *Creador:* ${repo.owner.login}
🍟 *Nombre:* ${repo.name}
🫂 *Creado:* ${repo.created_at}
💥 *Actualizado:* ${repo.updated_at}
👀 *Visitas:* ${repo.watchers}
✨️ *Bifurcado:* ${repo.forks}
🌟 *Estrellas:* ${repo.stargazers_count}
🍂 *Issues:* ${repo.open_issues}
🍭 *Descripción:* ${repo.description ? `${repo.description}` : 'Sin Descripción'}
⭐️ *Clone:* ${repo.clone_url}
`,
            carouselTitle: '🍟 G I T H U B - S E A R C H 🍟',
            error: 'Ocurrió un error al intentar buscar en GitHub.',
            errorSearch: 'Error al buscar en GitHub:',
        },
        googleSearch: {
            description: 'Realiza una búsqueda en Google. Uso: !google <consulta>',
            noQuery: (smsAvisoMG, usedPrefix, command) => `${smsAvisoMG} ESCRIBA LO QUE QUIERE BUSCAR
EJEMPLO
*${usedPrefix + command} Cat*`,
            notFound: (query) => `No se encontraron resultados para "${query}".`,
            resultsHeader: (query) => `🔍 ${global.AdminTK_mid.buscador9} ${query}`,
            resultFormat: (title, url, description) => `*${title}*
_${url}_
_${description}_

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

`,
            externalAdReplyTitle: 'Admin-TK | Google',
            externalAdReplyBody: '𝗦𝘂𝗽𝗲𝗿 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗕𝗼𝘁 🐱❤️',
            error: (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}

${wm}`,
            errorSearch: 'Error al realizar búsqueda en Google:',
        },
        lyrics: {
            description: 'Busca letras de canciones. Uso: !lyrics <nombre de la canción>',
            noQuery: (smsAvisoMG, smsMalused3, usedPrefix, command) => `${smsAvisoMG}${smsMalused3}
*${usedPrefix + command} Billie Eilish bored*`,
            caption: (smsYT1, title, smsYT2, artist, smsYT3, lyrics) => `ღ ${smsYT1} :
💚 *${title || ''}*

ღ ${smsYT2} :
💜 *${artist || ''}*

ღ ${smsYT3} :
${lyrics || ''}`,
            downloadButton: '𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 | 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙 🚀',
            searchMenuButton: '𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖𝙨 | 𝙎𝙚𝙖𝙧𝙘𝙝𝙚𝙨 🔎',
            backToMenuButton: '𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚ను́ | 𝘽𝙖𝙘𝙠 𝙩o 𝙈𝙚𝙣𝙪 ☘️',
            error: (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}

${wm}`,
            errorSearch: 'Error al buscar letras:',
        },
        mangaDexSearch: {
            description: 'Busca manga en MangaDex. Uso: !mangadex <idioma> | <nombre del manga>',
            noText: '🚩 Por favor, ingresa el nombre del manga que deseas buscar.',
            notFound: '🚩 No se encontraron mangas con ese nombre.',
            resultTitle: (mangaTitle) => `📖 **Título**: ${mangaTitle}`,
            resultId: (mangaId) => `🆔 **ID**: ${mangaId}`,
            carouselBody: (mangaName) => `Resultados para: ${mangaName}`,
            carouselFooter: '✨🌌 ¡Explora el mundo del manga! 🌌✨\n\n✧ Creado por Admin-TK',
            copyIdButton: 'Copiar ID',
            error: (e) => `🚩 Error: ${e.message}`,
            errorSearch: 'Error al buscar en MangaDex:',
        },
        movieSearch: {
            description: 'Busca películas en Cuevana3 y PelisplusHD. Uso: !peliculas <nombre de la película>',
            noText: (smsAvisoMG, smsMalused7, usedPrefix, command) => `${smsAvisoMG} ${smsMalused7}
${usedPrefix + command} El Gato con botas`,
            notFound: (smsAvisoFG, buscador10) => `${smsAvisoFG}${buscador10}`,
            resultFormat: (smsYT1, title, smsYT4, link) => `*🎬 • ${smsYT1}:* ${title}
*🍿 • ${smsYT4}:* ${link}`,
            ads: (buscador11) => `*💫 • ${buscador11}*
https://block-this.com/block-this-latest.apk

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

`,
            error: 'Ocurrió un error al buscar películas.',
            errorSearch: 'Error al buscar películas:',
        },
        spotifySearch: {
            description: 'Busca canciones en Spotify o descarga desde un enlace. Uso: !spotifysearch <nombre> o !spotify <url>',
            noText: (smsAvisoMG, usedPrefix, command) => `${smsAvisoMG}INGRESE EL NOMBRE DE ALGUN ARTISTA DE SPOTIFY O UN ENLACE DE CANCIÓN/ÁLBUM/PLAYLIST
EJEMPLO:
${usedPrefix + command} tini o ${usedPrefix}spotify https://open.spotify.com/track/...`,
            notFound: (query) => `No se encontraron resultados en Spotify para "${query}".`,
            trackInfo: (track) => `◦ *Título:* ${track.title} 
◦ *Artistas:* ${track.artist} 
◦ *Duración:* ${track.duration} 
◦ *Popularidad:* ${track.popularity} 
◦ *Fecha:* ${track.publish}`,
            downloadButton: '🎧 ¡Descargar Audio! 🎧',
            carouselBody: (query) => `*` + '`' + `Resultados de:` + '`' + `* ${query}`,
            carouselFooter: '_`ꜱ` `ᴘ` `-` `ꜱ` `ᴇ` `ᴀ` `ʀ` `ᴄ` `ʜ`_`,,
            noAudioFile: 'No se pudo obtener el archivo de audio de Spotify.',
            songInfo: (title, quality, duration) => `- *Titulo :* ${title}
- *Calidad :* ${quality}
- *Duracion :* ${duration}`,
            noAlbum: 'No se pudo descargar el álbum de Spotify.',
            albumInfo: (title, artists, releaseDate, totalTracks) => `*乂  S P O T I F Y  -  D O W N L O A D*

	✩  *Album* : ${title}
	✩   *Artista* :${artists}
	✩   *Publicado* : ${releaseDate}
	✩   *Tracks totales* : ${totalTracks}

*- ↻ Los audios se estan enviando espera un momento, soy lenta. . .*
`,
            noPlaylist: 'No se pudo descargar la playlist de Spotify.',
            playlistInfo: (name, totalTracks) => `*乂  S P O T I F Y  -  D O W N L O A D*

	✩   *Playlist* : ${name}
	✩   *Tracks totales* : ${totalTracks}

*- ↻ Los audios se estan enviando espera un momento, soy lenta. . .*
`,
            error: (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}

${wm}`,
            errorGeneral: 'Error general en SpotifyCommand:',
            errorDownloadTrack: 'Error al descargar el archivo de audio de Spotify:',
            errorDownloadAlbum: 'Error al descargar el álbum de Spotify:',
            errorDownloadPlaylist: 'Error al descargar la playlist de Spotify:',
        },
        tiktokSearch: {
            description: 'Busca videos en TikTok. Uso: !tiktoksearch <consulta>',
            noText: (usedPrefix, command) => `🚩 Ingresa el nombre video que deseas buscar en TikTok.

Ejemplo:
> *${usedPrefix + command}* Ai Hoshino Edit`,
            carouselBody: (text) => '☁️ Resultado de: ' + text,
            carouselFooter: '🔎 Tiktok - Busquedas',
            albumCaption: (text) => `💞 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤 | 𝙍𝙚𝙨𝙪𝙡𝙩: ${text}
> 🔍 TikTok Search`,
            textListHeader: '*乂 T I K T O K - S E A R C H*',
            textListFormat: (index, title, author, url) => `

  *» Nro* : ${index + 1}
  *» Título* : ${title}
  *» Autor* : ${author}
  *» Url* : ${url}`,
            notFound: (text) => `No se encontraron resultados en TikTok para "${text}".`,
            error: 'Ocurrió un error al intentar buscar en TikTok.',
            errorSearch: 'Error al buscar en TikTok:',
        },
        twitterSearch: {
            description: 'Busca publicaciones en Twitter. Uso: !tweetposts <texto>',
            noText: '🚩 Ingrese el texto del post que deseas buscar.',
            notFound: 'No se encontraron resultados.',
            header: '*乂 T W I T T E R - S E A R C H*',
            resultFormat: (index, user, post, profile, user_link) => `


  *» Nro* : ${index + 1}
  *» User* : ${user}
  *» Publicacion* : ${post}
  *» Perfil* : ${profile}
  *» Link* : ${user_link}`,
            error: 'Ocurrió un error al intentar buscar en Twitter.',
            errorSearch: 'Error al buscar en Twitter:',
        },
        wikipedia: {
            description: 'Busca información en Wikipedia. Uso: !wikipedia <término de búsqueda>',
            noText: (smsAvisoMG, smsMalused, usedPrefix, command) => `${smsAvisoMG}${smsMalused}
*${usedPrefix + command} Universe*`,
            notFound: (text) => `No se encontró información en Wikipedia para "${text}".`,
            caption: (buscador9, isi) => `${buscador9}

` + isi,
            externalAdReplyTitle: 'Admin-TK | Wikipedia',
            externalAdReplyBody: '𝗦𝘂𝗽𝗲𝗿 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗕𝗼𝘁 🐱❤️',
            error: (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}

${wm}`,
            errorSearch: 'Error al buscar en Wikipedia:',
        },
        youtubeSearch: {
            description: 'Busca videos y canales de YouTube o descarga audio/video por URL. Uso: !yts <consulta> o !play <consulta> o !ytmp3v2 <url>',
            noUrl: (smsAvisoMG, smsMalused7, usedPrefix, command) => `${smsAvisoMG}${smsMalused7}
*${usedPrefix + command} https://youtu.be/c5gJRzCi0f0*`,
            invalidLink: '❀ El link de YouTube es inválido.',
            noTextYts: (smsAvisoMG) => `${smsAvisoMG}ESCRIBA EL NOMBRE DE UN VIDEO O CANAL DE YOUTUBE

WRITE THE NAME OF A YOUTUBE VIDEO OR CHANNEL`,
            noResults: '❌ No se encontraron resultados en YouTube.',
            playTitle: '`【Y O U T U B E - P L A Y】`',
            playInfo: (title, duration, published, author, url) => `• *` + '`' + `Título:` + '`' + `* ${title}
• *` + '`' + `Duración:` + '`' + `* ${duration}
• *` + '`' + `Publicado:` + '`' + `* ${published}
• *` + '`' + `Canal:` + '`' + `* ${author}
• *` + '`' + `Url:` + '`' + `* _${url}_`,
            playFooter: 'Selecciona una opción',
            audioButton: '🎵 Audio',
            videoButton: '🎥 Video',
            listResultsHeader: (htki, htka) => `${htki} *RESULTADOS* ${htka}`,
            listSearchOf: (text) => `Busqueda de: ${text}`,
            listAudioHeader: 'A U D I O',
            listVideoHeader: 'V I D E O',
            listAudioDocHeader: 'A U D I O D O C',
            listVideoDocHeader: 'V I D E O D O C',
            errorDownloadAudio: '❀ No se pudo obtener el archivo de audio de YouTube.',
            errorProcessAudio: '❀ Ocurrió un error al procesar la solicitud de descarga.',
            docAudioWait: (smsAvisoEG, additionalText) => `${smsAvisoEG}PRONTO TENDRA SU DOCUMENTO ${additionalText}, ESPERE POR FAVOR

SOON YOU WILL HAVE YOUR ${additionalText} DOCUMENT, PLEASE WAIT`,
            docAudioFail: '❌ No se pudo descargar el audio como documento.',
            docAudioCaption: (wm, smsYT1, title, smsYT11, fileSize, vs) => `╭━❰  ${wm}  ❱━⬣
┃📥 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝘿𝙇 📥
┃ও *${smsYT1}:* 
┃» ${title}
┃﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
┃ও *${smsYT11}:*
┃» ${fileSize}
╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
            docVideoWait: (smsAvisoEG, additionalText) => `${smsAvisoEG}PRONTO TENDRA SU DOCUMENTO ${additionalText}, ESPERE POR FAVOR

SOON YOU WILL HAVE YOUR ${additionalText} DOCUMENT, PLEASE WAIT`,
            docVideoFail: '❌ No se pudo descargar el video como documento.',
            docVideoCaption: (wm, smsYT1, title, selectedQuality, vs) => `╭━❰  ${wm}  ❱━⬣
┃ 💜 ${smsYT1}
┃ ${title} (${selectedQuality}p)
╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
            errorDownloadVideo: 'No se pudo descargar el video.',
            errorProcessVideo: 'Ocurrió un error al procesar la solicitud de descarga.',
            errorGeneral: 'Error al buscar en YouTube:',
            errorReport: (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}

${wm}`,
            errorVideoInfo: 'No se pudo obtener información del video de YouTube.',
            errorDetermineLink: 'No se pudo determinar el enlace de YouTube.',
            errorVideoList: (smsAvisoFG, smsYT, length) => `${smsAvisoFG} ${smsYT} ${length}*`,
            errorPlaylist: (smsAvisoMG, smsY2, usedPrefix, command) => `${smsAvisoMG}${smsY2(usedPrefix, command)} ${usedPrefix}playlist <texto>*`,
            errorSearch: (query) => `No se encontró ningún video para "${query}".`,
            ytPlayNoFormat: (usedPrefix, command) => `[ ✰ ] Ingresa el formato y el título de un video de *YouTube*.

	> *${usedPrefix + command}* mp3 SUICIDAL-IDOL

*» Formatos disponibles* :

*${usedPrefix + command}* mp3
*${usedPrefix + command}* mp3doc
*${usedPrefix + command}* mp4
*${usedPrefix + command}* mp4doc`,
            ytPlayNoQuery: (usedPrefix, command) => `[ ✰ ] Ingresa el título de un video o canción de *YouTube*.

	> *${usedPrefix + command}* mp3 SUICIDAL-IDOL`,
            ytPlayNoResults: (query) => `No se encontraron resultados para "${query}".`,
            ytPlayInfo: (title, duration, views, author, published, url) => `	✩   *Título*: ${title}
	✩   *Duración*: ${duration}
	✩   *Visitas*: ${views}
	✩   *Autor*: ${author}
	✩   *Publicado*: ${published}
	✩   *Url*: ${url}

	> *- ↻ El archivo se esta enviando espera un momento, soy lenta. . .*
`,
            ytPlayDownloadError: 'Ocurrió un error al descargar el archivo.',
        },
        yahooSearch: {
            noText: '🌙 INGRESE UN TEXTO PARA BUSCAR EN YAHOO',
            resultHeader: '`𝚈𝙰𝙷𝙾𝙾 𝚇 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰`',
            resultItem: (title, link, snippet) => `☪︎ *Título:* ${title}\n☪︎ *Enlace:* ${link}\n\n☪︎ *Descripción:* ${snippet}`,
            errorApi: '*Error En La Api*',
        },
    }
};
//# sourceMappingURL=busqueda-content.js.map