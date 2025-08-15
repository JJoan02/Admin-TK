// config/domain.config.js - Configuración del dominio para Admin-TK

export const domainConfig = {
  // Configuración del dominio principal
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
  
  // Configuración de base de datos
  database: {
    path: './storage/database/admin-tk.db',
    backupPath: './storage/backups/'
  }
};

export default domainConfig;
