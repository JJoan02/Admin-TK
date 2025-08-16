// src/core/AdminTKServer.ts - Servidor principal del sistema

import { EventEmitter } from 'events';
import { createModuleLogger } from '../utils/logger.js';
import { SubBotManager } from './SubBotManager.js';
import { APIServer } from '../api/APIServer.js';
import { DashboardServer } from './DashboardServer.js';
import { DatabaseService } from '../database/DatabaseService.js';
import domainConfig from '../../config/config.js';

const moduleLogger = createModuleLogger('AdminTKServer');

export class AdminTKServer extends EventEmitter {
  private subBotManager: SubBotManager;
  private apiServer: APIServer;
  private dashboardServer: DashboardServer;
  private databaseService: DatabaseService;
  private isInitialized = false;
  private isStarted = false;

  constructor() {
    super();
    
    // Inicializar componentes básicos
    this.subBotManager = new SubBotManager();
    this.databaseService = DatabaseService.getInstance();
    this.apiServer = new APIServer(this.subBotManager, this.databaseService);
    this.dashboardServer = new DashboardServer(this.subBotManager);

    // Configurar manejo de señales de cierre
    process.on('SIGINT', () => this.gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      moduleLogger.warn('Server already initialized');
      return;
    }

    try {
      moduleLogger.info('🔧 Initializing Admin-TK Server...');
      moduleLogger.info(`🌐 Domain: ${domainConfig.domain}`);
      moduleLogger.info(`📍 VPS IP: ${domainConfig.vpsIP}`);

      // 1. Inicializar base de datos
      moduleLogger.info('📊 Initializing database...');
      await this.databaseService.initialize();

      // 2. Inicializar gestor de sub-bots
      moduleLogger.info('🤖 Initializing sub-bot manager...');
      await this.subBotManager.initialize();

      // 3. Configurar eventos
      this.setupEventHandlers();

      this.isInitialized = true;
      moduleLogger.info('✅ Admin-TK Server initialized successfully');

    } catch (error) {
      moduleLogger.error({ error }, '❌ Failed to initialize Admin-TK Server');
      throw error;
    }
  }

  async start(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isStarted) {
      moduleLogger.warn('Server already started');
      return;
    }

    try {
      moduleLogger.info('🚀 Starting Admin-TK Server...');

      // 1. Iniciar Dashboard Server (PRIORIDAD)
      moduleLogger.info('💻 Starting dashboard server...');
      await this.dashboardServer.start();
      
      const protocol = domainConfig.ssl.enabled ? 'https' : 'http';
      const port = domainConfig.ports.dashboard !== 80 && domainConfig.ports.dashboard !== 443 
        ? `:${domainConfig.ports.dashboard}` 
        : '';
      
      moduleLogger.info(`✅ Dashboard disponible en: ${protocol}://${domainConfig.domain}${port}`);

      // 2. Iniciar API Server
      moduleLogger.info('🌐 Starting API server...');
      await this.apiServer.start();

      this.isStarted = true;
      this.emit('started');
      
      moduleLogger.info('✅ Admin-TK Server started successfully');
      moduleLogger.info('🎯 Sistema listo para usar!');

    } catch (error) {
      moduleLogger.error({ error }, '❌ Failed to start Admin-TK Server');
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    if (!this.isStarted) {
      return;
    }

    try {
      moduleLogger.info('🛑 Shutting down Admin-TK Server...');

      // 1. Detener sub-bots
      if (this.subBotManager.stopAllBots) {
        await this.subBotManager.stopAllBots();
      }

      // 2. Detener servidores
      await Promise.all([
        this.apiServer.stop(),
        this.dashboardServer.stop()
      ]);

      // 3. Cerrar base de datos
      if (this.databaseService.close) {
        await this.databaseService.close();
      }

      this.isStarted = false;
      this.emit('stopped');
      
      moduleLogger.info('✅ Admin-TK Server shut down successfully');

    } catch (error) {
      moduleLogger.error({ error }, '❌ Error during server shutdown');
      throw error;
    }
  }

  private async gracefulShutdown(signal: string): Promise<void> {
    moduleLogger.info(`📡 Received ${signal}, shutting down gracefully...`);
    
    try {
      await this.shutdown();
      process.exit(0);
    } catch (error) {
      moduleLogger.error({ error }, 'Error during graceful shutdown');
      process.exit(1);
    }
  }

  private setupEventHandlers(): void {
    // Eventos del gestor de sub-bots (si existen)
    if (this.subBotManager.on) {
      this.subBotManager.on('botStatusChanged', (botId: string, status: string) => {
        this.emit('botStatusChanged', { botId, status });
        moduleLogger.info({ botId, status }, 'Bot status changed');
        
        // Notificar al dashboard
        this.dashboardServer.broadcastBotStatusChange(botId, status);
      });

      this.subBotManager.on('botError', (botId: string, error: Error) => {
        this.emit('botError', { botId, error });
        moduleLogger.error({ botId, error }, 'Bot error occurred');
      });
    }

    moduleLogger.debug('Event handlers configured');
  }

  // Getters para acceso a componentes
  get bots(): SubBotManager {
    return this.subBotManager;
  }

  get database(): DatabaseService {
    return this.databaseService;
  }

  get api(): APIServer {
    return this.apiServer;
  }

  get dashboard(): DashboardServer {
    return this.dashboardServer;
  }

  // Estado del servidor
  get isReady(): boolean {
    return this.isInitialized && this.isStarted;
  }

  get status(): string {
    if (!this.isInitialized) return 'not_initialized';
    if (!this.isStarted) return 'initialized';
    return 'running';
  }

  // Información del sistema
  get info() {
    return {
      domain: domainConfig.domain,
      vpsIP: domainConfig.vpsIP,
      dashboardPort: domainConfig.ports.dashboard,
      apiPort: domainConfig.ports.api,
      status: this.status,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };
  }
}

export default AdminTKServer;
