// src/types/modules.d.ts - Declaraciones de tipos para módulos JavaScript

declare module '../utils/fileWatcher.js' {
  interface FileWatcher {
    watchFile(filePath: string, callback: (eventType: string, filename: string) => void): void;
    unwatchFile(filePath: string): void;
    unwatchAll(): void;
  }
  
  const FileWatcher: FileWatcher;
  export default FileWatcher;
}

declare module './ErrorHandler.js' {
  export class ApiError extends Error {
    constructor(message: string, originalError?: Error);
  }
  
  export class DatabaseError extends Error {
    constructor(message: string, originalError?: Error);
  }
  
  export class ValidationError extends Error {
    constructor(message: string, field?: string);
  }
  
  interface ErrorHandler {
    handleError(error: Error, context?: any): void;
  }
  
  export default ErrorHandler;
}

declare module '../services/AIService.js' {
  interface AIService {
    generateResponse(context: any): Promise<{ text: string; reaction?: string }>;
    generateRawText(prompt: string): Promise<string>;
  }
  
  export default AIService;
}

declare module '../core/DependencyContainer.js' {
  interface DependencyContainer {
    resolve<T>(key: string | Function): T;
    register(key: string, value: any, options?: any): void;
    isRegistered(key: string): boolean;
    getInstance(): DependencyContainer;
  }
  
  export default DependencyContainer;
}

declare module '../core/CommandBus.js' {
  interface CommandBus {
    register(commandClass: any, handlerClass: any): void;
    dispatch(command: any): Promise<any>;
  }
  
  export default CommandBus;
}

declare module 'qrcode' {
  interface QRCodeOptions {
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }
  
  export function toBuffer(text: string, options?: QRCodeOptions): Promise<Buffer>;
  export function toString(text: string, options?: QRCodeOptions): Promise<string>;
  export function toDataURL(text: string, options?: QRCodeOptions): Promise<string>;
}
