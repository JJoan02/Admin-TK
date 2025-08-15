import axios from 'axios';
import FormData from 'form-data'; // Usar 'form-data' para Node.js
import { fileTypeFromBuffer } from 'file-type';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();

const encodedURL = 'aHR0cHM6Ly9jbG91ZC5kb3JyYXR6LmNvbS91cGxvYWRwMg=='; // URL base64
const decodeURL = (encoded) => Buffer.from(encoded, 'base64').toString('utf-8');

/**
 * Sube un archivo a cloud.dorratz.com
 * @param {Buffer} buffer Buffer del archivo a subir.
 * @returns {Promise<string>} La URL del archivo subido.
 * @throws {Error} Si el archivo está vacío, no se puede determinar el tipo MIME, o la subida falla.
 */
export const uploadToDorratz = async (buffer) => {
  if (!buffer) {
    throw new Error('El archivo está vacío o no es válido.');
  }

  const { ext, mime } = await fileTypeFromBuffer(buffer) || {};
  if (!mime) {
    throw new Error('No se pudo detectar el tipo MIME del archivo.');
  }

  const form = new FormData();
  form.append('file', buffer, { filename: `uploaded_file.${ext}`, contentType: mime });

  try {
    const uploadUrl = decodeURL(encodedURL);
    const response = await axios.post(uploadUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    if (response.data && response.data.link) {
      logger.debug(`Archivo subido a Dorratz: ${response.data.link}`);
      return response.data.link;
    }
    throw new Error(`Fallo al subir a Dorratz: ${response.data.message || JSON.stringify(response.data)}`);
  } catch (error) {
    logger.error({ err: error }, 'Error al subir archivo a Dorratz.');
    if (error.response && error.response.status === 413) { // 413 Payload Too Large
      throw new Error('El tamaño del archivo excede el límite permitido.');
    }
    throw new Error(`No se pudo generar el enlace: ${error.response?.data?.message || error.message}`);
  }
};
