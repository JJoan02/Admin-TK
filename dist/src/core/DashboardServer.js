// src/core/DashboardServer.ts - Servidor de Dashboard para SubBots
import express from 'express';
import { createServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { Server as SocketIOServer } from 'socket.io';
import { readFileSync } from 'fs';
import { createModuleLogger } from '../utils/logger.js';
import domainConfig from '../../config/domain.config.js';
const logger = createModuleLogger('DashboardServer');
export class DashboardServer {
    app;
    server = null;
    io = null;
    port;
    subBotManager;
    connectedClients = new Map();
    useSSL;
    constructor(subBotManager) {
        this.app = express();
        this.port = domainConfig.ports.dashboard;
        this.subBotManager = subBotManager;
        this.useSSL = domainConfig.ssl.enabled;
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }
    /**
     * Configura middlewares básicos
     */
    setupMiddleware() {
        // CORS configuration
        this.app.use((req, res, next) => {
            const origin = req.headers.origin;
            if (domainConfig.allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
                return;
            }
            next();
        });
        // Security headers
        this.app.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('X-XSS-Protection', '1; mode=block');
            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
            next();
        });
        // Body parsing
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        // Static files
        this.app.use('/static', express.static('public'));
        this.app.use('/assets', express.static('assets'));
        this.app.use('/', express.static('public'));
        // Request logging
        this.app.use((req, res, next) => {
            logger.info({
                method: req.method,
                url: req.url,
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                domain: req.get('Host')
            }, 'Dashboard request');
            next();
        });
    }
    /**
     * Configura rutas del dashboard
     */
    setupRoutes() {
        // Página principal del dashboard
        this.app.get('/', (req, res) => {
            res.send(this.generateDashboardHTML());
        });
        // API para obtener estadísticas
        this.app.get('/api/stats', async (req, res) => {
            try {
                const stats = await this.getDashboardStats();
                res.json({
                    success: true,
                    data: stats
                });
            }
            catch (error) {
                logger.error({ err: error }, 'Error obteniendo estadísticas');
                res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }
        });
        // API para obtener lista de bots
        this.app.get('/api/bots', async (req, res) => {
            try {
                const bots = this.subBotManager.getAllBots();
                res.json({
                    success: true,
                    data: bots
                });
            }
            catch (error) {
                logger.error({ err: error }, 'Error obteniendo lista de bots');
                res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor'
                });
            }
        });
        // API para crear nuevo bot
        this.app.post('/api/bots', async (req, res) => {
            try {
                const { name, phoneNumber, userId } = req.body;
                if (!name || !phoneNumber || !userId) {
                    return res.status(400).json({
                        success: false,
                        error: 'Faltan campos requeridos: name, phoneNumber, userId'
                    });
                }
                const botConfig = {
                    name,
                    phoneNumber,
                    userId,
                    status: 'offline',
                    config: {
                        prefix: '.',
                        language: 'es',
                        enabledPlugins: [],
                        adminNumbers: [],
                        groupSettings: {
                            allowGroups: true,
                            autoJoin: false,
                            maxGroups: 10,
                            antiSpam: false,
                            antiLink: false,
                            welcome: true,
                            autoAdmin: false,
                            maxWarnings: 3
                        },
                        apiSettings: {
                            enabled: false,
                            port: 3001,
                            enableInternalAPI: false,
                            allowedOrigins: ['*'],
                            rateLimits: {
                                perMinute: 60,
                                perHour: 1000,
                                perDay: 10000
                            }
                        }
                    }
                };
                const botId = await this.subBotManager.createBot(botConfig);
                res.json({
                    success: true,
                    data: { botId },
                    message: 'Bot creado exitosamente'
                });
            }
            catch (error) {
                logger.error({ err: error }, 'Error creando bot');
                res.status(500).json({
                    success: false,
                    error: 'Error al crear el bot'
                });
            }
        });
        // API para iniciar bot
        this.app.post('/api/bots/:botId/start', async (req, res) => {
            try {
                const botId = req.params.botId;
                if (!botId) {
                    return res.status(400).json({
                        success: false,
                        error: 'Bot ID requerido'
                    });
                }
                await this.subBotManager.startBot(botId);
                res.json({
                    success: true,
                    message: 'Bot iniciado exitosamente'
                });
            }
            catch (error) {
                logger.error({ err: error, botId: req.params.botId }, 'Error iniciando bot');
                res.status(500).json({
                    success: false,
                    error: 'Error al iniciar el bot'
                });
            }
        });
        // API para detener bot
        this.app.post('/api/bots/:botId/stop', async (req, res) => {
            try {
                const botId = req.params.botId;
                if (!botId) {
                    return res.status(400).json({
                        success: false,
                        error: 'Bot ID requerido'
                    });
                }
                await this.subBotManager.stopBot(botId);
                res.json({
                    success: true,
                    message: 'Bot detenido exitosamente'
                });
            }
            catch (error) {
                logger.error({ err: error, botId: req.params.botId }, 'Error deteniendo bot');
                res.status(500).json({
                    success: false,
                    error: 'Error al detener el bot'
                });
            }
        });
        // API para obtener logs de bot
        this.app.get('/api/bots/:botId/logs', async (req, res) => {
            try {
                const botId = req.params.botId;
                const { limit = '100' } = req.query;
                if (!botId) {
                    return res.status(400).json({
                        success: false,
                        error: 'Bot ID requerido'
                    });
                }
                // TODO: Implementar obtención de logs
                const logs = []; // await this.getBotLogs(botId, parseInt(limit as string));
                res.json({
                    success: true,
                    data: logs
                });
            }
            catch (error) {
                logger.error({ err: error, botId: req.params.botId }, 'Error obteniendo logs');
                res.status(500).json({
                    success: false,
                    error: 'Error al obtener logs'
                });
            }
        });
        // API para vincular bot (QR Code)
        this.app.get('/api/bots/:botId/qr', async (req, res) => {
            try {
                const botId = req.params.botId;
                if (!botId) {
                    return res.status(400).json({
                        success: false,
                        error: 'Bot ID requerido'
                    });
                }
                // TODO: Generar QR code para vinculación
                const qrCode = await this.generateBotQRCode(botId);
                res.json({
                    success: true,
                    data: { qrCode },
                    message: 'QR Code generado'
                });
            }
            catch (error) {
                logger.error({ err: error, botId: req.params.botId }, 'Error generando QR');
                res.status(500).json({
                    success: false,
                    error: 'Error al generar QR Code'
                });
            }
        });
        // API para obtener información de un bot específico
        this.app.get('/api/bots/:botId', async (req, res) => {
            try {
                const botId = req.params.botId;
                if (!botId) {
                    return res.status(400).json({
                        success: false,
                        error: 'Bot ID requerido'
                    });
                }
                const bot = this.subBotManager.getBot(botId);
                if (!bot) {
                    return res.status(404).json({
                        success: false,
                        error: 'Bot no encontrado'
                    });
                }
                res.json({
                    success: true,
                    data: bot
                });
            }
            catch (error) {
                logger.error({ err: error, botId: req.params.botId }, 'Error obteniendo bot');
                res.status(500).json({
                    success: false,
                    error: 'Error al obtener información del bot'
                });
            }
        });
        // Página de vinculación de bot
        this.app.get('/link/:botId', (req, res) => {
            const botId = req.params.botId;
            if (!botId) {
                return res.status(400).send('Bot ID requerido');
            }
            res.send(this.generateLinkPageHTML(botId));
        });
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({
                success: true,
                data: {
                    status: 'healthy',
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime(),
                    memory: process.memoryUsage()
                }
            });
        });
        // 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).json({
                success: false,
                error: 'Endpoint no encontrado'
            });
        });
    }
    /**
     * Configura manejo de errores
     */
    setupErrorHandling() {
        this.app.use((error, req, res, next) => {
            logger.error({ err: error, url: req.url }, 'Error en dashboard');
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        });
    }
    /**
     * Configura WebSocket para tiempo real
     */
    setupWebSocket() {
        if (!this.server)
            return;
        this.io = new SocketIOServer(this.server, {
            cors: {
                origin: domainConfig.allowedOrigins,
                methods: ['GET', 'POST'],
                credentials: true
            },
            transports: ['websocket', 'polling']
        });
        this.io.on('connection', (socket) => {
            logger.info({ socketId: socket.id }, 'Cliente conectado al dashboard');
            this.connectedClients.set(socket.id, {
                id: socket.id,
                connectedAt: new Date(),
                lastActivity: new Date()
            });
            // Enviar estadísticas iniciales
            this.sendStatsToClient(socket);
            // Manejar suscripción a logs de bot
            socket.on('subscribe-bot-logs', (botId) => {
                socket.join(`bot-logs-${botId}`);
                logger.debug({ socketId: socket.id, botId }, 'Cliente suscrito a logs de bot');
            });
            // Manejar desuscripción
            socket.on('unsubscribe-bot-logs', (botId) => {
                socket.leave(`bot-logs-${botId}`);
                logger.debug({ socketId: socket.id, botId }, 'Cliente desuscrito de logs de bot');
            });
            // Manejar desconexión
            socket.on('disconnect', () => {
                this.connectedClients.delete(socket.id);
                logger.info({ socketId: socket.id }, 'Cliente desconectado del dashboard');
            });
        });
        // Enviar estadísticas cada 5 segundos
        setInterval(() => {
            this.broadcastStats();
        }, 5000);
    }
    /**
     * Inicia el servidor de dashboard
     */
    async start() {
        return new Promise((resolve, reject) => {
            try {
                // Crear servidor HTTP o HTTPS según configuración
                if (this.useSSL) {
                    try {
                        const sslOptions = {
                            cert: readFileSync(domainConfig.ssl.certPath),
                            key: readFileSync(domainConfig.ssl.keyPath)
                        };
                        this.server = createHttpsServer(sslOptions, this.app);
                        logger.info('Dashboard Server configurado con SSL/HTTPS');
                    }
                    catch (sslError) {
                        logger.warn({ err: sslError }, 'No se pudo cargar certificados SSL, usando HTTP');
                        this.server = createServer(this.app);
                        this.useSSL = false;
                    }
                }
                else {
                    this.server = createServer(this.app);
                }
                this.server.listen(this.port, '0.0.0.0', () => {
                    const protocol = this.useSSL ? 'https' : 'http';
                    logger.info({
                        port: this.port,
                        domain: domainConfig.domain,
                        protocol,
                        url: `${protocol}://${domainConfig.domain}${this.port !== 80 && this.port !== 443 ? ':' + this.port : ''}`
                    }, 'Dashboard Server iniciado');
                    // Configurar WebSocket después de que el servidor esté escuchando
                    this.setupWebSocket();
                    resolve();
                });
                this.server.on('error', (error) => {
                    logger.error({ err: error, port: this.port }, 'Error al iniciar Dashboard Server');
                    reject(error);
                });
            }
            catch (error) {
                logger.error({ err: error }, 'Error configurando Dashboard Server');
                reject(error);
            }
        });
    }
    /**
     * Detiene el servidor de dashboard
     */
    async stop() {
        return new Promise((resolve) => {
            if (this.io) {
                this.io.close();
                this.io = null;
            }
            if (this.server) {
                this.server.close(() => {
                    logger.info('Dashboard Server detenido');
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
    /**
     * Obtiene estadísticas del dashboard
     */
    async getDashboardStats() {
        const allBots = this.subBotManager.getAllBots();
        const activeBots = allBots.filter(bot => bot.status === 'online');
        return {
            totalBots: allBots.length,
            activeBots: activeBots.length,
            totalUsers: this.connectedClients.size,
            activeUsers: this.connectedClients.size,
            systemUptime: process.uptime(),
            memoryUsage: process.memoryUsage()
        };
    }
    /**
     * Envía estadísticas a un cliente específico
     */
    async sendStatsToClient(socket) {
        try {
            const stats = await this.getDashboardStats();
            socket.emit('stats-update', stats);
        }
        catch (error) {
            logger.error({ err: error }, 'Error enviando estadísticas a cliente');
        }
    }
    /**
     * Transmite estadísticas a todos los clientes conectados
     */
    async broadcastStats() {
        if (!this.io)
            return;
        try {
            const stats = await this.getDashboardStats();
            this.io.emit('stats-update', stats);
        }
        catch (error) {
            logger.error({ err: error }, 'Error transmitiendo estadísticas');
        }
    }
    /**
     * Transmite log de bot a clientes suscritos
     */
    broadcastBotLog(botId, logEntry) {
        if (!this.io)
            return;
        this.io.to(`bot-logs-${botId}`).emit('bot-log', {
            botId,
            timestamp: new Date(),
            ...logEntry
        });
    }
    /**
     * Transmite cambio de estado de bot
     */
    broadcastBotStatusChange(botId, status) {
        if (!this.io)
            return;
        this.io.emit('bot-status-change', {
            botId,
            status,
            timestamp: new Date()
        });
    }
    /**
     * Genera QR Code para vinculación de bot
     */
    async generateBotQRCode(botId) {
        // TODO: Implementar generación de QR Code real
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
    }
    /**
     * Genera HTML del dashboard principal
     */
    generateDashboardHTML() {
        return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin-TK Dashboard - ${domainConfig.domain}</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .header h1 {
            color: #667eea;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .header p {
            color: #666;
            font-size: 1.1rem;
        }
        
        .domain-info {
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid #667eea;
            border-radius: 8px;
            padding: 10px;
            margin-top: 15px;
            font-size: 0.9rem;
            color: #667eea;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-card i {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: #667eea;
        }
        
        .stat-card h3 {
            font-size: 2rem;
            color: #333;
            margin-bottom: 5px;
        }
        
        .stat-card p {
            color: #666;
            font-size: 1rem;
        }
        
        .bots-section {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .section-header h2 {
            color: #333;
            font-size: 1.8rem;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .bots-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .bot-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #667eea;
        }
        
        .bot-card h4 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .bot-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-online {
            background: #d4edda;
            color: #155724;
        }
        
        .status-offline {
            background: #f8d7da;
            color: #721c24;
        }
        
        .status-connecting {
            background: #fff3cd;
            color: #856404;
        }
        
        .loading {
            text-align: center;
            padding: 50px;
            color: #666;
        }
        
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .dashboard-container {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="header">
            <h1><i class="fas fa-robot"></i> Admin-TK Dashboard</h1>
            <p>Panel de Control de SubBots - Gestiona todos tus bots desde aquí</p>
            <div class="domain-info">
                <i class="fas fa-globe"></i> Ejecutándose en: ${domainConfig.domain} | IP: ${domainConfig.vpsIP}
            </div>
        </div>
        
        <div class="stats-grid" id="statsGrid">
            <div class="loading">
                <div class="spinner"></div>
                <p>Cargando estadísticas...</p>
            </div>
        </div>
        
        <div class="bots-section">
            <div class="section-header">
                <h2><i class="fas fa-list"></i> Mis Bots</h2>
                <button class="btn" onclick="createNewBot()">
                    <i class="fas fa-plus"></i> Crear Nuevo Bot
                </button>
            </div>
            
            <div class="bots-grid" id="botsGrid">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Cargando bots...</p>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.js"></script>
    <script>
        // Conectar a WebSocket
        const socket = io();
        
        // Cargar datos iniciales
        loadStats();
        loadBots();
        
        // Escuchar actualizaciones en tiempo real
        socket.on('stats-update', updateStats);
        socket.on('bot-status-change', handleBotStatusChange);
        
        async function loadStats() {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();
                
                if (data.success) {
                    updateStats(data.data);
                }
            } catch (error) {
                console.error('Error cargando estadísticas:', error);
            }
        }
        
        async function loadBots() {
            try {
                const response = await fetch('/api/bots');
                const data = await response.json();
                
                if (data.success) {
                    updateBotsGrid(data.data);
                }
            } catch (error) {
                console.error('Error cargando bots:', error);
            }
        }
        
        function updateStats(stats) {
            const statsGrid = document.getElementById('statsGrid');
            statsGrid.innerHTML = \`
                <div class="stat-card">
                    <i class="fas fa-robot"></i>
                    <h3>\${stats.totalBots}</h3>
                    <p>Total Bots</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-play-circle"></i>
                    <h3>\${stats.activeBots}</h3>
                    <p>Bots Activos</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>\${stats.activeUsers}</h3>
                    <p>Usuarios Conectados</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-clock"></i>
                    <h3>\${formatUptime(stats.systemUptime)}</h3>
                    <p>Tiempo Activo</p>
                </div>
            \`;
        }
        
        function updateBotsGrid(bots) {
            const botsGrid = document.getElementById('botsGrid');
            
            if (bots.length === 0) {
                botsGrid.innerHTML = \`
                    <div style="grid-column: 1 / -1; text-align: center; padding: 50px; color: #666;">
                        <i class="fas fa-robot" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                        <h3>No tienes bots creados</h3>
                        <p>Crea tu primer bot para comenzar</p>
                    </div>
                \`;
                return;
            }
            
            botsGrid.innerHTML = bots.map(bot => \`
                <div class="bot-card">
                    <h4>\${bot.name}</h4>
                    <p><strong>Teléfono:</strong> \${bot.phoneNumber}</p>
                    <p><strong>Estado:</strong> <span class="bot-status status-\${bot.status}">\${bot.status}</span></p>
                    <p><strong>Creado:</strong> \${new Date(bot.createdAt).toLocaleDateString()}</p>
                    <div style="margin-top: 15px;">
                        <button class="btn" onclick="manageBot('\${bot.id}')" style="margin-right: 10px;">
                            <i class="fas fa-cog"></i> Gestionar
                        </button>
                        \${bot.status === 'offline' ? 
                            \`<button class="btn" onclick="startBot('\${bot.id}')"><i class="fas fa-play"></i> Iniciar</button>\` :
                            \`<button class="btn" onclick="stopBot('\${bot.id}')"><i class="fas fa-stop"></i> Detener</button>\`
                        }
                    </div>
                </div>
            \`).join('');
        }
        
        function handleBotStatusChange(data) {
            // Recargar lista de bots cuando cambie el estado
            loadBots();
        }
        
        function formatUptime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return \`\${hours}h \${minutes}m\`;
        }
        
        async function createNewBot() {
            const name = prompt('Nombre del bot:');
            const phoneNumber = prompt('Número de teléfono (con código de país):');
            
            if (!name || !phoneNumber) return;
            
            try {
                const response = await fetch('/api/bots', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        phoneNumber,
                        userId: 'current-user' // TODO: Obtener del usuario autenticado
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Bot creado exitosamente');
                    loadBots();
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error creando bot: ' + error.message);
            }
        }
        
        async function startBot(botId) {
            try {
                const response = await fetch(\`/api/bots/\${botId}/start\`, {
                    method: 'POST'
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Bot iniciado exitosamente');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error iniciando bot: ' + error.message);
            }
        }
        
        async function stopBot(botId) {
            try {
                const response = await fetch(\`/api/bots/\${botId}/stop\`, {
                    method: 'POST'
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Bot detenido exitosamente');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error deteniendo bot: ' + error.message);
            }
        }
        
        function manageBot(botId) {
            window.open(\`/link/\${botId}\`, '_blank');
        }
    </script>
</body>
</html>
    `;
    }
    /**
     * Genera HTML de la página de vinculación
     */
    generateLinkPageHTML(botId) {
        return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vincular Bot - Admin-TK</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 20px;
        }
        
        .link-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }
        
        .qr-code {
            width: 256px;
            height: 256px;
            margin: 20px auto;
            border: 2px solid #ddd;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
        }
        
        .instructions {
            color: #666;
            margin-top: 20px;
            line-height: 1.6;
        }
        
        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
        }
        
        .status.waiting {
            background: #fff3cd;
            color: #856404;
        }
        
        .status.connected {
            background: #d4edda;
            color: #155724;
        }
    </style>
</head>
<body>
    <div class="link-container">
        <h2>Vincular Bot</h2>
        <p>Escanea el código QR con WhatsApp Web</p>
        
        <div class="qr-code" id="qrCode">
            <p>Generando QR Code...</p>
        </div>
        
        <div class="status waiting" id="status">
            Esperando vinculación...
        </div>
        
        <div class="instructions">
            <p><strong>Instrucciones:</strong></p>
            <ol style="text-align: left;">
                <li>Abre WhatsApp en tu teléfono</li>
                <li>Ve a Configuración > Dispositivos vinculados</li>
                <li>Toca "Vincular un dispositivo"</li>
                <li>Escanea este código QR</li>
            </ol>
        </div>
    </div>

    <script>
        const botId = '${botId}';
        
        // Cargar QR Code
        loadQRCode();
        
        async function loadQRCode() {
            try {
                const response = await fetch(\`/api/bots/\${botId}/qr\`);
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('qrCode').innerHTML = 
                        \`<img src="\${data.data.qrCode}" alt="QR Code" style="width: 100%; height: 100%; object-fit: contain;">\`;
                } else {
                    document.getElementById('qrCode').innerHTML = 
                        \`<p style="color: red;">Error generando QR Code</p>\`;
                }
            } catch (error) {
                document.getElementById('qrCode').innerHTML = 
                    \`<p style="color: red;">Error: \${error.message}</p>\`;
            }
        }
        
        // Verificar estado de conexión cada 3 segundos
        setInterval(checkConnectionStatus, 3000);
        
        async function checkConnectionStatus() {
            try {
                const response = await fetch(\`/api/bots/\${botId}\`);
                const data = await response.json();
                
                if (data.success && data.data.status === 'online') {
                    const statusEl = document.getElementById('status');
                    statusEl.className = 'status connected';
                    statusEl.textContent = '¡Bot conectado exitosamente!';
                    
                    setTimeout(() => {
                        window.close();
                    }, 3000);
                }
            } catch (error) {
                console.error('Error verificando estado:', error);
            }
        }
    </script>
</body>
</html>
    `;
    }
}
export default DashboardServer;
//# sourceMappingURL=DashboardServer.js.map