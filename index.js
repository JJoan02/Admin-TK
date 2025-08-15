// index.js

// Carga las variables de entorno del archivo .env al inicio de la aplicación.


// Importar cfonts para el título visual
import cfonts from 'cfonts';

// Importar el logger para mensajes de inicio
import { initializeLogger } from './src/utils/logger.js';
const logger = initializeLogger();

// Importar la función de inicio principal de la aplicación
import { startBot } from './src/start.js';

// Importar el servicio de notificación para reportar errores globales
import NotificationService from './src/services/NotificationService.js';
import Metrics from './src/utils/Metrics.js'; // Importar Metrics

// --- Manejo Global de Errores ---
// Captura excepciones síncronas no capturadas
process.on('uncaughtException', async (error, origin) => {
  logger.fatal({ err: error, origin }, '❌ [FATAL] Excepción no capturada detectada. El proceso terminará.');
  await NotificationService.notifyOwner(
    'Excepción no capturada (uncaughtException).',
    error,
    `Origen: ${origin}. El bot se cerrará.`
  );
  process.exit(1);
});

// Captura promesas rechazadas no manejadas
process.on('unhandledRejection', async (reason, promise) => {
  logger.fatal({ reason, promise }, '❌ [FATAL] Promesa rechazada no manejada detectada. El proceso terminará.');
  await NotificationService.notifyOwner(
    'Promesa rechazada no manejada (unhandledRejection).',
    reason instanceof Error ? reason : new Error(String(reason)),
    `Promesa: ${promise}. El bot se cerrará.`
  );
  process.exit(1);
});
// --- Fin Manejo Global de Errores ---

const main = async () => {
  console.clear();
  cfonts.say('Admin-TK', {
    font: 'block',
    align: 'center',
    colors: ['cyan', 'white'],
    background: 'transparent',
    space: true,
    maxLength: '0',
  });
  cfonts.say('Creado por JJoan02', {
    font: 'console',
    align: 'center',
    colors: ['yellow'],
  });

  logger.info('Iniciando Admin-TK...');

  try {
    Metrics.startLogging(); // Iniciar el registro de métricas
    await startBot();
    logger.info('✅ Admin-TK se ha iniciado correctamente y está en línea.');
  } catch (error) {
    logger.fatal({ err: error }, '❌ Error crítico durante el arranque de Admin-TK. El proceso terminará.');
    process.exit(1);
  }
};

main();
