// src/types/global.ts - Tipos globales del proyecto

export interface Logger {
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string | object, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
  fatal(message: string | object, ...args: any[]): void;
}

export interface Config {
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
  api: {
    geminiApiKey: string;
    cloudinary: {
      cloudName: string;
      apiKey: string;
      apiSecret: string;
    };
    pexelsApiKey: string;
  };
  database: {
    type: string;
    sqlite?: {
      filename: string;
    };
    lowdb?: {
      path: string;
    };
  };
  pluginConfig: {
    loadPlugins: boolean;
    pluginsPath?: string;
    hotReload?: boolean;
  };
  [key: string]: any;
}

export interface DatabaseService {
  init(): Promise<void>;
  getDB(): any;
  close(): Promise<void>;
}

export interface WhatsAppMessage {
  key: {
    id: string;
    remoteJid: string;
    fromMe: boolean;
  };
  message: any;
  messageTimestamp: number;
  pushName?: string;
}

export interface WhatsAppSocket {
  user: {
    id: string;
    name: string;
  };
  sendMessage(jid: string, content: any, options?: any): Promise<any>;
  groupMetadata(jid: string): Promise<any>;
  [key: string]: any;
}

export interface PluginContext {
  message: WhatsAppMessage;
  args: string[];
  reply: (text: string) => Promise<void>;
  conn: WhatsAppSocket;
  user: {
    jid: string;
    name?: string;
  };
  chat: {
    id: string;
    isGroup: boolean;
  };
  group?: {
    subject: string;
    participants: any[];
  };
  usedPrefix: string;
  command: string;
  config: Config;
  [key: string]: any;
}

export interface Plugin {
  name: string;
  description?: string;
  version?: string;
  author?: string;
  commands: PluginCommand[];
  initialize?(): Promise<void> | void;
  destroy?(): Promise<void> | void;
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
  execute?: (context: PluginContext) => Promise<void> | void;
}

export interface DependencyContainer {
  register(name: string, resolver: any, options?: any): void;
  resolve<T>(name: string): T;
  isRegistered(name: string): boolean;
  clear(): void;
}

export interface ErrorHandler {
  handleError(error: Error, context?: any): void;
}

export interface EventEmitter {
  on(event: string, listener: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): boolean;
  removeListener(event: string, listener: (...args: any[]) => void): this;
}

// Tipos para servicios específicos
export interface AIService {
  generateResponse(context: any): Promise<{ text: string; reaction?: string }>;
  generateRawText(prompt: string): Promise<string>;
}

export interface MemoryService {
  init(): Promise<void>;
  addInteraction(interaction: any): Promise<void>;
  getRecentInteractions(chatId: string, limit: number): Promise<any[]>;
  getFactsForChat(chatId: string): Promise<any[]>;
}

export interface UserManager {
  getUser(jid: string): Promise<any>;
  updateUser(jid: string, data: any): Promise<void>;
  createUser(jid: string, data: any): Promise<void>;
}

export interface GroupManager {
  getGroup(jid: string): Promise<any>;
  updateGroup(jid: string, data: any): Promise<void>;
  createGroup(jid: string, data: any): Promise<void>;
}

export interface ChatManager {
  getChat(jid: string): Promise<any>;
  updateChat(jid: string, data: any): Promise<void>;
  createChat(jid: string, data: any): Promise<void>;
}

// Tipos para el sistema de plugins avanzado
export interface RPGUser {
  jid: string;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  coins: number;
  inventory: RPGItem[];
  equipment: RPGEquipment;
  lastBattle?: Date;
  lastDungeon?: Date;
}

export interface RPGItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'material';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  value: number;
  stats?: {
    attack?: number;
    defense?: number;
    health?: number;
  };
  quantity: number;
}

export interface RPGEquipment {
  weapon?: RPGItem;
  armor?: RPGItem;
  accessory?: RPGItem;
}

export interface CollectionItem {
  id: string;
  type: string;
  name: string;
  description: string;
  rarity: string;
  imageUrl: string;
  localPath?: string;
  obtainedAt: Date;
  owner: string;
  tradeable: boolean;
  marketValue: number;
}

export interface MarketListing {
  id: string;
  itemId: string;
  sellerId: string;
  price: number;
  listedAt: Date;
  status: 'active' | 'sold' | 'cancelled';
}

export interface TradeOffer {
  id: string;
  fromUser: string;
  toUser: string;
  offeredItems: string[];
  requestedItems: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: Date;
  expiresAt: Date;
}
