export const googleImageSearchMessages = {
    noText: (usedPrefix, command) => `🚩 Ingresa el nombre de la imágen que estas buscando.\n\n\`Ejemplo:\`\n> *${usedPrefix + command}* Ai Hoshino Icons`,
    prohibitedWord: 'Hola enfermo UwU',
    result: (text) => `*» Resultado* : ${text}`,
    error: 'Ocurrió un error al buscar la imagen.',
};
export const prohibitedWords = [
    'caca', 'polla', 'porno', 'porn', 'gore', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito', 'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cogiendo', 'cepesito', 'hot', 'buceta', 'xxx', 'rule', 'r u l e'
];
export const meguminImageMessages = {
    success: 'Aquí tienes tu imagen de Megumin.',
    error: 'Ocurrió un error al obtener la imagen de Megumin.',
};
export const nekoImageMessages = {
    success: 'Aquí tienes tu imagen de Neko.',
    error: 'Ocurrió un error al obtener la imagen de Neko.',
};
export const neko2ImageMessages = {
    success: 'Aquí tienes tu imagen de Neko (alternativa).',
    error: 'Ocurrió un error al obtener la imagen de Neko (alternativa).',
};
export const pinterestSearchMessages = {
    noText: (usedPrefix, command) => `🚩 Ingresa el nombre de la imágen que estas buscando.\n\n\`Ejemplo:\`\n> *${usedPrefix + command}* Ai Hoshino Icons`,
    result: (text) => `*» Resultado* : ${text}`,
    error: 'Ocurrió un error al buscar la imagen en Pinterest.',
};
export const pixivDownloadMessages = {
    noText: '🚩 Ingresa un texto junto al comando.',
    notFound: 'Resultados no encontrados.',
    result: (caption, artist, tags) => `*» Nombre :* ${caption}\n*» Subido por :* ${artist}\n*» Tags* : ${tags.join(', ')}`,
    error: 'Ocurrió un error al descargar la imagen de Pixiv.',
};
export const ppCoupleMessages = {
    girl: '*» Chica*',
    boy: '*» Chico*',
    error: 'Ocurrió un error al obtener las imágenes de PP Couple.',
};
export const shinobuImageMessages = {
    success: 'Aquí tienes tu imagen de Shinobu.',
    error: 'Ocurrió un error al obtener la imagen de Shinobu.',
};
export const waifuImageMessages = {
    success: 'Aquí tienes tu imagen de Waifu.',
    error: 'Ocurrió un error al obtener la imagen de Waifu.',
};
export const wallpaperSearchMessages = {
    noText: (usedPrefix, command) => `🚩 Ingresa un texto junto al comando.\n\n*Ejemplo:*
*${usedPrefix + command}* Ai Hoshino`,
    result: (text) => `*» Wallpaper* : ${text ? text.capitalize() : false}`,
    error: 'Ocurrió un error al buscar el wallpaper.',
};
//# sourceMappingURL=imagenes-content.js.map