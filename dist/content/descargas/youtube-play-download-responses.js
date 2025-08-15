export const YOUTUBE_PLAY_NO_TEXT = "Que está buscando?\nIngrese el nombre de la canción";
export const YOUTUBE_PLAY_AUDIO_CARD_CAPTION = (title, duration) => `${title}\n*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*\n\n*Duración:* ${duration}\n*Aguarde un momento en lo que envío su audio*`;
export const YOUTUBE_PLAY_VIDEO_CARD_CAPTION = (title, duration) => `${title}\n*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*\n\n*Duración:* ${duration}\n*Aguarde un momento en lo que envío su video*`;
export const YOUTUBE_PLAY_AUDIO_DOC_CARD_CAPTION = (title, duration, usedPrefix, url) => `${title}\n*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*\n\n*Duración:* ${duration}\n*Descargado el audio en documentos, aguarden un momento por favor....*\n\n> _*Si este comando falla usar de la seguirte manera:*_ ${usedPrefix}ytmp3doc ${url}`;
export const YOUTUBE_PLAY_VIDEO_DOC_CARD_CAPTION = (title, duration, usedPrefix, url) => `${title}\n*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*\n\n*Duración:* ${duration}\n*Descargado el vídeo en documentos, aguarden un momento por favor....*\n\n> _*Si este comando falla usar de la seguirte manera:*_ ${usedPrefix}ytmp4doc ${url}`;
export const YOUTUBE_PLAY_VIDEO_CAPTION = (title) => `Aquí está tu video \nTítulo: ${title}`;
export const YOUTUBE_PLAY_ERROR = "Ocurrió un error inesperado";
export const YOUTUBE_PLAY_FILE_TOO_HEAVY = "El archivo es muy pesado";
//# sourceMappingURL=youtube-play-download-responses.js.map