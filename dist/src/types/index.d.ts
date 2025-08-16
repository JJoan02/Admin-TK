export interface IPluginModule {
    readonly metadata: PluginMetadata;
    readonly config: PluginConfig;
    initialize(): Promise<void>;
    execute(command: ICommand): Promise<ICommandResult>;
    cleanup(): Promise<void>;
    getHealth?(): Promise<HealthStatus>;
}
export interface PluginMetadata {
    name: string;
    version: string;
    description: string;
    category: PluginCategory;
    commands: string[];
    author?: string;
    dependencies?: string[];
    permissions: Permission[];
}
export interface PluginConfig {
    enabled: boolean;
    cooldown?: number;
    rateLimitPerUser?: number;
    rateLimitPerGroup?: number;
    requiresInternet?: boolean;
    usesAPI?: boolean;
}
export interface ICommand {
    name: string;
    args: string[];
    message: any;
    sender: string;
    isGroup: boolean;
    groupId?: string;
    userId: string;
    permissions: Permission[];
    timestamp: Date;
}
export interface ICommandResult {
    success: boolean;
    response?: string;
    media?: MediaResponse;
    error?: string;
    shouldReply?: boolean;
    metadata?: Record<string, any>;
}
export interface MediaResponse {
    type: 'image' | 'video' | 'audio' | 'document' | 'sticker';
    buffer?: Buffer;
    url?: string;
    filename?: string;
    caption?: string;
    mimetype?: string;
}
export interface HealthStatus {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    details?: Record<string, any>;
    lastCheck: Date;
}
export interface SubBotConfig {
    id: string;
    userId: string;
    name: string;
    phoneNumber: string;
    status: BotStatus;
    config: BotConfiguration;
    createdAt: Date;
    lastActivity?: Date | undefined;
}
export interface BotConfiguration {
    prefix: string;
    language: 'es' | 'en';
    enabledPlugins: string[];
    adminNumbers: string[];
    groupSettings: GroupSettings;
    apiSettings: APISettings;
}
export interface GroupSettings {
    antiSpam: boolean;
    antiLink: boolean;
    welcome: boolean;
    autoAdmin: boolean;
    maxWarnings: number;
    allowGroups?: boolean;
    autoJoin?: boolean;
    maxGroups?: number;
}
export interface APISettings {
    enableInternalAPI: boolean;
    apiKey?: string;
    allowedOrigins: string[];
    rateLimits: {
        perMinute: number;
        perHour: number;
        perDay: number;
    };
    enabled?: boolean;
    port?: number;
}
export interface DashboardUser {
    id: string;
    phoneNumber: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    lastLogin?: Date | undefined;
    permissions: Permission[];
    bots: string[];
}
export interface APIResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp: Date;
    requestId?: string;
}
export interface SearchResult {
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
    duration?: string;
    author?: string;
    views?: string;
    uploadDate?: string;
}
export interface DownloadResult {
    success: boolean;
    filename: string;
    filepath: string;
    size: number;
    format: string;
    quality?: string;
    duration?: string;
    error?: string;
}
export type PluginCategory = 'busqueda' | 'descargas' | 'administracion' | 'diversion' | 'economia' | 'utilidades' | 'ia' | 'herramientas' | 'social' | 'juegos';
export type Permission = 'user' | 'group_admin' | 'bot_admin' | 'owner' | 'premium' | 'developer';
export type UserRole = 'owner' | 'admin' | 'vip' | 'subbot' | 'user';
export type UserStatus = 'active' | 'inactive' | 'banned' | 'pending';
export type BotStatus = 'online' | 'offline' | 'connecting' | 'error' | 'maintenance';
export interface SystemEvent {
    type: string;
    data: any;
    timestamp: Date;
    source: string;
}
export interface BotEvent extends SystemEvent {
    botId: string;
    userId: string;
}
export interface ServerConfig {
    port: number;
    apiPort: number;
    host: string;
    cors: {
        origin: string[];
        credentials: boolean;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
    security: {
        jwtSecret: string;
        sessionSecret: string;
        encryptionKey: string;
    };
}
//# sourceMappingURL=index.d.ts.map