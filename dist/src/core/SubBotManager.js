// src/core/SubBotManager.ts - Gestor de sub-bots
import { EventEmitter } from 'events';
import { fork } from 'child_process';
import { join } from 'path';
import { createModuleLogger } from '../utils/logger.js';
const moduleLogger = createModuleLogger('SubBotManager');
export class SubBotManager extends EventEmitter {
    bots = new Map();
    workers = new Map();
    isInitialized = false;
    async initialize() {
        if (this.isInitialized) {
            return;
        }
        try {
            moduleLogger.info('Initializing SubBot Manager...');
            // Cargar bots existentes desde la base de datos
            await this.loadExistingBots();
            this.isInitialized = true;
            moduleLogger.info('SubBot Manager initialized successfully');
        }
        catch (error) {
            moduleLogger.error({ error }, 'Failed to initialize SubBot Manager');
            throw error;
        }
    }
    async createBot(config) {
        const botId = `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const botConfig = {
            ...config,
            id: botId,
            createdAt: new Date(),
            status: 'offline'
        };
        this.bots.set(botId, botConfig);
        // Guardar en base de datos
        await this.saveBotConfig(botConfig);
        moduleLogger.info({ botId, userId: config.userId }, 'Bot created successfully');
        this.emit('botCreated', botId, botConfig);
        return botId;
    }
    async startBot(botId) {
        const bot = this.bots.get(botId);
        if (!bot) {
            throw new Error(`Bot ${botId} not found`);
        }
        if (this.workers.has(botId)) {
            moduleLogger.warn({ botId }, 'Bot is already running');
            return;
        }
        try {
            moduleLogger.info({ botId }, 'Starting bot...');
            // Actualizar estado
            bot.status = 'connecting';
            this.emit('botStatusChanged', botId, 'connecting');
            // Crear worker process
            const workerPath = join(process.cwd(), 'src', 'workers', 'botWorker.js');
            const worker = fork(workerPath, [botId], {
                env: {
                    ...process.env,
                    BOT_ID: botId,
                    BOT_CONFIG: JSON.stringify(bot)
                },
                stdio: 'pipe'
            });
            // Configurar event handlers
            worker.on('message', (message) => {
                this.handleWorkerMessage(botId, message);
            });
            worker.on('error', (error) => {
                this.handleWorkerError(botId, error);
            });
            worker.on('exit', (code, signal) => {
                this.handleWorkerExit(botId, code, signal);
            });
            // Configurar stdout/stderr
            if (worker.stdout) {
                worker.stdout.on('data', (data) => {
                    moduleLogger.info({ botId, output: data.toString() }, 'Bot stdout');
                });
            }
            if (worker.stderr) {
                worker.stderr.on('data', (data) => {
                    moduleLogger.error({ botId, error: data.toString() }, 'Bot stderr');
                });
            }
            this.workers.set(botId, worker);
            // Timeout para conexión
            setTimeout(() => {
                if (bot.status === 'connecting') {
                    moduleLogger.warn({ botId }, 'Bot connection timeout');
                    this.stopBot(botId);
                }
            }, 60000); // 1 minuto timeout
        }
        catch (error) {
            bot.status = 'error';
            this.emit('botStatusChanged', botId, 'error');
            moduleLogger.error({ botId, error }, 'Failed to start bot');
            throw error;
        }
    }
    async stopBot(botId) {
        const worker = this.workers.get(botId);
        const bot = this.bots.get(botId);
        if (!worker || !bot) {
            return;
        }
        try {
            moduleLogger.info({ botId }, 'Stopping bot...');
            // Enviar señal de cierre graceful
            worker.send({ type: 'shutdown' });
            // Esperar un poco para cierre graceful
            await new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    worker.kill('SIGKILL');
                    resolve();
                }, 10000); // 10 segundos timeout
                worker.on('exit', () => {
                    clearTimeout(timeout);
                    resolve();
                });
            });
            this.workers.delete(botId);
            bot.status = 'offline';
            this.emit('botStatusChanged', botId, 'offline');
            moduleLogger.info({ botId }, 'Bot stopped successfully');
        }
        catch (error) {
            moduleLogger.error({ botId, error }, 'Error stopping bot');
            throw error;
        }
    }
    async restartBot(botId) {
        await this.stopBot(botId);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos
        await this.startBot(botId);
    }
    async deleteBot(botId) {
        await this.stopBot(botId);
        this.bots.delete(botId);
        await this.deleteBotConfig(botId);
        this.emit('botDeleted', botId);
        moduleLogger.info({ botId }, 'Bot deleted successfully');
    }
    async stopAllBots() {
        const stopPromises = Array.from(this.workers.keys()).map(botId => this.stopBot(botId).catch(error => moduleLogger.error({ botId, error }, 'Error stopping bot during shutdown')));
        await Promise.all(stopPromises);
        moduleLogger.info('All bots stopped');
    }
    getBotConfig(botId) {
        return this.bots.get(botId);
    }
    getBotsByUser(userId) {
        return Array.from(this.bots.values()).filter(bot => bot.userId === userId);
    }
    getAllBots() {
        return Array.from(this.bots.values());
    }
    getBot(botId) {
        return this.bots.get(botId);
    }
    getBotStatus(botId) {
        return this.bots.get(botId)?.status;
    }
    handleWorkerMessage(botId, message) {
        const bot = this.bots.get(botId);
        if (!bot)
            return;
        switch (message.type) {
            case 'status':
                bot.status = message.status;
                bot.lastActivity = new Date();
                this.emit('botStatusChanged', botId, message.status);
                break;
            case 'error':
                this.emit('botError', botId, new Error(message.error));
                break;
            case 'log':
                this.emit('botLog', botId, message.log);
                break;
            default:
                moduleLogger.debug({ botId, message }, 'Unknown worker message');
        }
    }
    handleWorkerError(botId, error) {
        const bot = this.bots.get(botId);
        if (bot) {
            bot.status = 'error';
            this.emit('botStatusChanged', botId, 'error');
        }
        this.emit('botError', botId, error);
        moduleLogger.error({ botId, error }, 'Worker error');
    }
    handleWorkerExit(botId, code, signal) {
        const bot = this.bots.get(botId);
        if (bot) {
            bot.status = code === 0 ? 'offline' : 'error';
            this.emit('botStatusChanged', botId, bot.status);
        }
        this.workers.delete(botId);
        moduleLogger.info({ botId, code, signal }, 'Worker exited');
    }
    async loadExistingBots() {
        // TODO: Implementar carga desde base de datos
        moduleLogger.info('Loading existing bots from database...');
    }
    async saveBotConfig(config) {
        // TODO: Implementar guardado en base de datos
        moduleLogger.debug({ botId: config.id }, 'Saving bot config to database');
    }
    async deleteBotConfig(botId) {
        // TODO: Implementar eliminación de base de datos
        moduleLogger.debug({ botId }, 'Deleting bot config from database');
    }
}
//# sourceMappingURL=SubBotManager.js.map