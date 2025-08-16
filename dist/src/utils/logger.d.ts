export declare const logger: any;
export declare const createModuleLogger: (module: string) => any;
export declare const initializeLogger: () => any;
export declare const setConsoleSilentMode: (silent: boolean) => void;
export declare const logSystemEvent: (event: string, data: any, level?: "info" | "warn" | "error") => void;
export declare const logCommand: (command: string, user: string, group?: string, success?: boolean) => void;
export declare const logPluginError: (pluginName: string, error: Error, context?: any) => void;
export declare const logAPIRequest: (method: string, path: string, user?: string, responseTime?: number, statusCode?: number) => void;
export default logger;
//# sourceMappingURL=logger.d.ts.map