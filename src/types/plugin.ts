// src/types/plugin.ts - Tipos para el sistema de plugins

export interface PluginContext {
  // Información del mensaje
  message: any;
  messageText: string;
  command: string;
  args: string[];
  
  // Información del usuario
  user: {
    jid: string;
    name?: string;
    role?: string;
    isOwner?: boolean;
    isPremium?: boolean;
  };
  
  // Información del chat
  chat: {
    id: string;
    isGroup: boolean;
  };
  
  // Información del grupo (si aplica)
  group?: {
    id: string;
    subject: string;
    participants: any[];
  };
  
  // Estado del bot
  isGroup: boolean;
  botIsAdmin?: boolean;
  
  // Servicios disponibles
  sock: any; // WhatsApp socket
  reply: (text: string, options?: any) => Promise<void>;
  react: (emoji: string) => Promise<void>;
  
  // Servicios del sistema
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
  
  // Para compatibilidad con Command Bus
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
  
  // Métodos del ciclo de vida
  initialize?(): Promise<void> | void;
  destroy?(): Promise<void> | void;
  
  // Metadatos adicionales
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

// Tipos para categorías de plugins
export type PluginCategory = 
  | 'admin'
  | 'ai' 
  | 'media'
  | 'games'
  | 'utils'
  | 'nsfw'
  | 'social'
  | 'config'
  | 'economy'
  | 'fun'
  | 'tools'
  | 'information'
  | 'other';

// Tipos para permisos
export type UserRole = 'user' | 'premium' | 'moderator' | 'admin' | 'owner';

// Tipos para el estado del bot
export type BotStatus = 'online' | 'offline' | 'connecting' | 'error';

// Interfaz para el sistema de eventos de plugins
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

// Interfaz para hooks del sistema
export interface PluginHooks {
  beforeCommand?: (context: PluginContext) => Promise<boolean> | boolean;
  afterCommand?: (context: PluginContext, result: any) => Promise<void> | void;
  onError?: (error: Error, context: PluginContext) => Promise<void> | void;
}

// Interfaz para validadores personalizados
export interface PluginValidator {
  name: string;
  validate: (context: PluginContext) => Promise<boolean> | boolean;
  errorMessage?: string;
}

// Interfaz para middleware de plugins
export interface PluginMiddleware {
  name: string;
  priority: number;
  execute: (context: PluginContext, next: () => Promise<void>) => Promise<void>;
}
