// src/services/AnalyticsService.js
export class AnalyticsService {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        this.#dbService = dbService;
        this.#logger = logger;
        this.#logger.debug('📊 Servicio de analíticas inicializado.');
    }
    async init() {
        this.#logger.debug('AnalyticsService.init() llamado.');
        // Aquí se podría añadir lógica de inicialización si fuera necesaria
    }
    /**
     * Registra la ejecución de un comando en la base de datos de analíticas.
     * @param {string} commandName - El nombre del comando ejecutado.
     * @param {string} userJid - El JID del usuario que ejecutó el comando.
     */
    async trackCommandExecution(commandName, userJid) {
        if (!commandName || !userJid) {
            this.#logger.warn('trackCommandExecution llamado con commandName o userJid nulos/indefinidos.');
            return;
        }
        try {
            const db = this.#dbService.getDB();
            const eventData = JSON.stringify({
                command: commandName,
                userJid: userJid,
                timestamp: new Date().toISOString(), // Añadir timestamp para mayor granularidad
            });
            await db.run(`INSERT INTO analytics (event_type, event_data) VALUES (?, ?)`, 'command_execution', eventData);
            this.#logger.debug(`📊 Comando '${commandName}' rastreado para ${userJid}.`);
        }
        catch (error) {
            this.#logger.error({ err: error, commandName, userJid }, `❌ Fallo al rastrear la ejecución del comando '${commandName}'.`);
        }
    }
    /**
     * Registra un mensaje procesado por el bot en la base de datos de analíticas.
     * @param {string} userJid - El JID del usuario que envió el mensaje.
     */
    async trackMessageProcessed(userJid) {
        if (!userJid) {
            this.#logger.warn('trackMessageProcessed llamado con userJid nulo/indefinido.');
            return;
        }
        try {
            const db = this.#dbService.getDB();
            const eventData = JSON.stringify({
                userJid: userJid,
                timestamp: new Date().toISOString(), // Añadir timestamp
            });
            await db.run(`INSERT INTO analytics (event_type, event_data) VALUES (?, ?)`, 'message_processed', eventData);
            this.#logger.debug(`📊 Mensaje procesado rastreado para ${userJid}.`);
        }
        catch (error) {
            this.#logger.error({ err: error, userJid }, `❌ Fallo al rastrear el mensaje procesado para ${userJid}.`);
        }
    }
    /**
     * Recupera los datos de analíticas actuales de la base de datos SQLite.
     * Realiza consultas agregadas para obtener un resumen.
     * @returns {Promise<object>} Un objeto con los datos de analíticas.
     */
    async getAnalyticsData() {
        try {
            const db = this.#dbService.getDB();
            // Contar el total de mensajes procesados
            const messagesProcessedResult = await db.get(`SELECT COUNT(*) as total FROM analytics WHERE event_type = 'message_processed'`);
            const messagesProcessed = messagesProcessedResult?.total || 0; // Acceso seguro
            // Contar la ejecución de comandos por nombre
            const commandExecutions = await db.all(`SELECT JSON_EXTRACT(event_data, '$.command') as commandName, COUNT(*) as total
         FROM analytics
         WHERE event_type = 'command_execution' AND commandName IS NOT NULL
         GROUP BY commandName
         ORDER BY total DESC`);
            // Obtener usuarios activos en las últimas 24 horas
            const activeUsersResult = await db.get(`SELECT COUNT(DISTINCT JSON_EXTRACT(event_data, '$.userJid')) as total
         FROM analytics
         WHERE event_type IN ('message_processed', 'command_execution')
         AND timestamp >= strftime('%Y-%m-%dT%H:%M:%S', 'now', '-1 day')`);
            const activeUsers = activeUsersResult?.total || 0; // Acceso seguro
            this.#logger.info('📊 Datos de analíticas recuperados exitosamente.');
            return {
                messagesProcessed: messagesProcessed,
                commandExecutions: commandExecutions.map(cmd => ({
                    command: cmd.commandName,
                    total: cmd.total,
                })),
                activeUsers: activeUsers,
                // Puedes añadir más métricas aquí según sea necesario
            };
        }
        catch (error) {
            this.#logger.error({ err: error }, '❌ Fallo al recuperar los datos de analíticas.');
            return {
                messagesProcessed: 0,
                commandExecutions: [],
                activeUsers: 0,
            };
        }
    }
}
export default AnalyticsService;
//# sourceMappingURL=AnalyticsService.js.map