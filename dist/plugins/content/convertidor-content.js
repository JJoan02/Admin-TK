export const imageToAnimeMessages = {
    noImage: '🛑 *Responda a una imagen*',
    processing: '☄️ *Conviertiendo la imagen en anime, espere un momento...*',
    error: '🛑 *Ocurrió un error*',
};
export const videoToGifAudioMessages = {
    noVideo: '🚩 Responde a un *Video.*',
    processing: global.wait,
    success: 'Aquí está. 🐢'
};
export const stickerToImageMessages = {
    noSticker: '*🌳 Responda a un sticker*',
    processing: global.wait,
};
export const mediaToMp3Messages = {
    noMedia: '*🌳 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰𝙻 𝚅𝙸𝙳𝙴𝙾 𝙾 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙰 𝙰𝚄𝙳𝙸𝙾/𝙼𝙿𝟹*',
    downloadError: '*🌳 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝚂𝚄 𝚅𝙸𝙳𝙴𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*',
    conversionError: '*🌳 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝚂𝚄 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉 𝙰 𝙰𝚄𝙳𝙸𝙾/𝙼𝙿𝟹, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*',
};
export const mediaToPttMessages = {
    noMedia: (usedPrefix, command) => `${global.lenguajeTK.smsAvisoMG()}${global.mid.smsconvert7}`,
    downloadError: (usedPrefix, command) => `${global.lenguajeTK.smsAvisoFG()}${global.mid.smsconvert8}`,
    conversionError: (usedPrefix, command) => `${global.lenguajeTK.smsAvisoFG()}${global.mid.smsconvert9}`,
};
export const stickerToVideoMessages = {
    noSticker: (usedPrefix, command) => `*🛑 Responda A Un Sticker Que Desee Convertir En Video Con El Comando ${usedPrefix + command}*`,
    processing: global.wait,
    success: '*🌳 Su Video*',
};
export const textToSpeechMessages = {
    noText: (usedPrefix, command) => `🚩 *Te Faltó Un Texto*\n\nEjemplo:\n${usedPrefix + command} Hola Ai`,
    error: 'Ocurrió un error al convertir el texto a voz.',
};
//# sourceMappingURL=convertidor-content.js.map