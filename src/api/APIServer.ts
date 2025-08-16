// src/api/APIServer.ts - Servidor API REST

import express, { Express, Request, Response, NextFunction } from 'express';
import { createServer, Server } from 'http';
import { createModuleLogger } from '../utils/logger.js';
import { SubBotManager } from '../core/SubBotManager.js';
import { DatabaseService } from '../database/DatabaseService.js';
import { InternalAPIService } from './InternalAPIService.js';
import path from 'path';

const moduleLogger = createModuleLogger('APIServer');

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export class APIServer {
  private app: Express;
  private server: Server | null = null;
  private port: number;
  private subBotManager: SubBotManager;
  private databaseService: DatabaseService;
  private internalAPIService: InternalAPIService;

  constructor(subBotManager: SubBotManager, databaseService: DatabaseService) {
    this.app = express();
    this.port = parseInt(process.env.API_PORT || '3001');
    this.subBotManager = subBotManager;
    this.databaseService = databaseService;
    this.internalAPIService = InternalAPIService.getInstance();
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // CORS básico
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
      
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
      }
      
      next();
    });

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging básico
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      moduleLogger.debug(`${req.method} ${req.path}`);
      next();
    });

    // Health check
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          version: process.env.npm_package_version || '1.0.0'
        },
        timestamp: new Date().toISOString()
      } as APIResponse);
    });
  }

  private setupRoutes(): void {
    // Servir archivos estáticos
    this.app.use('/static', express.static(path.join(process.cwd(), 'public')));
    
    // Ruta para la interfaz de API interna
    this.app.get('/internal-api', (req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), 'public', 'api.html'));
    });

    // Nuevos endpoints de traducción
    this.setupTranslationRoutes();

    // API documentation
    this.app.get('/api', (req: Request, res: Response) => {
      res.json({
        success: true,
        data: {
          name: 'Admin-TK API',
          version: '3.0.0',
          description: 'API REST para gestión de bots WhatsApp y servicios de traducción',
          endpoints: {
            translate: '/api/translate',
            detectLanguage: '/api/detect-language',
            languages: '/api/languages',
            translateBatch: '/api/translate-batch',
            stats: '/api/stats'
          },
          webInterface: '/internal-api',
          documentation: '/api/docs'
        },
        timestamp: new Date().toISOString()
      } as APIResponse);
    });

    // 404 handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `${req.method} ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
      } as APIResponse);
    });
  }

  private setupTranslationRoutes(): void {
    // Endpoint para traducir texto
    this.app.post('/api/translate', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { text, to, from = 'auto' } = req.body;

        if (!text || !to) {
          return res.status(400).json({
            success: false,
            error: 'Missing required parameters',
            message: 'Both "text" and "to" parameters are required',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        if (typeof text !== 'string' || typeof to !== 'string') {
          return res.status(400).json({
            success: false,
            error: 'Invalid parameter types',
            message: 'Parameters "text" and "to" must be strings',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        if (text.length > 5000) {
          return res.status(400).json({
            success: false,
            error: 'Text too long',
            message: 'Text must be less than 5000 characters',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        const result = await this.internalAPIService.translateText(text, to, from);

        res.json({
          success: true,
          data: result,
          timestamp: new Date().toISOString()
        } as APIResponse);

      } catch (error) {
        moduleLogger.error({ error, body: req.body }, 'Translation error');
        res.status(500).json({
          success: false,
          error: 'Translation failed',
          message: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        } as APIResponse);
      }
    });

    // Endpoint para detectar idioma
    this.app.post('/api/detect-language', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { text } = req.body;

        if (!text) {
          return res.status(400).json({
            success: false,
            error: 'Missing required parameter',
            message: 'Parameter "text" is required',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        if (typeof text !== 'string') {
          return res.status(400).json({
            success: false,
            error: 'Invalid parameter type',
            message: 'Parameter "text" must be a string',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        if (text.length > 1000) {
          return res.status(400).json({
            success: false,
            error: 'Text too long',
            message: 'Text must be less than 1000 characters for language detection',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        const language = await this.internalAPIService.detectLanguage(text);

        res.json({
          success: true,
          data: { language },
          timestamp: new Date().toISOString()
        } as APIResponse);

      } catch (error) {
        moduleLogger.error({ error, body: req.body }, 'Language detection error');
        res.status(500).json({
          success: false,
          error: 'Language detection failed',
          message: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        } as APIResponse);
      }
    });

    // Endpoint para obtener idiomas soportados
    this.app.get('/api/languages', (req: Request, res: Response) => {
      try {
        const languages = this.internalAPIService.getSupportedLanguages();

        res.json({
          success: true,
          data: {
            languages,
            total: languages.length
          },
          timestamp: new Date().toISOString()
        } as APIResponse);

      } catch (error) {
        moduleLogger.error({ error }, 'Error getting supported languages');
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: 'Failed to get supported languages',
          timestamp: new Date().toISOString()
        } as APIResponse);
      }
    });

    // Endpoint para traducción por lotes
    this.app.post('/api/translate-batch', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { texts, to, from = 'auto' } = req.body;

        if (!texts || !to) {
          return res.status(400).json({
            success: false,
            error: 'Missing required parameters',
            message: 'Both "texts" and "to" parameters are required',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        if (!Array.isArray(texts)) {
          return res.status(400).json({
            success: false,
            error: 'Invalid parameter type',
            message: 'Parameter "texts" must be an array',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        if (texts.length > 10) {
          return res.status(400).json({
            success: false,
            error: 'Too many texts',
            message: 'Maximum 10 texts allowed per batch',
            timestamp: new Date().toISOString()
          } as APIResponse);
        }

        const results = await this.internalAPIService.translateBatch(texts, to, from);

        res.json({
          success: true,
          data: {
            results,
            total: results.length
          },
          timestamp: new Date().toISOString()
        } as APIResponse);

      } catch (error) {
        moduleLogger.error({ error, body: req.body }, 'Batch translation error');
        res.status(500).json({
          success: false,
          error: 'Batch translation failed',
          message: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        } as APIResponse);
      }
    });

    // Endpoint para estadísticas de la API
    this.app.get('/api/stats', (req: Request, res: Response) => {
      try {
        const stats = this.internalAPIService.getAPIStats();

        res.json({
          success: true,
          data: {
            stats,
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
          },
          timestamp: new Date().toISOString()
        } as APIResponse);

      } catch (error) {
        moduleLogger.error({ error }, 'Error getting API stats');
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: 'Failed to get API statistics',
          timestamp: new Date().toISOString()
        } as APIResponse);
      }
    });
  }

  private setupErrorHandling(): void {
    // Error handler básico
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      moduleLogger.error({ error, path: req.path }, 'API Error');
      
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        timestamp: new Date().toISOString()
      } as APIResponse);
    });
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = createServer(this.app);
        
        this.server.listen(this.port, () => {
          moduleLogger.info({ port: this.port }, 'API Server started successfully');
          moduleLogger.info(`🌐 API disponible en: http://localhost:${this.port}/api`);
          moduleLogger.info(`🖥️ Interfaz web en: http://localhost:${this.port}/internal-api`);
          resolve();
        });

        this.server.on('error', (error: Error) => {
          moduleLogger.error({ error, port: this.port }, 'Failed to start API Server');
          reject(error);
        });

      } catch (error) {
        moduleLogger.error({ error }, 'Error starting API Server');
        reject(error);
      }
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          moduleLogger.info('API Server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  get isRunning(): boolean {
    return this.server !== null && this.server.listening;
  }

  get address(): string | null {
    if (!this.server || !this.server.listening) {
      return null;
    }
    
    const addr = this.server.address();
    if (typeof addr === 'string') {
      return addr;
    }
    
    return addr ? `http://localhost:${addr.port}` : null;
  }
}

export default APIServer;
