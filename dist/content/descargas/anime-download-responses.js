export const ANIME_DOWNLOAD_NO_TEXT = (usedPrefix, command) => `🌱 \`Ingresa el título de algún anime o la URL. Ejemplo:\`\n\n • ${usedPrefix + command} Mushoku Tensei\n • ${usedPrefix + command} https://animeav1.com/media/mushoku-tensei`;
export const ANIME_DOWNLOAD_INFO_HEADER = "乂 \`\`\`ANIME - DOWNLOAD\`\`\`";
export const ANIME_DOWNLOAD_TITLE = "≡ 🌷 \`Título :\`";
export const ANIME_DOWNLOAD_DESCRIPTION = "≡ 🌾 \`Descripción :\`";
export const ANIME_DOWNLOAD_VOTES = "≡ 🌲 \`Votos :\`";
export const ANIME_DOWNLOAD_RATING = "≡ 🍂 \`Rating :\`";
export const ANIME_DOWNLOAD_GENRES = "≡ 🍃 \`Géneros :\`";
export const ANIME_DOWNLOAD_TOTAL_EPISODES = "≡ 🌱 \`Episodios totales :\`";
export const ANIME_DOWNLOAD_AVAILABLE_EPISODES = "≡ 🌿 \`Episodios disponibles :\`";
export const ANIME_DOWNLOAD_EPISODE_INSTRUCTIONS = "Responde a este mensaje con el número del episodio y el idioma. Ejemplo: 1 sub, 3 dub";
export const ANIME_DOWNLOAD_NO_RESULTS = "No se encontraron resultados.";
export const ANIME_DOWNLOAD_ERROR_PROCESSING = (error) => `Error al procesar la solicitud: ${error}`;
export const ANIME_DOWNLOAD_ALREADY_DOWNLOADING = "⏳ Ya estás descargando un episodio. Espera a que termine.";
export const ANIME_DOWNLOAD_INVALID_EPISODE_NUMBER = "Número de episodio no válido.";
export const ANIME_DOWNLOAD_EPISODE_NOT_FOUND = (episode) => `Episodio ${episode} no encontrado.`;
export const ANIME_DOWNLOAD_NO_LANGUAGES_AVAILABLE = (episode) => `No hay idiomas disponibles para el episodio ${episode}.`;
export const ANIME_DOWNLOAD_DOWNLOADING_EPISODE = (title, episode, language) => `Descargando ${title} - cap ${episode} ${language}`;
export const ANIME_DOWNLOAD_ERROR_DOWNLOADING_EPISODE = (error) => `Error al descargar el episodio: ${error}`;
//# sourceMappingURL=anime-download-responses.js.map