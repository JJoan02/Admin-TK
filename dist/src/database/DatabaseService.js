// src/database/DatabaseService.ts - Servicio de base de datos
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { join } from 'path';
import { createModuleLogger } from '../utils/logger.js';
const logger = createModuleLogger('DatabaseService');
export class DatabaseService {
    static instance;
    db = null;
    isInitialized = false;
    constructor() { }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    /**
     * Inicializa la base de datos
     */
    async initialize() {
        if (this.isInitialized) {
            return;
        }
        try {
            logger.info('Inicializando base de datos...');
            // Abrir conexión a SQLite
            this.db = await open({
                filename: join(process.cwd(), 'storage', 'database', 'admin-tk.db'),
                driver: sqlite3.Database
            });
            // Ejecutar migraciones
            await this.runMigrations();
            this.isInitialized = true;
            logger.info('✅ Base de datos inicializada correctamente');
        }
        catch (error) {
            logger.error({ err: error }, '❌ Error inicializando base de datos');
            throw error;
        }
    }
    /**
     * Ejecuta las migraciones de base de datos
     */
    async runMigrations() {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        logger.info('Ejecutando migraciones...');
        // Tabla de usuarios del dashboard
        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS dashboard_users (
        id TEXT PRIMARY KEY,
        phone_number TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        status TEXT NOT NULL DEFAULT 'active',
        permissions TEXT NOT NULL DEFAULT '[]',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        bots TEXT NOT NULL DEFAULT '[]'
      )
    `);
        // Tabla de configuraciones de bots
        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS bot_configs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'offline',
        config TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME,
        FOREIGN KEY (user_id) REFERENCES dashboard_users (id)
      )
    `);
        // Tabla de logs de bots
        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS bot_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bot_id TEXT NOT NULL,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        metadata TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (bot_id) REFERENCES bot_configs (id)
      )
    `);
        // Tabla de sesiones
        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES dashboard_users (id)
      )
    `);
        // Tabla de configuraciones del sistema
        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS system_config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Tabla de estadísticas
        await this.db.exec(`
      CREATE TABLE IF NOT EXISTS statistics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bot_id TEXT,
        metric_name TEXT NOT NULL,
        metric_value REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (bot_id) REFERENCES bot_configs (id)
      )
    `);
        // Índices para optimización
        await this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_bot_configs_user_id ON bot_configs (user_id);
      CREATE INDEX IF NOT EXISTS idx_bot_logs_bot_id ON bot_logs (bot_id);
      CREATE INDEX IF NOT EXISTS idx_bot_logs_timestamp ON bot_logs (timestamp);
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions (token);
      CREATE INDEX IF NOT EXISTS idx_statistics_bot_id ON statistics (bot_id);
      CREATE INDEX IF NOT EXISTS idx_statistics_timestamp ON statistics (timestamp);
    `);
        logger.info('✅ Migraciones ejecutadas correctamente');
    }
    // === MÉTODOS PARA USUARIOS ===
    /**
     * Crea un nuevo usuario del dashboard
     */
    async createUser(user) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await this.db.run(`
      INSERT INTO dashboard_users (id, phone_number, role, status, permissions, bots)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
            userId,
            user.phoneNumber,
            user.role,
            user.status,
            JSON.stringify(user.permissions),
            JSON.stringify(user.bots)
        ]);
        logger.info({ userId, phoneNumber: user.phoneNumber }, 'Usuario creado');
        return userId;
    }
    /**
     * Obtiene un usuario por ID
     */
    async getUserById(userId) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const row = await this.db.get(`
      SELECT * FROM dashboard_users WHERE id = ?
    `, [userId]);
        if (!row)
            return null;
        return {
            id: row.id,
            phoneNumber: row.phone_number,
            role: row.role,
            status: row.status,
            createdAt: new Date(row.created_at),
            lastLogin: row.last_login ? new Date(row.last_login) : undefined,
            permissions: JSON.parse(row.permissions),
            bots: JSON.parse(row.bots)
        };
    }
    /**
     * Obtiene un usuario por número de teléfono
     */
    async getUserByPhone(phoneNumber) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const row = await this.db.get(`
      SELECT * FROM dashboard_users WHERE phone_number = ?
    `, [phoneNumber]);
        if (!row)
            return null;
        return {
            id: row.id,
            phoneNumber: row.phone_number,
            role: row.role,
            status: row.status,
            createdAt: new Date(row.created_at),
            lastLogin: row.last_login ? new Date(row.last_login) : undefined,
            permissions: JSON.parse(row.permissions),
            bots: JSON.parse(row.bots)
        };
    }
    /**
     * Actualiza el último login de un usuario
     */
    async updateUserLastLogin(userId) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`
      UPDATE dashboard_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `, [userId]);
    }
    // === MÉTODOS PARA BOTS ===
    /**
     * Guarda la configuración de un bot
     */
    async saveBotConfig(config) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`
      INSERT OR REPLACE INTO bot_configs 
      (id, user_id, name, phone_number, status, config, created_at, last_activity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            config.id,
            config.userId,
            config.name,
            config.phoneNumber,
            config.status,
            JSON.stringify(config.config),
            config.createdAt.toISOString(),
            config.lastActivity?.toISOString()
        ]);
        logger.debug({ botId: config.id }, 'Configuración de bot guardada');
    }
    /**
     * Obtiene la configuración de un bot
     */
    async getBotConfig(botId) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const row = await this.db.get(`
      SELECT * FROM bot_configs WHERE id = ?
    `, [botId]);
        if (!row)
            return null;
        return {
            id: row.id,
            userId: row.user_id,
            name: row.name,
            phoneNumber: row.phone_number,
            status: row.status,
            config: JSON.parse(row.config),
            createdAt: new Date(row.created_at),
            lastActivity: row.last_activity ? new Date(row.last_activity) : undefined
        };
    }
    /**
     * Obtiene todos los bots de un usuario
     */
    async getBotsByUser(userId) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const rows = await this.db.all(`
      SELECT * FROM bot_configs WHERE user_id = ? ORDER BY created_at DESC
    `, [userId]);
        return rows.map(row => ({
            id: row.id,
            userId: row.user_id,
            name: row.name,
            phoneNumber: row.phone_number,
            status: row.status,
            config: JSON.parse(row.config),
            createdAt: new Date(row.created_at),
            lastActivity: row.last_activity ? new Date(row.last_activity) : undefined
        }));
    }
    /**
     * Obtiene todos los bots
     */
    async getAllBots() {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const rows = await this.db.all(`
      SELECT * FROM bot_configs ORDER BY created_at DESC
    `);
        return rows.map(row => ({
            id: row.id,
            userId: row.user_id,
            name: row.name,
            phoneNumber: row.phone_number,
            status: row.status,
            config: JSON.parse(row.config),
            createdAt: new Date(row.created_at),
            lastActivity: row.last_activity ? new Date(row.last_activity) : undefined
        }));
    }
    /**
     * Actualiza el estado de un bot
     */
    async updateBotStatus(botId, status) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`
      UPDATE bot_configs 
      SET status = ?, last_activity = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [status, botId]);
        logger.debug({ botId, status }, 'Estado de bot actualizado');
    }
    /**
     * Elimina un bot
     */
    async deleteBotConfig(botId) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        // Eliminar logs del bot
        await this.db.run(`DELETE FROM bot_logs WHERE bot_id = ?`, [botId]);
        // Eliminar estadísticas del bot
        await this.db.run(`DELETE FROM statistics WHERE bot_id = ?`, [botId]);
        // Eliminar configuración del bot
        await this.db.run(`DELETE FROM bot_configs WHERE id = ?`, [botId]);
        logger.info({ botId }, 'Bot eliminado de la base de datos');
    }
    // === MÉTODOS PARA LOGS ===
    /**
     * Guarda un log de bot
     */
    async saveBotLog(botId, level, message, metadata) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`
      INSERT INTO bot_logs (bot_id, level, message, metadata)
      VALUES (?, ?, ?, ?)
    `, [botId, level, message, metadata ? JSON.stringify(metadata) : null]);
    }
    /**
     * Obtiene logs de un bot
     */
    async getBotLogs(botId, limit = 100) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const rows = await this.db.all(`
      SELECT * FROM bot_logs 
      WHERE bot_id = ? 
      ORDER BY timestamp DESC 
      LIMIT ?
    `, [botId, limit]);
        return rows.map(row => ({
            id: row.id,
            botId: row.bot_id,
            level: row.level,
            message: row.message,
            metadata: row.metadata ? JSON.parse(row.metadata) : null,
            timestamp: new Date(row.timestamp)
        }));
    }
    /**
     * Limpia logs antiguos
     */
    async cleanOldLogs(daysToKeep = 30) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const result = await this.db.run(`
      DELETE FROM bot_logs 
      WHERE timestamp < datetime('now', '-${daysToKeep} days')
    `);
        logger.info({ deletedRows: result.changes }, `Logs antiguos limpiados (>${daysToKeep} días)`);
    }
    // === MÉTODOS PARA SESIONES ===
    /**
     * Crea una nueva sesión
     */
    async createSession(userId, token, expiresAt) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await this.db.run(`
      INSERT INTO sessions (id, user_id, token, expires_at)
      VALUES (?, ?, ?, ?)
    `, [sessionId, userId, token, expiresAt.toISOString()]);
    }
    /**
     * Valida una sesión por token
     */
    async validateSession(token) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const row = await this.db.get(`
      SELECT user_id FROM sessions 
      WHERE token = ? AND expires_at > datetime('now')
    `, [token]);
        return row ? row.user_id : null;
    }
    /**
     * Elimina una sesión
     */
    async deleteSession(token) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`DELETE FROM sessions WHERE token = ?`, [token]);
    }
    /**
     * Limpia sesiones expiradas
     */
    async cleanExpiredSessions() {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const result = await this.db.run(`
      DELETE FROM sessions WHERE expires_at <= datetime('now')
    `);
        logger.debug({ deletedSessions: result.changes }, 'Sesiones expiradas limpiadas');
    }
    // === MÉTODOS PARA CONFIGURACIÓN DEL SISTEMA ===
    /**
     * Obtiene una configuración del sistema
     */
    async getSystemConfig(key) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const row = await this.db.get(`
      SELECT value FROM system_config WHERE key = ?
    `, [key]);
        return row ? row.value : null;
    }
    /**
     * Establece una configuración del sistema
     */
    async setSystemConfig(key, value) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`
      INSERT OR REPLACE INTO system_config (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `, [key, value]);
    }
    // === MÉTODOS PARA ESTADÍSTICAS ===
    /**
     * Guarda una métrica estadística
     */
    async saveStatistic(botId, metricName, metricValue) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        await this.db.run(`
      INSERT INTO statistics (bot_id, metric_name, metric_value)
      VALUES (?, ?, ?)
    `, [botId, metricName, metricValue]);
    }
    /**
     * Obtiene estadísticas por bot
     */
    async getBotStatistics(botId, hours = 24) {
        if (!this.db)
            throw new Error('Base de datos no inicializada');
        const rows = await this.db.all(`
      SELECT metric_name, AVG(metric_value) as avg_value, COUNT(*) as count
      FROM statistics 
      WHERE bot_id = ? AND timestamp > datetime('now', '-${hours} hours')
      GROUP BY metric_name
      ORDER BY metric_name
    `, [botId]);
        return rows;
    }
    /**
     * Cierra la conexión a la base de datos
     */
    async close() {
        if (this.db) {
            await this.db.close();
            this.db = null;
            this.isInitialized = false;
            logger.info('🔒 Conexión a base de datos cerrada');
        }
    }
}
export default DatabaseService;
//# sourceMappingURL=DatabaseService.js.map