// src/start.ts - Sistema de arranque legacy (migrado a TypeScript)

import DependencyContainer from './core/DependencyContainer.js';
import { initializeLogger, setConsoleSilentMode } from './utils/logger.js';
import config from '../config/config.js';

// Importaciones de todos los componentes
import DBService from './services/DBService.js';
import MemoryService from './ia/MemoryService.js';
import ErrorHandler from './core/ErrorHandler.js';
import SessionManager from './core/SessionManager.js';
import ConnectionManager from './core/ConnectionManager.js';
import LinkingManager from './core/LinkingManager.js';
import EventHandler from './core/EventHandler.js';
import WebServer from './core/WebServer.js';
import ShutdownManager from './core/ShutdownManager.js';

// Importaciones de servicios y manejadores
import AnalyticsService from './services/AnalyticsService.js';
import BackupService from './services/BackupService.js';
import ProactiveEngagementService from './services/ProactiveEngagementService.js';
import TranscriptionService from './services/TranscriptionService.js';
import UserManager from './core/UserManager.js';
import GroupManager from './core/GroupManager.js';
import ChatManager from './core/ChatManager.js';
import PluginLoader from './core/PluginLoader.js';
import AIService from './services/AIService.js';
import JobQueue from './core/JobQueue.js';
import CommandBus from './core/CommandBus.js';
import QueryBus from './core/QueryBus.js';
import MessageHandler from './handlers/MessageHandler.js';
import GroupHandler from './handlers/GroupHandler.js';
import MigrationRunner from './core/MigrationRunner.js';

// Importaciones de dependencias "hoja" (placeholders)
import RateLimiter from './services/RateLimiter.js';
import Breaker from './services/Breaker.js';
import PermissionValidator from './services/PermissionValidator.js';
import AIInterventionService from './services/AIInterventionService.js';
import Cache from './utils/Cache.js';
import printEvent from './utils/print.js';
import NotificationService from './services/NotificationService.js';
import AuthService from './services/AuthService.js';
import MonitoringService from './services/MonitoringService.js';

// Tipos
import type { Logger } from './types/global.js';
import type { WhatsAppSocket } from './types/global.js';

const logger: Logger = initializeLogger();

export const startBot = async () => {
  const container = DependencyContainer.getInstance();

  // --- FASE 1: REGISTRO DE DEPENDENCIAS ---
  // Registra todo antes de construir nada. El orden es crucial para
  // satisfacer las dependencias transitivas.
  try {
    // Nivel 0: Dependencias básicas o sin dependencias
    container.register('config', () => config);
    container.register('logger', () => logger);
    container.register('dbService', () => DBService); // Clase estática
    container.register('cache', Cache, { isSingleton: true });
    container.register('printEvent', () => printEvent);
    container.register('rateLimiter', RateLimiter, { isSingleton: true });
    container.register('breaker', Breaker, { isSingleton: true });
    container.register('permValidator', PermissionValidator, { isSingleton: true });
    container.register('aiInterventionService', AIInterventionService, { isSingleton: true });
    container.register('jobQueue', JobQueue, { isSingleton: true });
    container.register('correlation', () => ({ startCorrelation: () => 'test', endCorrelation: () => {} }), { isSingleton: true }); // Placeholder

    // Nivel 1: Dependen de Nivel 0
    container.register('notificationService', NotificationService, { dependencies: ['config', 'logger', 'whatsappClient'], isSingleton: true });
    container.register('errorHandler', ErrorHandler, { dependencies: ['logger', 'correlation', 'notificationService'], isSingleton: true });
    container.register('memoryService', MemoryService, { dependencies: ['dbService', 'logger', 'errorHandler'], isSingleton: true });
    container.register('userManager', UserManager, { dependencies: ['dbService', 'logger'], isSingleton: true });
    container.register('groupManager', GroupManager, { dependencies: ['dbService', 'logger'], isSingleton: true });
    container.register('chatManager', ChatManager, { dependencies: ['dbService', 'logger'], isSingleton: true });
    container.register('commandBus', CommandBus, { dependencies: ['logger', 'errorHandler'], isSingleton: true });
    container.register('queryBus', QueryBus, { dependencies: ['logger', 'errorHandler'], isSingleton: true });
    container.register('authService', AuthService, { dependencies: ['dbService', 'logger'], isSingleton: true }); // Registrar AuthService
    container.register('monitoringService', MonitoringService, { dependencies: ['webServer', 'logger'], isSingleton: true }); // Registrar MonitoringService

    // Nivel 2: Dependen de Nivel 1 (y Nivel 0)
    container.register('aiService', AIService, { dependencies: ['memoryService', 'config', 'logger', 'errorHandler'], isSingleton: true });
    container.register('analyticsService', AnalyticsService, { dependencies: ['dbService', 'logger'], isSingleton: true });
    container.register('transcriptionService', TranscriptionService, { dependencies: ['config', 'logger', 'errorHandler'], isSingleton: true });
    container.register('backupService', BackupService, { dependencies: ['logger', 'notificationService', 'config'], isSingleton: true });
    container.register('proactiveEngagementService', ProactiveEngagementService, { dependencies: ['dbService', 'logger', 'notificationService'], isSingleton: true });
    container.register('pluginLoader', PluginLoader, { dependencies: ['config', 'logger', 'errorHandler', 'container'], isSingleton: true });

    // Nivel 3: Manejadores de Mensajes y Grupos (dependen de Nivel 0, 1, 2)
    container.register('messageHandler', MessageHandler, { dependencies: ['config', 'logger', 'errorHandler', 'commandBus', 'rateLimiter', 'breaker', 'permValidator', 'aiInterventionService', 'userManager', 'groupManager', 'chatManager', 'aiService', 'pluginLoader', 'dbService', 'notificationService', 'cache', 'printEvent'], isSingleton: true });
    container.register('groupHandler', GroupHandler, { dependencies: ['groupManager', 'logger', 'config', 'errorHandler'], isSingleton: true });

    // Nivel 4: EventHandler y componentes de conexión (dependen de Nivel 3 y anteriores)
    container.register('eventHandler', EventHandler, { dependencies: ['logger', 'errorHandler', 'messageHandler', 'groupHandler', 'notificationService', 'printEvent'], isSingleton: true });
    container.register('sessionManager', SessionManager, { dependencies: ['logger'], isSingleton: true });
    container.register('connectionManager', ConnectionManager, { dependencies: ['sessionManager', 'eventHandler', 'logger', 'config'], isSingleton: true });
    container.register('linkingManager', LinkingManager, { dependencies: ['connectionManager', 'sessionManager', 'logger'], isSingleton: true });
    container.register('shutdownManager', ShutdownManager, { isSingleton: true });

  } catch (error) {
    logger.fatal({ err: error }, 'Error fatal durante el registro de dependencias.');
    process.exit(1);
  }

  // --- FASE 2: INICIALIZACIÓN Y ARRANQUE ---
  try {
    // Obtener ShutdownManager y registrar listeners de proceso UNA SOLA VEZ
    const shutdownManager = container.resolve('shutdownManager');
    process.on('SIGINT', () => shutdownManager.shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdownManager.shutdown('SIGTERM'));
    process.on('exit', (code) => {
      logger.info(`El proceso del bot ha finalizado con el código: ${code}.`);
    });

    // Activar modo silencioso para la consola durante la inicialización
    setConsoleSilentMode(true);

    // Inicialización silenciosa de servicios críticos
    await DBService.init();
    const memoryService = new MemoryService(DBService, logger, container.resolve('errorHandler'));
    await memoryService.init();

    const webServer = new WebServer();
    // Inyectar AuthService en WebServer
    webServer.setAuthService(container.resolve('authService'));
    container.register('webServer', () => webServer, { isSingleton: true }); // Registrar webServer en el contenedor
    webServer.start(); // Iniciar el servidor web temprano

    // Iniciar el servicio de monitoreo
    const monitoringService = container.resolve('monitoringService');
    monitoringService.startMonitoring();

    // Desactivar modo silencioso y limpiar la consola antes de la interacción.
    setConsoleSilentMode(false);
    console.clear();

    // Iniciar el proceso de vinculación, que ahora tiene el control total de la consola.
    const linkingManager = container.resolve('linkingManager');
    const sock = await linkingManager.start();

    // Registrar la instancia de sock (whatsappClient) en el contenedor
    container.register('whatsappClient', () => sock, { isSingleton: true });

    // --- REGISTRAR MANEJADORES DE EVENTOS DE WHATSAPP --- //
    const eventHandler = container.resolve('eventHandler');
    eventHandler.register(sock);

    console.clear(); // Limpiar de nuevo después de la vinculación
    logger.info('✅ Vinculación completada. El bot está en línea.');

  } catch (error) {
    logger.fatal({ err: error }, '❌ No se pudieron iniciar los servicios principales del bot. El proceso terminará.');
    process.exit(1);
  }
};