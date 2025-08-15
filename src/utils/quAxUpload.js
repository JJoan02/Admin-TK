import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();

/**
 * Sube un archivo a qu.ax
 * @param {Buffer} buffer Buffer del archivo
 * @returns {Promise<string>} Enlace del archivo subido
 */
export const uploadToQuAx = async (buffer) => {
  try {
    const { ext, mime } = await fileTypeFromBuffer(buffer) || {};
    if (!ext || !mime) {
      throw new Error('No se pudo determinar el tipo MIME o la extensión del archivo.');
    }
    const form = new FormData();
    const blob = new Blob([buffer.toArrayBuffer()], { type: mime });
    form.append('files[]', blob, 'tmp.' + ext);

    const res = await fetch('https://qu.ax/upload.php', { method: 'POST', body: form });
    const result = await res.json();
    if (result && result.success) {
      logger.debug(`Archivo subido a qu.ax: ${result.files[0].url}`);
      return result.files[0].url;
    } else {
      throw new Error(`Fallo al subir el archivo a qu.ax: ${JSON.stringify(result)}`);
    }
  } catch (e) {
    logger.error({ err: e }, 'Error al subir archivo a qu.ax');
    throw e;
  }
};
