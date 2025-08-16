export interface PluginContext {
    message: any;
    messageText: string;
    command: string;
    args: string[];
    user: {
        jid: string;
        name?: string;
        role?: string;
        isOwner?: boolean;
        isPremium?: boolean;
    };
    chat: {
        id: string;
        isGroup: boolean;
    };
    group?: {
        id: string;
        subject: string;
        participants: any[];
    };
    isGroup: boolean;
    botIsAdmin?: boolean;
    sock: any;
    reply: (text: string, options?: any) => Promise<void>;
    react: (emoji: string) => Promise<void>;
    db?: any;
    logger?: any;
    config?: any;
    aiService?: any;
}
export interface PluginCommand {
    name: string;
    description: string;
    usage?: string;
    alias?: string[];
    category?: string;
    permissions?: string[];
    cooldown?: number;
    minArgs?: number;
    maxArgs?: number;
    requireGroup?: boolean;
    requirePrivate?: boolean;
    requireBotAdmin?: boolean;
    execute: (context: PluginContext) => Promise<void> | void;
    command?: any;
    handler?: any;
    pluginName?: string;
}
export interface PluginInstance {
    name: string;
    description: string;
    version: string;
    author: string;
    commands: PluginCommand[];
    initialize?(): Promise<void> | void;
    destroy?(): Promise<void> | void;
    category?: string;
    tags?: string[];
    dependencies?: string[];
    config?: Record<string, any>;
}
export interface PluginMetadata {
    name: string;
    description: string;
    version: string;
    author: string;
    category?: string;
    tags?: string[];
    commands: {
        name: string;
        description: string;
        usage?: string;
        category?: string;
        permissions?: string[];
    }[];
}
export interface PluginConfig {
    enabled: boolean;
    settings?: Record<string, any>;
    permissions?: {
        allowedRoles?: string[];
        allowedUsers?: string[];
        blockedUsers?: string[];
    };
}
export interface PluginStats {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
    lastExecuted?: Date;
    commandStats: Record<string, {
        executions: number;
        averageTime: number;
        lastExecuted: Date;
    }>;
}
export type PluginCategory = 'admin' | 'ai' | 'media' | 'games' | 'utils' | 'nsfw' | 'social' | 'config' | 'economy' | 'fun' | 'tools' | 'information' | 'other';
export type UserRole = 'user' | 'premium' | 'moderator' | 'admin' | 'owner';
export type BotStatus = 'online' | 'offline' | 'connecting' | 'error';
export interface PluginEvent {
    type: string;
    data: any;
    timestamp: Date;
    source: string;
}
export interface PluginEventHandler {
    event: string;
    handler: (data: any) => Promise<void> | void;
}
export interface PluginHooks {
    beforeCommand?: (context: PluginContext) => Promise<boolean> | boolean;
    afterCommand?: (context: PluginContext, result: any) => Promise<void> | void;
    onError?: (error: Error, context: PluginContext) => Promise<void> | void;
}
export interface PluginValidator {
    name: string;
    validate: (context: PluginContext) => Promise<boolean> | boolean;
    errorMessage?: string;
}
export interface PluginMiddleware {
    name: string;
    priority: number;
    execute: (context: PluginContext, next: () => Promise<void>) => Promise<void>;
}
//# sourceMappingURL=plugin.d.ts.map