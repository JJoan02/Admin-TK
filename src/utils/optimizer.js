import { initializeLogger } from './logger.js';
const logger = initializeLogger();
import DataUtils from './DataUtils.js'; // Importar DataUtils para usar sus funciones

const TEMP_DIR = './tmp'; // Asegúrate de que esta ruta sea consistente con la usada en start.js

/**
 * Ejecuta todas las optimizaciones y tareas de limpieza configuradas.
 * @returns {Promise<void>}
 */
export const runAllOptimizations = async () => {
  logger.info('🚀 Iniciando todas las tareas de optimización...');
  try {
    // Limpieza de archivos temporales
    await DataUtils.cleanTempFiles(TEMP_DIR);

    // Optimización de memoria (simbólica en Node.js)
    DataUtils.forceGarbageCollection();

    // Aquí se podrían añadir otras optimizaciones futuras, como:
    // - Limpieza de caché de imágenes/videos
    // - Compactación de la base de datos SQLite (si es necesario y seguro)

    logger.info('✅ Todas las optimizaciones completadas.');
  } catch (error) {
    logger.error({ err: error }, '❌ Error durante la ejecución de optimizaciones.');
  }
};
