import { EventEmitter } from 'events';
import { SubBotManager } from './SubBotManager.js';
import { APIServer } from '../api/APIServer.js';
import { DashboardServer } from './DashboardServer.js';
import { DatabaseService } from '../database/DatabaseService.js';
export declare class AdminTKServer extends EventEmitter {
    private subBotManager;
    private apiServer;
    private dashboardServer;
    private databaseService;
    private isInitialized;
    private isStarted;
    constructor();
    initialize(): Promise<void>;
    start(): Promise<void>;
    shutdown(): Promise<void>;
    private gracefulShutdown;
    private setupEventHandlers;
    get bots(): SubBotManager;
    get database(): DatabaseService;
    get api(): APIServer;
    get dashboard(): DashboardServer;
    get isReady(): boolean;
    get status(): string;
    get info(): {
        domain: string;
        vpsIP: string;
        dashboardPort: number;
        apiPort: number;
        status: string;
        uptime: any;
        memory: any;
    };
}
export default AdminTKServer;
//# sourceMappingURL=AdminTKServer.d.ts.map