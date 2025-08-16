// src/services/DBService.js
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import mongoose from 'mongoose';
import sqlite3 from 'sqlite3'; // Importar el driver de sqlite3
import { open } from 'sqlite'; // Importar la interfaz de promesas para sqlite
import path from 'path';
import fs from 'fs/promises'; // Usar fs.promises para operaciones asíncronas
import config from '../../config/config.js';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import { DatabaseError } from '../core/ErrorHandler.js'; // Importar DatabaseError
import Metrics from '../utils/Metrics.js'; // Importar métricas
// Estructura de datos por defecto para la base de datos JSON (LowDB).
const defaultLowDBData = {
    users: {},
    groups: {},
    chats: {},
    settings: {},
    analytics: {
        commands: {},
        messagesProcessed: 0,
        activeUsers: {},
    },
};
export class DBService {
    /** @type {import('lowdb').Low<object> | import('mongoose').Connection | import('sqlite').Database | null} */
    static #dbInstance = null;
    static #dbType = 'None';
    static #dbPath = ''; // Para almacenar la ruta del archivo de la DB (LowDB o SQLite)
    /**
     * Inicializa el servicio de base de datos, estableciendo la conexión.
     * Este método debe ser llamado una sola vez al arrancar la aplicación.
     * @returns {Promise<void>}
     */
    static async init() {
        if (this.#dbInstance) {
            logger.warn('⚠️ La base de datos ya ha sido inicializada.');
            return;
        }
        this.#dbType = config.database.type;
        logger.info(`⚙️ Modo de base de datos: ${this.#dbType}. Inicializando...`);
        try {
            if (!this.#dbType || !['MongoDB', 'LowDB', 'SQLite'].includes(this.#dbType)) {
                logger.error(`❌ Tipo de base de datos no soportado o no definido: ${this.#dbType}`);
                throw new DatabaseError('Tipo de base de datos no válido o no definido en la configuración.');
            }
            switch (this.#dbType) {
                case 'MongoDB':
                    await this.#initMongoose();
                    break;
                case 'LowDB':
                    await this.#initLowDB();
                    break;
                case 'SQLite':
                    await this.#initSQLite();
                    break;
            }
            logger.info('✅ Servicio de base de datos listo.');
        }
        catch (error) {
            logger.fatal({ err: error, dbType: this.#dbType }, `❌ Error fatal al inicializar la base de datos ${this.#dbType}.`);
            throw new DatabaseError(`Error fatal al inicializar la base de datos ${this.#dbType}.`, error);
        }
    }
    /**
     * Inicializa la conexión a MongoDB con Mongoose.
     * @private
     */
    static async #initMongoose() {
        if (!config.mongoUri) {
            throw new DatabaseError('mongoUri no está definido en la configuración para MongoDB.');
        }
        logger.info('☁️ Conectando a MongoDB...');
        mongoose.connection.on('connected', () => logger.info('✅ Conectado a la base de datos MongoDB.'));
        mongoose.connection.on('error', err => logger.error({ err }, '❌ Error de conexión a MongoDB.'));
        mongoose.connection.on('disconnected', () => logger.warn('⚠️ Desconectado de la base de datos MongoDB.'));
        await mongoose.connect(config.mongoUri);
        this.#dbInstance = mongoose.connection;
    }
    /**
     * Inicializa la base de datos local con LowDB.
     * @private
     */
    static async #initLowDB() {
        if (!config.database.lowdb || !config.database.lowdb.path) {
            throw new DatabaseError('La ruta de LowDB no está definida en la configuración.');
        }
        this.#dbPath = path.resolve(process.cwd(), config.database.lowdb.path);
        try {
            // Asegurarse de que el directorio exista antes de intentar acceder o escribir el archivo
            await fs.mkdir(path.dirname(this.#dbPath), { recursive: true });
            await fs.access(this.#dbPath, fs.constants.F_OK); // Verifica si el archivo existe
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                logger.warn(`⚠️ El archivo '${this.#dbPath}' no existe. Creando uno nuevo con datos por defecto...`);
                try {
                    await fs.writeFile(this.#dbPath, JSON.stringify(defaultLowDBData, null, 2));
                }
                catch (writeError) {
                    logger.error({ err: writeError }, `❌ Error al crear el archivo de base de datos por defecto en '${this.#dbPath}'.`);
                    throw new DatabaseError(`Error al crear el archivo de base de datos por defecto en '${this.#dbPath}'.`, writeError);
                }
            }
            else {
                logger.error({ err: error }, `❌ Error al acceder al archivo de base de datos LowDB en '${this.#dbPath}'.`);
                throw new DatabaseError(`Error al acceder al archivo de base de datos LowDB en '${this.#dbPath}'.`, error);
            }
        }
        const adapter = new JSONFile(this.#dbPath);
        const dbInstance = new Low(adapter, defaultLowDBData);
        const end = Metrics.dbQueryTimeHistogram.startTimer();
        await dbInstance.read(); // Lee los datos del archivo a la memoria.
        end();
        this.#dbInstance = dbInstance;
        logger.info(`Base de datos LowDB cargada desde '${this.#dbPath}'.`);
    }
    /**
     * Inicializa la base de datos SQLite.
     * @private
     */
    static async #initSQLite() {
        if (!config.database.sqlite || !config.database.sqlite.filename) {
            throw new DatabaseError('El nombre de archivo de SQLite no está definido en la configuración.');
        }
        this.#dbPath = path.resolve(process.cwd(), config.database.sqlite.filename);
        logger.info(`Conectando a SQLite en '${this.#dbPath}'...`);
        try {
            // Asegurarse de que el directorio exista antes de intentar abrir la base de datos
            await fs.mkdir(path.dirname(this.#dbPath), { recursive: true });
            const end = Metrics.dbQueryTimeHistogram.startTimer();
            this.#dbInstance = await open({
                filename: this.#dbPath,
                driver: sqlite3.Database,
            });
            end();
            logger.info('✅ Conexión a SQLite establecida exitosamente.');
            await this.#createTablesSQLite();
        }
        catch (error) {
            logger.fatal({ err: error, dbPath: this.#dbPath }, '❌ Error al conectar o inicializar SQLite.');
            throw new DatabaseError('Error al conectar o inicializar SQLite.', error);
        }
    }
    /**
     * Crea las tablas necesarias en SQLite si no existen.
     * @private
     */
    static async #createTablesSQLite() {
        logger.info('Verificando y creando tablas en SQLite...');
        try {
            const end = Metrics.dbQueryTimeHistogram.startTimer();
            // Tabla para analíticas
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS analytics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_type TEXT NOT NULL,
          event_data JSON,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);
            // Tabla para usuarios del dashboard
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS dashboard_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          whatsapp_number TEXT UNIQUE, -- Número de WhatsApp para recuperación
          role TEXT DEFAULT 'user',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);
            // Tabla para sesiones de WhatsApp asociadas a usuarios del dashboard
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS whatsapp_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          session_name TEXT UNIQUE NOT NULL,
          whatsapp_jid TEXT UNIQUE, -- JID del bot vinculado (ej. 51987654321@s.whatsapp.net)
          status TEXT DEFAULT 'disconnected', -- connected, disconnected, connecting, error
          last_connected DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES dashboard_users(id) ON DELETE CASCADE
        );`);
            // Tabla para códigos de restablecimiento de contraseña
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS password_resets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          code TEXT NOT NULL,
          expires_at INTEGER NOT NULL, -- Timestamp UNIX
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES dashboard_users(id) ON DELETE CASCADE
        );`);
            // Tabla para servidores (sub-bots)
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS servers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          status TEXT DEFAULT 'offline', -- online, offline, error
          session_id TEXT UNIQUE, -- Nombre de la sesión de WhatsApp asociada
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES dashboard_users(id) ON DELETE CASCADE
        );`);
            // Tabla para logs de auditoría
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS audit_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          action TEXT NOT NULL,
          details TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES dashboard_users(id) ON DELETE SET NULL
        );`);
            // Tabla para usuarios del bot (existente)
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS users (
          jid TEXT PRIMARY KEY,
          name TEXT,
          role TEXT DEFAULT 'user',
          commandCount INTEGER DEFAULT 0,
          isBanned BOOLEAN DEFAULT FALSE,
          warnings INTEGER DEFAULT 0,
          createdAt TEXT,
          last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
          cooldowns TEXT DEFAULT '{}',
          isAiEnabled BOOLEAN DEFAULT FALSE,
          updatedAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
        );`);
            // Tabla para configuraciones de grupo (existente)
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS groups (
          jid TEXT PRIMARY KEY,
          subject TEXT,
          creation TEXT,
          owner TEXT,
          size INTEGER,
          isMuted BOOLEAN DEFAULT FALSE,
          welcomeMessage TEXT,
          goodbyeMessage TEXT,
          isBotEnabled BOOLEAN DEFAULT TRUE,
          isAiEnabled BOOLEAN DEFAULT FALSE,
          createdAt TEXT,
          updatedAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
        );`);
            // Tabla para chats (privados) (existente)
            await this.#dbInstance.exec(`CREATE TABLE IF NOT EXISTS chats (
          jid TEXT PRIMARY KEY,
          isBotMuted BOOLEAN DEFAULT FALSE,
          conversationState TEXT,
          lastInteraction TEXT,
          isAiEnabled BOOLEAN DEFAULT FALSE,
          personality_profile TEXT,
          proactive_message_level INTEGER DEFAULT 0, -- ✅ NUEVO: Nivel de mensaje proactivo enviado
          createdAt TEXT,
          updatedAt TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
        );`);
            end();
            logger.info('✅ Tablas de SQLite verificadas/creadas exitosamente.');
        }
        catch (error) {
            logger.error({ err: error }, '❌ Error al crear tablas en SQLite.');
            throw new DatabaseError('Error al crear tablas en SQLite.', error);
        }
    }
    /**
     * Devuelve la instancia de la base de datos activa.
     * Los Managers (User , Group, Chat) usarán esto para leer y escribir datos.
     * @returns {import('lowdb').Low<object> | import('mongoose').Connection | import('sqlite').Database}
     */
    static getDB() {
        if (!this.#dbInstance) {
            logger.error('❌ Se intentó acceder a la base de datos antes de su inicialización.');
            throw new DatabaseError('El servicio de base de datos no ha sido inicializado. Llama a DBService.init() primero.');
        }
        return this.#dbInstance;
    }
    /**
     * Cierra la conexión a la base de datos.
     * Se llama durante el apagado seguro de la aplicación.
     * @returns {Promise<void>}
     */
    static async close() {
        logger.info('Cerrando la conexión a la base de datos...');
        try {
            if (this.#dbType === 'MongoDB' && mongoose.connection.readyState === 1) {
                await mongoose.disconnect();
                logger.info('✅ Conexión a MongoDB cerrada.');
            }
            else if (this.#dbType === 'SQLite' && this.#dbInstance) {
                await this.#dbInstance.close();
                logger.info('✅ Conexión a SQLite cerrada.');
            }
            // LowDB no necesita un cierre explícito, ya que escribe en el archivo.
            this.#dbInstance = null;
            logger.info('✅ Conexión a la base de datos cerrada.');
        }
        catch (error) {
            logger.error({ err: error }, '❌ Error al cerrar la conexión a la base de datos.');
            // No relanzar el error para permitir que el proceso de apagado continúe
        }
    }
    /**
     * Devuelve la ruta del archivo de la base de datos (solo para LowDB o SQLite).
     * @returns {string}
     */
    static get dbPath() {
        return this.#dbPath;
    }
}
export default DBService;
//# sourceMappingURL=DBService.js.map