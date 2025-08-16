import { EventEmitter } from 'events';
import type { SubBotConfig, BotStatus } from '../types/index.js';
export declare class SubBotManager extends EventEmitter {
    private bots;
    private workers;
    private isInitialized;
    initialize(): Promise<void>;
    createBot(config: Omit<SubBotConfig, 'id' | 'createdAt'>): Promise<string>;
    startBot(botId: string): Promise<void>;
    stopBot(botId: string): Promise<void>;
    restartBot(botId: string): Promise<void>;
    deleteBot(botId: string): Promise<void>;
    stopAllBots(): Promise<void>;
    getBotConfig(botId: string): SubBotConfig | undefined;
    getBotsByUser(userId: string): SubBotConfig[];
    getAllBots(): SubBotConfig[];
    getBot(botId: string): SubBotConfig | undefined;
    getBotStatus(botId: string): BotStatus | undefined;
    private handleWorkerMessage;
    private handleWorkerError;
    private handleWorkerExit;
    private loadExistingBots;
    private saveBotConfig;
    private deleteBotConfig;
}
//# sourceMappingURL=SubBotManager.d.ts.map