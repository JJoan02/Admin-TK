import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();
import readline from 'readline';
import { EventEmitter } from 'events';

export const questionEmitter = new EventEmitter();
let webAnswerResolver = null;

export function askQuestion(query): void {
  // Emitir la pregunta para que el WebServer la envíe al dashboard
  questionEmitter.emit('question', query);

  return new Promise((resolve) => {
    // Resolver desde la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`
> ${query} `, (answer) => {
      rl.close();
      webAnswerResolver = null; // Limpiar el resolver web
      resolve(answer.trim());
    });

    // Permitir que la respuesta venga del web (si se establece un resolver)
    webAnswerResolver = (answer) => {
      rl.close(); // Cerrar la interfaz de readline si la respuesta viene de la web
      resolve(answer.trim());
      webAnswerResolver = null; // Limpiar el resolver web después de usarlo
    };
  });
}

export function setWebAnswerResolver(resolver): void {
  webAnswerResolver = resolver;
}

export function resolveWebAnswer(answer): void {
  if (webAnswerResolver) {
    webAnswerResolver(answer);
    return true;
  }
  return false;
}

export function sleep(ms): void {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isUrl(text): void {
  if (typeof text !== 'string' || text.trim() === '') {
    return false;
  }
  // Regex más robusta para URLs
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(text);
}

export function formatBytes(bytes, decimals = 2): void {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function runtime(seconds): void {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    return 'Tiempo inválido';
  }
  seconds = Math.floor(seconds); // Asegurar que sea un entero
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  let result = '';
  if (d > 0) result += `${d} día(s), `;
  if (h > 0) result += `${h} hora(s), `;
  if (m > 0) result += `${m} minuto(s), `;
  if (s > 0) result += `${s} segundo(s)`;
  return result.replace(/, $/, '');
}

export function msToDate(ms): void {
  if (typeof ms !== 'number' || isNaN(ms) || ms < 0) {
    return 'Fecha inválida';
  }
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  return `${days} Día(s) ${hours} Hora(s) ${minutes} Minuto(s)`;
}

export async function getBuffer(source, saveToFile = false): void {
  let res;
  let filename = null;
  let data = null;
  let fileType = null;

  try {
    if (Buffer.isBuffer(source)) {
      data = source;
    } else if (source instanceof ArrayBuffer) {
      data = Buffer.from(source);
    } else if (typeof source === 'string' && /^data:.*?\/.*?;base64,/i.test(source)) {
      data = Buffer.from(source.split(',')[1], 'base64');
    } else if (typeof source === 'string' && isUrl(source)) {
      try {
        res = await axios({
          method: 'get',
          url: source,
          headers: {
            DNT: 1,
            'Upgrade-Insecure-Requests': 1,
          },
          responseType: 'arraybuffer',
          timeout: 15000, // Añadir timeout para descargas de URL
        });
        data = res.data;
      } catch (error) {
        logger.error({ err: error, url: source }, 'Error al descargar buffer desde URL.');
        return null;
      }
    } else if (typeof source === 'string' && (await fs.stat(source).catch(() => null))) {
      filename = source;
      data = await fs.readFile(source);
    } else if (typeof source === 'string') {
      data = Buffer.from(source);
    } else {
      data = Buffer.alloc(0);
    }

    if (!Buffer.isBuffer(data) || data.length === 0) {
      logger.warn('El resultado no es un buffer válido o está vacío.');
      return null;
    }

    fileType = (await fileTypeFromBuffer(data)) || {
      mime: 'application/octet-stream',
      ext: 'bin', // Extensión por defecto sin punto
    };

    let deleteFileFunc = null;
    if (data && saveToFile && !filename) {
      const tempDir = path.join(process.cwd(), 'tmp');
      await fs.mkdir(tempDir, { recursive: true }); // Asegurarse de que el directorio tmp exista
      filename = path.join(tempDir, `${Date.now()}.${fileType.ext}`);
      await fs.writeFile(filename, data);
      deleteFileFunc = async () => {
        try {
          if (filename && (await fs.stat(filename).catch(() => null))) {
            await fs.unlink(filename);
            logger.debug(`Archivo temporal eliminado: ${filename}`);
          }
        } catch (err) {
          logger.error({ err }, `Error al eliminar archivo temporal: ${filename}`);
        }
      };
    }

    return {
      res,
      filename,
      mime: fileType.mime,
      ext: fileType.ext,
      data,
      deleteFile: deleteFileFunc,
    };
  } catch (error) {
    logger.error({ err: error, source }, '❌ Error general en getBuffer.');
    return null;
  }
}

export function parseMention(text = ''): void {
  if (typeof text !== 'string') {
    logger.warn('parseMention llamado con texto inválido.');
    return [];
  }
  // Regex para capturar JIDs de WhatsApp (números de 5 a 16 dígitos o '0')
  const mentionRegex = /@([0-9]{5,16}|0)/g;
  const mentions = [];
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    // match[1] contendrá el número sin el '@'
    mentions.push(`${match[1]}@s.whatsapp.net`);
  }
  return mentions;
}

export function getRandomElement(array): void {
  if (!Array.isArray(array) || array.length === 0) {
    return;
  }
  return array[Math.floor(Math.random() * array.length)];
}

export function capitalize(str): void {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeV2(str): void {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.split(' ').map((word) => capitalize(word)).join(' ');
}

export function isNumber(value): void {
  const num = parseInt(value, 10);
  return typeof num === 'number' && !isNaN(num);
}

/**
 * Trunca una cadena a una longitud máxima, añadiendo puntos suspensivos si es necesario.
 * @param {string} str - La cadena a truncar.
 * @param {number} maxLength - La longitud máxima deseada.
 * @returns {string} La cadena truncada.
 */
export function truncateString(str, maxLength): void {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
}
