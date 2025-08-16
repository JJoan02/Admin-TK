import fs from 'fs/promises';
import path from 'path'; // Importar path
import { initializeLogger } from './logger.js';
const logger = initializeLogger();

export class DataUtils {
  /**
   * Normaliza un JID (Jabber ID) para asegurar un formato consistente.
   * Elimina el sufijo de servidor si no es necesario y asegura el formato @s.whatsapp.net.
   * @param {string} jid - El JID a normalizar.
   * @returns {string | null} El JID normalizado o null si la entrada es inválida.
   */
  static normalizeJid(jid) {
    if (!jid || typeof jid !== 'string') {
      logger.warn(`Intento de normalizar JID inválido: ${jid}`);
      return null;
    }
    // Eliminar cualquier sufijo de servidor existente
    let normalized = jid.split('@')[0];
    // Asegurarse de que solo sean dígitos para JIDs de usuario
    normalized = normalized.replace(/[^0-9]/g, '');

    if (!normalized) {
      logger.warn(`JID sin número válido después de normalizar: ${jid}`);
      return null;
    }

    // Si es un JID de grupo, mantener el formato @g.us
    if (jid.endsWith('@g.us')) {
      return `${normalized}@g.us`;
    }
    // Para JIDs de usuario, añadir el sufijo estándar
    return `${normalized}@s.whatsapp.net`;
  }

  /**
   * Extrae el número de teléfono de un JID.
   * @param {string} jid - El JID del que extraer el número.
   * @returns {string | null} El número de teléfono o null si el JID es inválido.
   */
  static getPhoneNumberFromJid(jid) {
    if (!jid || typeof jid !== 'string') {
      logger.warn(`Intento de obtener número de JID inválido: ${jid}`);
      return null;
    }
    // Extraer solo los dígitos del JID
    const number = jid.split('@')[0].replace(/[^0-9]/g, '');
    if (!number) {
      logger.warn(`No se pudo extraer un número válido del JID: ${jid}`);
      return null;
    }
    return number;
  }

  /**
   * Valida y formatea un número de teléfono, añadiendo el prefijo '+' si falta.
   * @param {string} phoneNumber - El número de teléfono a validar y formatear.
   * @returns {string | null} El número formateado (ej. '+51912345678') o null si es inválido.
   */
  static validateAndFormatPhoneNumber(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      logger.warn(`Intento de validar número de teléfono inválido: ${phoneNumber}`);
      return null;
    }
    let cleanedNumber = phoneNumber.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos

    // Si el número no empieza con '+' y no es un número de WhatsApp (ej. 51912345678)
    // asumimos que le falta el prefijo de país y añadimos un prefijo por defecto (ej. +51 para Perú)
    // Esta lógica puede necesitar ser ajustada según el país por defecto de tu bot
    if (!cleanedNumber.startsWith('+') && !cleanedNumber.startsWith('00')) {
      // Aquí podrías usar una lógica más sofisticada para inferir el código de país
      // Por ahora, simplemente añade '+' si no está presente y dejar que Baileys lo maneje
      cleanedNumber = `+${cleanedNumber}`;
    } else if (cleanedNumber.startsWith('00')) {
      cleanedNumber = `+${cleanedNumber.substring(2)}`; // Reemplazar '00' por '+'
    }

    // Validar que el número resultante sea un número de teléfono válido (ej. longitud mínima)
    // Una validación más robusta implicaría usar una librería como 'libphonenumber-js'
    if (cleanedNumber.length < 8) { // Ejemplo: +1 (país) + 7 (número) = 8 caracteres mínimos
      logger.warn(`Número de teléfono demasiado corto después de limpiar y formatear: ${phoneNumber}`);
      return null;
    }

    return cleanedNumber;
  }

  /**
   * Elimina un archivo o directorio de forma recursiva.
   * @param {string} targetPath - La ruta al archivo o directorio a eliminar.
   * @returns {Promise<boolean>} True si la eliminación fue exitosa, false en caso contrario.
   */
  static async deletePath(targetPath) {
    try {
      await fs.rm(targetPath, { recursive: true, force: true });
      logger.debug(`Ruta eliminada exitosamente: ${targetPath}`);
      return true;
    } catch (error) {
      logger.error({ err: error }, `Error al eliminar la ruta: ${targetPath}`);
      return false;
    }
  }

  /**
   * Limpia archivos temporales generados por el bot.
   * @param {string} directory - El directorio a limpiar. Por defecto, './tmp'.
   * @param {number} maxAgeInHours - La edad máxima de los archivos en horas antes de ser eliminados. Por defecto, 24 horas.
   */
  static async cleanTempFiles(directory = './tmp', maxAgeInHours = 24) {
    const tempPath = path.resolve(process.cwd(), directory);
    logger.info(`Iniciando limpieza de archivos temporales en: ${tempPath}`);

    try {
      // Asegurarse de que el directorio temporal exista
      await fs.mkdir(tempPath, { recursive: true });

      const files = await fs.readdir(tempPath);
      if (files.length === 0) {
        logger.info('El directorio temporal ya está vacío. No se necesita limpieza.');
        return;
      }

      const now = Date.now(); // Usar Date.now() para comparación numérica directa
      const maxAge = maxAgeInHours * 60 * 60 * 1000; // Convertir horas a milisegundos
      let deletedCount = 0;

      for (const file of files) {
        const filePath = path.join(tempPath, file);
        try {
          const stats = await fs.stat(filePath);
          // Usar stats.mtimeMs para milisegundos directamente
          const fileAge = now - stats.mtimeMs; 

          if (fileAge > maxAge) {
            await fs.unlink(filePath);
            logger.debug(`Archivo temporal eliminado: ${file}`);
            deletedCount++;
          }
        } catch (fileError) {
          // Ignorar errores si el archivo ya fue eliminado o no se puede acceder
          logger.warn(`No se pudo procesar el archivo ${file}: ${fileError.message}`);
        }
      }

      if (deletedCount > 0) {
        logger.info(`Limpieza completada. Se eliminaron ${deletedCount} archivos antiguos.`);
      } else {
        logger.info('No se encontraron archivos temporales antiguos para eliminar.');
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        logger.warn(`El directorio temporal '${tempPath}' no existe. Saltando limpieza.`);
      } else {
        logger.error({ err: error }, '❌ Error durante la limpieza de archivos temporales.');
      }
    }
  }

  /**
   * Intenta liberar memoria forzando la recolección de basura.
   * @returns {object} Un objeto con el uso de memoria antes y después de la recolección.
   */
  static forceGarbageCollection() {
    try {
      if (typeof global.gc === 'function') { // Verificar si global.gc es una función
        logger.info('Forzando recolección de basura...');
        const memoryBefore = process.memoryUsage();
        global.gc();
        const memoryAfter = process.memoryUsage();
        logger.info('Recolección de basura completada.');
        return { memoryBefore, memoryAfter };
      } else {
        logger.warn('La recolección de basura forzada no está disponible. Ejecuta Node con la bandera --expose-gc.');
        return null;
      }
    } catch (error) {
      logger.error({ err: error }, '❌ Error al forzar la recolección de basura.');
      return null;
    }
  }
}

export default DataUtils;