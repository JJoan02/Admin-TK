// src/ia/MemoryService.js
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs/promises'; // Para asegurar que el directorio exista
import { DatabaseError } from '../core/ErrorHandler.js';
export class MemoryService {
    static #instance = null;
    /** @type {import('sqlite').Database | null} */
    #db = null;
    #dbPath = '';
    #logger;
    #errorHandler;
    /**
     * @param {object} dbService - Instancia del servicio de base de datos principal (para obtener la instancia de DB).
     * @param {object} logger - Instancia del logger.
     * @param {object} errorHandler - Instancia del manejador de errores.
     */
    constructor(dbService, logger, errorHandler) {
        if (MemoryService.#instance) {
            return MemoryService.#instance;
        }
        this.#dbPath = path.resolve(process.cwd(), 'src', 'ia', 'memory.sqlite');
        this.#logger = logger;
        this.#errorHandler = errorHandler;
        MemoryService.#instance = this;
    }
    static getInstance(dbService, logger, errorHandler) {
        if (!MemoryService.#instance) {
            MemoryService.#instance = new MemoryService(dbService, logger, errorHandler);
        }
        return MemoryService.#instance;
    }
    /**
     * Inicializa la conexión a la base de datos de la IA y crea las tablas si no existen.
     * @returns {Promise<void>}
     */
    async init() {
        if (this.#db) {
            this.#logger.warn(' La base de datos de la IA ya ha sido inicializada.');
            return;
        }
        // Asegurarse de que el directorio exista
        const dbDir = path.dirname(this.#dbPath);
        try {
            await fs.mkdir(dbDir, { recursive: true });
            this.#logger.debug(` Directorio de la DB de la IA verificado/creado: ${dbDir}`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.init', dbDir });
            throw new DatabaseError(`Error al crear el directorio para la DB de la IA: ${dbDir}`, error);
        }
        this.#logger.info(` Conectando a la base de datos de la IA en '${this.#dbPath}'...`);
        try {
            this.#db = await open({
                filename: this.#dbPath,
                driver: sqlite3.Database,
            });
            this.#logger.info('✅ Conexión a la DB de la IA establecida exitosamente.');
            await this.#createTables();
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.init', dbPath: this.#dbPath });
            throw new DatabaseError('Error al conectar o inicializar la DB de la IA.', error);
        }
    }
    /**
     * Crea las tablas necesarias en la base de datos de la IA si no existen.
     * @private
     * @returns {Promise<void>}
     */
    async #createTables() {
        this.#logger.info(' Verificando y creando tablas en la DB de la IA...');
        try {
            // Tabla para el historial de interacciones (conversaciones)
            await this.#db.exec(`
        CREATE TABLE IF NOT EXISTS interactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_jid TEXT NOT NULL,
          user_name TEXT,
          chat_id TEXT NOT NULL,
          chat_name TEXT,
          message_id TEXT,
          message_text TEXT,
          is_from_bot BOOLEAN NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          context_json TEXT -- Para almacenar contexto adicional de la conversación
        );
      `);
            await this.#db.exec(`CREATE INDEX IF NOT EXISTS idx_interactions_chat_id ON interactions (chat_id);`);
            await this.#db.exec(`CREATE INDEX IF NOT EXISTS idx_interactions_timestamp ON interactions (timestamp);`);
            // Tabla para la base de conocimiento (hechos aprendidos)
            await this.#db.exec(`
        CREATE TABLE IF NOT EXISTS knowledge_facts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fact_text TEXT NOT NULL UNIQUE, -- El hecho en sí, único
          added_by_jid TEXT,
          added_by_name TEXT,
          source_chat_id TEXT,
          source_message_id TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
            await this.#db.exec(`CREATE INDEX IF NOT EXISTS idx_knowledge_facts_fact_text ON knowledge_facts (fact_text);`);
            // Tabla para la personalidad adaptada por chat
            await this.#db.exec(`
        CREATE TABLE IF NOT EXISTS chat_personalities (
          chat_id TEXT PRIMARY KEY,
          personality_traits_json TEXT, -- JSON con rasgos de personalidad (ej. { "humor": "chistoso", "formalidad": "informal" })
          last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
            // ✅ NUEVO: Tabla para hechos contextuales por chat
            await this.#db.exec(`
        CREATE TABLE IF NOT EXISTS contextual_facts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          chat_id TEXT NOT NULL,
          fact_key TEXT NOT NULL,
          fact_value TEXT NOT NULL,
          mentioned_by_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(chat_id, fact_key)
        );
      `);
            await this.#db.exec(`CREATE INDEX IF NOT EXISTS idx_contextual_facts_chat_id ON contextual_facts (chat_id);`);
            await this.#db.exec(`CREATE INDEX IF NOT EXISTS idx_contextual_facts_fact_key ON contextual_facts (fact_key);`);
            this.#logger.info('✅ Tablas de la DB de la IA verificadas/creadas exitosamente.');
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.#createTables' });
            throw new DatabaseError('Error al crear tablas en la DB de la IA.', error);
        }
    }
    /**
     * Añade una interacción (mensaje) al historial de la IA.
     * @param {object} interactionData - Datos de la interacción.
     * @param {string} interactionData.user_jid - JID del usuario.
     * @param {string} [interactionData.user_name] - Nombre del usuario.
     * @param {string} interactionData.chat_id - JID del chat.
     * @param {string} [interactionData.chat_name] - Nombre del chat.
     * @param {string} [interactionData.message_id] - ID del mensaje.
     * @param {string} [interactionData.message_text] - Contenido del mensaje.
     * @param {boolean} interactionData.is_from_bot - Si el mensaje es del bot.
     * @param {object} [interactionData.context_json] - Contexto adicional en formato JSON.
     * @returns {Promise<void>}
     */
    async addInteraction({ user_jid, user_name, chat_id, chat_name, message_id, message_text, is_from_bot, context_json = {} }) {
        try {
            await this.#db.run(`INSERT INTO interactions (user_jid, user_name, chat_id, chat_name, message_id, message_text, is_from_bot, context_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, user_jid, user_name, chat_id, chat_name, message_id, message_text, is_from_bot, JSON.stringify(context_json));
            this.#logger.debug(` IA: Interacción registrada en ${chat_id} de ${user_name || user_jid}.`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.addInteraction' });
            throw new DatabaseError('Error al añadir interacción.', error);
        }
    }
    /**
     * Obtiene las últimas interacciones de un chat específico.
     * @param {string} chat_id - JID del chat.
     * @param {number} limit - Número máximo de interacciones a recuperar.
     * @returns {Promise<Array<object>>}
     */
    async getRecentInteractions(chat_id, limit = 10) {
        try {
            const rows = await this.#db.all(`SELECT * FROM interactions WHERE chat_id = ? ORDER BY timestamp DESC LIMIT ?`, chat_id, limit);
            return rows.map(row => ({
                ...row,
                context_json: JSON.parse(row.context_json)
            }));
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.getRecentInteractions' });
            throw new DatabaseError('Error al obtener interacciones recientes.', error);
        }
    }
    /**
     * Añade un hecho a la base de conocimiento de la IA.
     * @param {object} factData - Datos del hecho.
     * @param {string} factData.fact_text - El texto del hecho.
     * @param {string} [factData.added_by_jid] - JID de quien añadió el hecho.
     * @param {string} [factData.added_by_name] - Nombre de quien añadió el hecho.
     * @param {string} [factData.source_chat_id] - JID del chat de origen.
     * @param {string} [factData.source_message_id] - ID del mensaje de origen.
     * @returns {Promise<void>}
     */
    async addFact({ fact_text, added_by_jid, added_by_name, source_chat_id, source_message_id }) {
        try {
            await this.#db.run(`INSERT OR IGNORE INTO knowledge_facts (fact_text, added_by_jid, added_by_name, source_chat_id, source_message_id)
         VALUES (?, ?, ?, ?, ?)`, fact_text, added_by_jid, added_by_name, source_chat_id, source_message_id);
            this.#logger.info(` IA: Hecho añadido a la base de conocimiento: "${fact_text.substring(0, 30)}..."`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.addFact' });
            throw new DatabaseError('Error al añadir hecho a la base de conocimiento.', error);
        }
    }
    /**
     * Busca hechos relevantes en la base de conocimiento por palabra clave.
     * @param {string} keyword - Palabra clave para buscar.
     * @param {number} limit - Número máximo de hechos a recuperar.
     * @returns {Promise<Array<object>>}
     */
    async findRelevantFacts(keyword, limit = 5) {
        try {
            const rows = await this.#db.all(`SELECT fact_text FROM knowledge_facts WHERE fact_text LIKE ? LIMIT ?`, `%${keyword}%`, limit);
            return rows;
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.findRelevantFacts' });
            throw new DatabaseError('Error al buscar hechos relevantes.', error);
        }
    }
    /**
     * Obtiene todos los hechos de la base de conocimiento.
     * @returns {Promise<Array<object>>}
     */
    async getAllFacts() {
        try {
            return await this.#db.all(`SELECT fact_text FROM knowledge_facts`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.getAllFacts' });
            throw new DatabaseError('Error al obtener todos los hechos.', error);
        }
    }
    /**
     * Guarda o actualiza los rasgos de personalidad para un chat específico.
     * @param {string} chat_id - JID del chat.
     * @param {object} personality_traits - Objeto JSON con los rasgos de personalidad.
     * @returns {Promise<void>}
     */
    async setChatPersonality(chat_id, personality_traits) {
        try {
            await this.#db.run(`INSERT OR REPLACE INTO chat_personalities (chat_id, personality_traits_json, last_updated)
         VALUES (?, ?, CURRENT_TIMESTAMP)`, chat_id, JSON.stringify(personality_traits));
            this.#logger.debug(` IA: Personalidad actualizada para el chat ${chat_id}.`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.setChatPersonality' });
            throw new DatabaseError('Error al establecer la personalidad del chat.', error);
        }
    }
    /**
     * Obtiene los rasgos de personalidad para un chat específico.
     * @param {string} chat_id - JID del chat.
     * @returns {Promise<object | null>} Objeto con los rasgos de personalidad o null si no se encuentra.
     */
    async getChatPersonality(chat_id) {
        try {
            const row = await this.#db.get(`SELECT personality_traits_json FROM chat_personalities WHERE chat_id = ?`, chat_id);
            return row ? JSON.parse(row.personality_traits_json) : null;
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.getChatPersonality' });
            throw new DatabaseError('Error al obtener la personalidad del chat.', error);
        }
    }
    /**
     * Cierra la conexión a la base de datos de la IA.
     * @returns {Promise<void>}
     */
    async close() {
        if (this.#db) {
            try {
                await this.#db.close();
                this.#db = null;
                this.#logger.info(' IA: Conexión a la base de datos cerrada.');
            }
            catch (error) {
                this.#errorHandler.handleError(error, { context: 'MemoryService.close' });
                // No relanzar el error para permitir que el proceso de apagado continúe
            }
        }
    }
    /**
     * Limpia interacciones antiguas de la base de datos.
     * @param {number} daysToRetain - Número de días a retener las interacciones.
     * @returns {Promise<void>}
     */
    async cleanOldInteractions(daysToRetain = 30) {
        try {
            const cutoffDate = new Date(Date.now() - daysToRetain * 24 * 60 * 60 * 1000).toISOString();
            const result = await this.#db.run(`DELETE FROM interactions WHERE timestamp < ?`, cutoffDate);
            this.#logger.info(`IA: Se eliminaron ${result.changes} interacciones anteriores a ${cutoffDate}.`);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.cleanOldInteractions' });
            throw new DatabaseError('Error al limpiar interacciones antiguas.', error);
        }
    }
    /**
     * ✅  NUEVO: Guarda un hecho contextual en la base de datos. Si ya existe, lo actualiza.
     * @param {string} chatId
     * @param {string} key
     * @param {string} value
     * @param {string} userId
     */
    async saveFact(chatId, key, value, userId) {
        const query = `
      INSERT INTO contextual_facts (chat_id, fact_key, fact_value, mentioned_by_id)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(chat_id, fact_key) DO UPDATE SET
      fact_value = excluded.fact_value,
      mentioned_by_id = excluded.mentioned_by_id,
      created_at = CURRENT_TIMESTAMP;
    `;
        try {
            await this.#db.run(query, [chatId, key, value, userId]);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.saveFact' });
            throw new DatabaseError('Error al guardar hecho contextual.', error);
        }
    }
    /**
     * ✅  NUEVO: Obtiene todos los hechos para un chat específico.
     * @param {string} chatId
     * @returns {Promise<Array<object>>}
     */
    async getFactsForChat(chatId) {
        const query = "SELECT fact_key, fact_value FROM contextual_facts WHERE chat_id = ?";
        try {
            return await this.#db.all(query, [chatId]);
        }
        catch (error) {
            this.#errorHandler.handleError(error, { context: 'MemoryService.getFactsForChat' });
            throw new DatabaseError('Error al obtener hechos contextuales.', error);
        }
    }
}
export default MemoryService;
//# sourceMappingURL=MemoryService.js.map