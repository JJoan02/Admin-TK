export declare const config: {
    botName: string;
    prefix: string;
    ownerNumbers: string[];
    botNumber: string;
    domain: string;
    vpsIP: string;
    ports: {
        dashboard: number;
        api: number;
        websocket: number;
    };
    urls: {
        dashboard: string;
        api: string;
        websocket: string;
    };
    ssl: {
        enabled: boolean;
        certPath: string;
        keyPath: string;
    };
    allowedOrigins: string[];
    security: {
        jwtSecret: any;
        sessionSecret: any;
        bcryptRounds: number;
    };
    api: {
        geminiApiKey: any;
        cloudinary: {
            cloudName: any;
            apiKey: any;
            apiSecret: any;
        };
        pexelsApiKey: any;
    };
    ai: {
        model: string;
    };
    database: {
        type: string;
        sqlite: {
            filename: string;
        };
        lowdb: {
            path: string;
        };
        backupPath: string;
    };
    pluginConfig: {
        loadPlugins: boolean;
        pluginsPath: string;
        hotReload: boolean;
    };
    roles: {
        owner: string;
        admin: string;
        moderator: string;
        premium: string;
        user: string;
    };
    features: {
        aiMode: boolean;
        antilink: boolean;
        antidelete: boolean;
        welcome: boolean;
        autoresponder: boolean;
        proactiveEngagement: boolean;
    };
    limits: {
        messageLength: number;
        commandCooldown: number;
        aiCooldown: number;
        maxRetries: number;
    };
    backup: {
        enabled: boolean;
        interval: string;
        keepDays: number;
        googleDrive: {
            enabled: boolean;
            backupFolderId: string;
        };
    };
    monitoring: {
        enabled: boolean;
        metricsPort: number;
        healthCheckInterval: number;
    };
    development: {
        debug: boolean;
        verbose: boolean;
        skipBackupMenu: boolean;
    };
};
export declare const domainConfig: {
    domain: string;
    vpsIP: string;
    ports: {
        dashboard: number;
        api: number;
        websocket: number;
    };
    urls: {
        dashboard: string;
        api: string;
        websocket: string;
    };
    ssl: {
        enabled: boolean;
        certPath: string;
        keyPath: string;
    };
    allowedOrigins: string[];
    security: {
        jwtSecret: any;
        sessionSecret: any;
        bcryptRounds: number;
    };
    database: {
        type: string;
        sqlite: {
            filename: string;
        };
        lowdb: {
            path: string;
        };
        backupPath: string;
    };
};
export default config;
//# sourceMappingURL=config.d.ts.map