export const GOOGLE_LYRICS_NO_TEXT = (smsAvisoMG, smsMalused) => `${smsAvisoMG}${smsMalused}`;
export const GOOGLE_LYRICS_HEADER = "*𝙂𝙊𝙊𝙂𝙇𝙀 𝙇𝙔𝙍𝙄𝘾𝙎 🪴*\n\n";
export const GOOGLE_LYRICS_TITLE = (title) => ` *↬ Título:* ${title}\n`;
export const GOOGLE_LYRICS_ARTIST = (artist) => ` *↬ Artista:* ${artist}\n`;
export const GOOGLE_LYRICS_ALBUM = (album) => ` *↬ Álbum:* ${album}\n`;
export const GOOGLE_LYRICS_DATE = (date) => ` *↬ Fecha:* ${date}\n`;
export const GOOGLE_LYRICS_GENRES = (genres) => ` *↬ Géneros:* ${genres}\n\n`;
export const GOOGLE_LYRICS_ERROR_REPORT = (smsMalError3, smsMensError2, usedPrefix, command, wm) => `${smsMalError3}#report ${smsMensError2} ${usedPrefix + command}\n\n${wm}`;
//# sourceMappingURL=google-lyrics-responses.js.map