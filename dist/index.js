// index.ts - Punto de entrada principal Admin-TK v3.0
import cfonts from 'cfonts';
import { config } from 'dotenv';
import { AdminTKServer } from './src/core/AdminTKServer.js';
import { logger } from './src/utils/logger.js';
import { gracefulShutdown } from './src/utils/gracefulShutdown.js';
// Cargar variables de entorno
config();
// Manejo global de errores
process.on('uncaughtException', async (error, origin) => {
    logger.fatal({ err: error, origin }, '❌ [FATAL] Excepción no capturada detectada. El proceso terminará.');
    process.exit(1);
});
process.on('unhandledRejection', async (reason, promise) => {
    logger.fatal({ reason, promise }, '❌ [FATAL] Promesa rechazada no manejada detectada. El proceso terminará.');
    process.exit(1);
});
// Manejo de señales de cierre
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
async function main() {
    try {
        // Limpiar consola y mostrar banner
        console.clear();
        cfonts.say('Admin-TK v3.0', {
            font: 'block',
            align: 'center',
            colors: ['cyan', 'white'],
            background: 'transparent',
            space: true,
            maxLength: '0',
        });
        cfonts.say('Sistema Completo de Gestión', {
            font: 'console',
            align: 'center',
            colors: ['yellow'],
        });
        cfonts.say('Creado por JJoan02', {
            font: 'console',
            align: 'center',
            colors: ['green'],
        });
        logger.info('🚀 Iniciando Admin-TK v3.0...');
        // Inicializar servidor principal
        const server = new AdminTKServer();
        await server.initialize();
        await server.start();
        logger.info('✅ Admin-TK v3.0 iniciado exitosamente');
        logger.info('🌐 Panel web disponible en: http://localhost:3000');
        logger.info('🔌 API disponible en: http://localhost:3001');
    }
    catch (error) {
        logger.fatal({ err: error }, '❌ Error crítico durante el arranque de Admin-TK. El proceso terminará.');
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map