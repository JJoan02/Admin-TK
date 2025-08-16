import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();

/**
 * Sube un archivo efímero a file.io
 * `Expira en 1 día`
 * `Tamaño máximo de 100MB`
 * @param {Buffer} buffer Buffer del archivo
 * @returns {Promise<string>} Enlace del archivo subido
 */
export const fileIO = async (buffer) => {
  try {
    const { ext, mime } = await fileTypeFromBuffer(buffer) || {};
    if (!ext || !mime) {
      throw new Error('No se pudo determinar el tipo MIME o la extensión del archivo.');
    }
    const form = new FormData();
    const blob = new Blob([buffer.toArrayBuffer()], { type: mime });
    form.append('file', blob, 'tmp.' + ext);

    const res = await fetch('https://file.io/?expires=1d', { // 1 Día de expiración
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || 'Fallo al subir a file.io');
    }
    logger.debug(`Archivo subido a file.io: ${json.link}`);
    return json.link;
  } catch (e) {
    logger.error({ err: e }, 'Error al subir a file.io');
    throw e;
  }
};

/**
 * Sube un archivo a storage.restfulapi.my.id
 * @param {Buffer} buffer Buffer del archivo
 * @returns {Promise<string>} Enlace del archivo subido
 */
export const RESTfulAPI = async (buffer) => {
  try {
    const form = new FormData();
    const blob = new Blob([buffer.toArrayBuffer()]);
    form.append('file', blob);

    const res = await fetch('https://storage.restfulapi.my.id/upload', {
      method: 'POST',
      body: form,
    });
    let json = await res.text();
    try {
      json = JSON.parse(json);
      if (json.files && json.files[0] && json.files[0].url) {
        logger.debug(`Archivo subido a RESTfulAPI: ${json.files[0].url}`);
        return json.files[0].url;
      }
      throw new Error(json.message || 'Fallo al subir a RESTfulAPI');
    } catch (e) {
      throw new Error(`Respuesta inválida de RESTfulAPI: ${json}`);
    }
  } catch (e) {
    logger.error({ err: e }, 'Error al subir a RESTfulAPI');
    throw e;
  }
};
