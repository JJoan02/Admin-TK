// config/domain.config.d.ts - Tipos para la configuración del dominio

export interface DomainConfig {
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
    jwtSecret: string;
    sessionSecret: string;
    bcryptRounds: number;
  };
  database: {
    path: string;
    backupPath: string;
  };
}

declare const domainConfig: DomainConfig;
export default domainConfig;
