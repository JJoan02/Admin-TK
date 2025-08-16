import { SubBotManager } from '../core/SubBotManager.js';
import { DatabaseService } from '../database/DatabaseService.js';
export declare class APIServer {
    private app;
    private server;
    private port;
    private subBotManager;
    private databaseService;
    private internalAPIService;
    constructor(subBotManager: SubBotManager, databaseService: DatabaseService);
    private setupMiddleware;
    private setupRoutes;
    private setupTranslationRoutes;
    private setupErrorHandling;
    start(): Promise<void>;
    stop(): Promise<void>;
    get isRunning(): boolean;
    get address(): string | null;
}
export default APIServer;
//# sourceMappingURL=APIServer.d.ts.map