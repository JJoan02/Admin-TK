import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { initializeLogger, logEmitter } from '../utils/logger.js';
import EventBus from './EventBus.js';
import { questionEmitter, resolveWebAnswer } from '../utils/helpers.js';
import DependencyContainer from './DependencyContainer.js';
// Importar rutas
import authRoutes from '../../routes/auth.js'; // Ruta corregida
import serverRoutes from '../../routes/servers.js'; // Ruta corregida
const logger = initializeLogger();
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
export class WebServer {
    #app;
    #server;
    #wss;
    #authService;
    constructor() {
        this.#app = express();
        this.#server = http.createServer(this.#app);
        this.#wss = new WebSocketServer({ server: this.#server });
        // Middlewares de Express
        this.#app.use(cors());
        this.#app.use(bodyParser.json());
        // Protección básica contra DDoS con rate limiting
        const apiLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100, // Máximo 100 solicitudes por IP en windowMs
            message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos.'
        });
        this.#app.use('/api/', apiLimiter); // Aplicar a todas las rutas /api/
        // Rutas de la API
        this.#app.use('/api/auth', authRoutes);
        this.#app.use('/api/servers', serverRoutes);
        // Servir archivos estáticos desde la carpeta 'public'
        this.#app.use(express.static(PUBLIC_DIR));
        // Manejo de rutas no encontradas (404) para la API
        this.#app.use('/api/*', (req, res) => {
            res.status(404).json({ error: 'Ruta de API no encontrada' });
        });
        // Manejo de todas las demás rutas para servir index.html (para SPAs)
        this.#app.get('*', (req, res) => {
            res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
        });
        this.#setupWebSocket();
    }
    setAuthService(authService) {
        this.#authService = authService;
    }
    start() {
        const PORT = process.env.PORT || 3000;
        this.#server.listen(PORT, () => {
            logger.info(`🚀 Servidor web iniciado en http://localhost:${PORT}`);
        });
    }
    #setupWebSocket() {
        this.#wss.on('connection', ws => {
            logger.debug('Cliente web conectado al WebSocket.');
            ws.isAuthenticated = false;
            ws.send(JSON.stringify({ type: 'auth_required' }));
            ws.on('message', async (message) => {
                try {
                    const data = JSON.parse(message);
                    if (data.type === 'login') {
                        const { username, password } = data;
                        const result = await this.#authService.authenticateUser(username, password);
                        if (result.success) {
                            ws.isAuthenticated = true;
                            ws.userId = result.user.id;
                            ws.send(JSON.stringify({ type: 'auth_success' }));
                            logger.info(`Usuario ${username} autenticado en el dashboard.`);
                        }
                        else {
                            ws.send(JSON.stringify({ type: 'auth_error', message: result.message }));
                            logger.warn(`Fallo de autenticación para ${username}: ${result.message}`);
                        }
                        return;
                    }
                    if (!ws.isAuthenticated) {
                        ws.send(JSON.stringify({ type: 'auth_error', message: 'No autorizado.' }));
                        return;
                    }
                    if (data.type === 'answer') {
                        if (!resolveWebAnswer(data.answer)) {
                            logger.warn('Respuesta web recibida pero no hay pregunta pendiente.');
                        }
                    }
                    else if (data.type === 'register') {
                        const { username, password, whatsappNumber } = data;
                        const result = await this.#authService.registerUser(username, password, whatsappNumber);
                        ws.send(JSON.stringify({ type: result.success ? 'register_success' : 'register_error', message: result.message }));
                    }
                    else if (data.type === 'reset_password') {
                        const { username, whatsappNumber } = data;
                        const notificationService = DependencyContainer.getInstance().resolve('notificationService');
                        const result = await this.#authService.generateAndSendResetCode(username, whatsappNumber, notificationService);
                        ws.send(JSON.stringify({ type: result.success ? 'info' : 'error', message: result.message }));
                    }
                    else if (data.type === 'validate_reset_code') {
                        const { username, code } = data;
                        const result = await this.#authService.validateResetCode(username, code);
                        ws.send(JSON.stringify({ type: result.success ? 'info' : 'error', message: result.message }));
                    }
                    else if (data.type === 'update_password') {
                        const { username, newPassword } = data;
                        const result = await this.#authService.updatePassword(username, newPassword);
                        ws.send(JSON.stringify({ type: result.success ? 'info' : 'error', message: result.message }));
                    }
                    else if (data.type === 'generate_qr') {
                        const connectionManager = DependencyContainer.getInstance().resolve('connectionManager');
                        const qrCodeData = await connectionManager.generateQrCode();
                        if (qrCodeData) {
                            ws.send(JSON.stringify({ type: 'qr', qr: qrCodeData }));
                        }
                        else {
                            ws.send(JSON.stringify({ type: 'qr_error', message: 'No se pudo generar el QR.' }));
                        }
                    }
                }
                catch (error) {
                    logger.error({ err: error, message }, 'Error al parsear mensaje WebSocket del cliente.');
                }
            });
            ws.on('close', () => logger.debug('Cliente web desconectado.'));
        });
        logEmitter.on('log', (log) => {
            this.#wss.clients.forEach(client => {
                if (client.readyState === client.OPEN && client.isAuthenticated) {
                    client.send(JSON.stringify({ type: 'log', ...log }));
                }
            });
        });
        questionEmitter.on('question', (query) => {
            this.#wss.clients.forEach(client => {
                if (client.readyState === client.OPEN && client.isAuthenticated) {
                    client.send(JSON.stringify({ type: 'question', query }));
                }
            });
        });
        EventBus.on('qr.received', qr => {
            this.#broadcast({ type: 'qr', qr });
        });
        EventBus.on('connection.open', () => {
            this.#broadcast({ type: 'status', message: 'connected' });
        });
    }
    sendRealtimeUpdate(type, payload) {
        const message = JSON.stringify({ type, ...payload });
        this.#wss.clients.forEach(client => {
            if (client.readyState === client.OPEN && client.isAuthenticated) {
                client.send(message);
            }
        });
    }
    #broadcast(data) {
        const message = JSON.stringify(data);
        this.#wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    }
}
export default WebServer;
//# sourceMappingURL=WebServer.js.map