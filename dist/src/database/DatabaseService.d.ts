import type { SubBotConfig, DashboardUser, BotStatus } from '../types/index.js';
export declare class DatabaseService {
    private static instance;
    private db;
    private isInitialized;
    private constructor();
    static getInstance(): DatabaseService;
    /**
     * Inicializa la base de datos
     */
    initialize(): Promise<void>;
    /**
     * Ejecuta las migraciones de base de datos
     */
    private runMigrations;
    /**
     * Crea un nuevo usuario del dashboard
     */
    createUser(user: Omit<DashboardUser, 'id' | 'createdAt'>): Promise<string>;
    /**
     * Obtiene un usuario por ID
     */
    getUserById(userId: string): Promise<DashboardUser | null>;
    /**
     * Obtiene un usuario por número de teléfono
     */
    getUserByPhone(phoneNumber: string): Promise<DashboardUser | null>;
    /**
     * Actualiza el último login de un usuario
     */
    updateUserLastLogin(userId: string): Promise<void>;
    /**
     * Guarda la configuración de un bot
     */
    saveBotConfig(config: SubBotConfig): Promise<void>;
    /**
     * Obtiene la configuración de un bot
     */
    getBotConfig(botId: string): Promise<SubBotConfig | null>;
    /**
     * Obtiene todos los bots de un usuario
     */
    getBotsByUser(userId: string): Promise<SubBotConfig[]>;
    /**
     * Obtiene todos los bots
     */
    getAllBots(): Promise<SubBotConfig[]>;
    /**
     * Actualiza el estado de un bot
     */
    updateBotStatus(botId: string, status: BotStatus): Promise<void>;
    /**
     * Elimina un bot
     */
    deleteBotConfig(botId: string): Promise<void>;
    /**
     * Guarda un log de bot
     */
    saveBotLog(botId: string, level: string, message: string, metadata?: any): Promise<void>;
    /**
     * Obtiene logs de un bot
     */
    getBotLogs(botId: string, limit?: number): Promise<any[]>;
    /**
     * Limpia logs antiguos
     */
    cleanOldLogs(daysToKeep?: number): Promise<void>;
    /**
     * Crea una nueva sesión
     */
    createSession(userId: string, token: string, expiresAt: Date): Promise<void>;
    /**
     * Valida una sesión por token
     */
    validateSession(token: string): Promise<string | null>;
    /**
     * Elimina una sesión
     */
    deleteSession(token: string): Promise<void>;
    /**
     * Limpia sesiones expiradas
     */
    cleanExpiredSessions(): Promise<void>;
    /**
     * Obtiene una configuración del sistema
     */
    getSystemConfig(key: string): Promise<string | null>;
    /**
     * Establece una configuración del sistema
     */
    setSystemConfig(key: string, value: string): Promise<void>;
    /**
     * Guarda una métrica estadística
     */
    saveStatistic(botId: string | null, metricName: string, metricValue: number): Promise<void>;
    /**
     * Obtiene estadísticas por bot
     */
    getBotStatistics(botId: string, hours?: number): Promise<any[]>;
    /**
     * Cierra la conexión a la base de datos
     */
    close(): Promise<void>;
}
export default DatabaseService;
//# sourceMappingURL=DatabaseService.d.ts.map