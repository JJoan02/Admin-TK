// src/api/APIServer.ts - Servidor API REST

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer, Server } from 'http';
import { createModuleLogger } from '../utils/logger.js';
import { SubBotManager } from '../core/SubBotManager.js';
import { DatabaseService } from '../database/DatabaseService.js';
import { authRoutes } from './routes/auth.js';
import { botRoutes } from './routes/bots.js';
import { pluginRoutes } from './routes/plugins.js';
import { downloadRoutes } from './routes/downloads.js';
import { searchRoutes } from './routes/search.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import type { APIResponse } from '../types/index.js';

const moduleLogger = createModuleLogger('APIServer');

export class APIServer {
  private app: Express;
  private server: Server | null = null;
  private port: number;
  private subBotManager: SubBotManager;
  private databaseService: DatabaseService;

  constructor(subBotManager: SubBotManager, databaseService: DatabaseService) {
    this.app = express();
    this.port = parseInt(process.env.API_PORT || '3001');
    this.subBotManager = subBotManager;
    this.databaseService = databaseService;
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS
    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 requests por ventana
      message: {
        success: false,
        error: 'Too many requests, please try again later',
        retryAfter: '15 minutes'
      } as APIResponse,
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use(requestLogger);

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
        }
      } as APIResponse);
    });
  }

  private setupRoutes(): void {
    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/bots', botRoutes(this.subBotManager));
    this.app.use('/api/plugins', pluginRoutes);
    this.app.use('/api/downloads', downloadRoutes);
    this.app.use('/api/search', searchRoutes);

    // API documentation
    this.app.get('/api', (req: Request, res: Response) => {
      res.json({
        success: true,
        data: {
          name: 'Admin-TK API',
          version: '3.0.0',
          description: 'API REST para gestión de bots WhatsApp',
          endpoints: {
            auth: '/api/auth',
            bots: '/api/bots',
            plugins: '/api/plugins',
            downloads: '/api/downloads',
            search: '/api/search'
          },
          documentation: '/api/docs'
        }
      } as APIResponse);
    });

    // 404 handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `${req.method} ${req.originalUrl} not found`
      } as APIResponse);
    });
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = createServer(this.app);
        
        this.server.listen(this.port, () => {
          moduleLogger.info({ port: this.port }, 'API Server started successfully');
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
