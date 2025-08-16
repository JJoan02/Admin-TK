import { SubBotManager } from './SubBotManager.js';
export interface DashboardStats {
    totalBots: number;
    activeBots: number;
    totalUsers: number;
    activeUsers: number;
    systemUptime: number;
    memoryUsage: NodeJS.MemoryUsage;
}
export declare class DashboardServer {
    private app;
    private server;
    private io;
    private port;
    private subBotManager;
    private connectedClients;
    private useSSL;
    constructor(subBotManager: SubBotManager);
    /**
     * Configura middlewares básicos
     */
    private setupMiddleware;
    /**
     * Configura rutas del dashboard
     */
    private setupRoutes;
    /**
     * Configura manejo de errores
     */
    private setupErrorHandling;
    /**
     * Configura WebSocket para tiempo real
     */
    private setupWebSocket;
    /**
     * Inicia el servidor de dashboard
     */
    start(): Promise<void>;
    /**
     * Detiene el servidor de dashboard
     */
    stop(): Promise<void>;
    /**
     * Obtiene estadísticas del dashboard
     */
    private getDashboardStats;
    /**
     * Envía estadísticas a un cliente específico
     */
    private sendStatsToClient;
    /**
     * Transmite estadísticas a todos los clientes conectados
     */
    private broadcastStats;
    /**
     * Transmite log de bot a clientes suscritos
     */
    broadcastBotLog(botId: string, logEntry: any): void;
    /**
     * Transmite cambio de estado de bot
     */
    broadcastBotStatusChange(botId: string, status: string): void;
    /**
     * Genera QR Code para vinculación de bot
     */
    private generateBotQRCode;
    /**
     * Genera HTML del dashboard principal
     */
    private generateDashboardHTML;
    /**
     * Genera HTML de la página de vinculación
     */
    private generateLinkPageHTML;
}
export default DashboardServer;
//# sourceMappingURL=DashboardServer.d.ts.map