// config/config.js - Configuración completa de Admin-TK
export const config = {
    // Información básica del bot
    botName: 'Admin-TK',
    prefix: '.',
    ownerNumbers: ['5493885274506'], // Números de owner sin @s.whatsapp.net
    botNumber: '', // Se configurará automáticamente al conectar
    // Configuración del dominio y servidor
    domain: 'admin-tk.fun',
    vpsIP: '206.183.129.67',
    // Puertos de servicios
    ports: {
        dashboard: 3000,
        api: 3001,
        websocket: 3002
    },
    // URLs completas
    urls: {
        dashboard: 'https://admin-tk.fun',
        api: 'https://admin-tk.fun:3001',
        websocket: 'wss://admin-tk.fun:3002'
    },
    // Configuración SSL
    ssl: {
        enabled: true,
        certPath: '/etc/letsencrypt/live/admin-tk.fun/fullchain.pem',
        keyPath: '/etc/letsencrypt/live/admin-tk.fun/privkey.pem'
    },
    // CORS permitidos
    allowedOrigins: [
        'https://admin-tk.fun',
        'https://www.admin-tk.fun',
        'http://localhost:3000', // Para desarrollo
        'http://206.183.129.67:3000'
    ],
    // Configuración de seguridad
    security: {
        jwtSecret: process.env.JWT_SECRET || 'admin-tk-secret-key-2024',
        sessionSecret: process.env.SESSION_SECRET || 'admin-tk-session-secret',
        bcryptRounds: 12
    },
    // Configuración de APIs
    api: {
        geminiApiKey: process.env.GEMINI_API_KEY || 'AIzaSyBSPXVUKBxtFmm-lYojHmtlPozYdjcNyXs',
        cloudinary: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
            apiKey: process.env.CLOUDINARY_API_KEY || '',
            apiSecret: process.env.CLOUDINARY_API_SECRET || ''
        },
        pexelsApiKey: process.env.PEXELS_API_KEY || ''
    },
    // Configuración de IA
    ai: {
        model: 'gemini-1.5-pro-latest'
    },
    // Configuración de base de datos SQLite
    database: {
        type: 'sqlite',
        sqlite: {
            filename: './storage/database/admin-tk.db'
        },
        lowdb: {
            path: './storage/database/lowdb.json'
        },
        backupPath: './storage/backups/'
    },
    // Configuración de plugins
    pluginConfig: {
        loadPlugins: true,
        pluginsPath: './src/plugins',
        hotReload: true
    },
    // Configuración de roles
    roles: {
        owner: 'owner',
        admin: 'admin',
        moderator: 'moderator',
        premium: 'premium',
        user: 'user'
    },
    // Configuración de funcionalidades
    features: {
        aiMode: true,
        antilink: false,
        antidelete: false,
        welcome: true,
        autoresponder: false,
        proactiveEngagement: false
    },
    // Configuración de límites
    limits: {
        messageLength: 4000,
        commandCooldown: 3000, // 3 segundos
        aiCooldown: 5000, // 5 segundos
        maxRetries: 3
    },
    // Configuración de backup
    backup: {
        enabled: true,
        interval: '0 2 * * *', // Diario a las 2 AM
        keepDays: 7,
        googleDrive: {
            enabled: false,
            backupFolderId: ''
        }
    },
    // Configuración de monitoreo
    monitoring: {
        enabled: true,
        metricsPort: 9090,
        healthCheckInterval: 30000 // 30 segundos
    },
    // Configuración de desarrollo
    development: {
        debug: process.env.NODE_ENV !== 'production',
        verbose: false,
        skipBackupMenu: process.env.SKIP_BACKUP_MENU === 'true'
    }
};
// Configuración específica del dominio (compatibilidad)
export const domainConfig = {
    domain: config.domain,
    vpsIP: config.vpsIP,
    ports: config.ports,
    urls: config.urls,
    ssl: config.ssl,
    allowedOrigins: config.allowedOrigins,
    security: config.security,
    database: config.database
};
export default config;
//# sourceMappingURL=config.js.map