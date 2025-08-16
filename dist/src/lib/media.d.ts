/**
 * Verifica si FFmpeg está instalado en el sistema
 * @returns {Promise<boolean>}
 */
export declare const checkFFmpegInstallation: () => Promise<unknown>;
/**
 * Convierte un archivo a audio OGG
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @returns {Promise<{data: Buffer, filename: string}|null>} - Objeto con el buffer y la ruta del archivo convertido
 */
export declare const toAudio: (input: any, inputExt: any) => Promise<{
    data: any;
    filename: any;
} | null>;
/**
 * Convierte un archivo a MP3
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const toMp3: (input: any, inputExt: any) => Promise<any>;
/**
 * Convierte un archivo a MP4
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const toMp4: (input: any, inputExt: any) => Promise<any>;
/**
 * Convierte un archivo a WebM
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const toWebm: (input: any, inputExt: any) => Promise<any>;
/**
 * Convierte un sticker animado WebP a MP4
 * @param {string|Buffer} input - Entrada a convertir
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const webpToMp4: (input: any) => Promise<any>;
/**
 * Convierte una imagen a WebP
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @param {boolean} [animated=false] - Si es una imagen animada
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const toWebp: (input: any, inputExt: any, animated?: boolean) => Promise<any>;
/**
 * Convierte un archivo a GIF animado
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const toGif: (input: any, inputExt: any) => Promise<any>;
/**
 * Convierte un video a diferentes formatos
 * @param {string|Buffer} input - Entrada a convertir
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @param {string} format - Formato de salida (mp4, webm, gif, etc.)
 * @returns {Promise<Buffer|null>} - Buffer del archivo convertido
 */
export declare const convertVideo: (input: any, inputExt: any, format: any) => Promise<any>;
/**
 * Optimiza un archivo de imagen
 * @param {string|Buffer} input - Entrada a optimizar
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @param {Object} [options] - Opciones de optimización
 * @param {number} [options.quality=80] - Calidad de la imagen (0-100)
 * @param {number} [options.width] - Ancho deseado
 * @param {number} [options.height] - Alto deseado
 * @returns {Promise<Buffer|null>} - Buffer del archivo optimizado
 */
export declare const optimizeImage: (input: any, inputExt: any, options?: {}) => Promise<any>;
/**
 * Extrae audio de un video
 * @param {string|Buffer} input - Entrada de video
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @param {string} [format='mp3'] - Formato de salida (mp3, ogg, wav)
 * @returns {Promise<Buffer|null>} - Buffer del audio extraído
 */
export declare const extractAudio: (input: any, inputExt: any, format?: string) => Promise<any>;
/**
 * Cambia la velocidad de un video/audio
 * @param {string|Buffer} input - Entrada a modificar
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @param {number} [speed=1.0] - Factor de velocidad (0.5 = mitad de velocidad, 2.0 = doble velocidad)
 * @returns {Promise<Buffer|null>} - Buffer del archivo modificado
 */
export declare const changeSpeed: (input: any, inputExt: any, speed?: number) => Promise<any>;
/**
 * Recorta un video/audio
 * @param {string|Buffer} input - Entrada a recortar
 * @param {string} [inputExt] - Extensión del archivo de entrada
 * @param {number} start - Tiempo de inicio en segundos
 * @param {number} duration - Duración en segundos
 * @returns {Promise<Buffer|null>} - Buffer del archivo recortado
 */
export declare const trimMedia: (input: any, inputExt: any, start: any, duration: any) => Promise<any>;
/**
 * Combina múltiples archivos de audio/video
 * @param {Array<string|Buffer>} inputs - Array de entradas a combinar
 * @param {string} outputFormat - Formato de salida (mp4, mp3, etc.)
 * @returns {Promise<Buffer|null>} - Buffer del archivo combinado
 */
export declare const combineMedia: (inputs: any, outputFormat: any) => Promise<any>;
/**
 * Convierte un buffer de imagen/video a formato WebP (sticker).
 * @param {Buffer} mediaBuffer - El buffer de imagen o video de entrada.
 * @param {boolean} [animated=false] - Si la salida debe ser un sticker animado.
 * @returns {Promise<Buffer|null>} Un buffer con el sticker WebP.
 */
export declare const toWebpSticker: (mediaBuffer: any, animated?: boolean) => Promise<any>;
/**
 * Extrae un frame de un video como imagen.
 * @param {Buffer} videoBuffer - El buffer del video de entrada.
 * @param {number} timestamp - El tiempo en segundos para extraer el frame.
 * @returns {Promise<Buffer|null>} Un buffer con la imagen del frame.
 */
export declare const extractFrame: (videoBuffer: any, timestamp?: number) => Promise<any>;
/**
 * Comprime un video.
 * @param {Buffer} videoBuffer - El buffer del video de entrada.
 * @param {number} quality - La calidad de compresión (ej. 23 para CRF, menor es mejor calidad).
 * @returns {Promise<Buffer|null>} Un buffer con el video comprimido.
 */
export declare const compressVideo: (videoBuffer: any, quality?: number) => Promise<any>;
//# sourceMappingURL=media.d.ts.map