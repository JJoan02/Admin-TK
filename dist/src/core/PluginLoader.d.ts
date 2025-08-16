interface PluginCommand {
    name: string;
    description: string;
    usage?: string;
    alias?: string[];
    category?: string;
    permissions?: string[];
    cooldown?: number;
    minArgs?: number;
    maxArgs?: number;
    execute?: (context: any) => Promise<void> | void;
    command?: any;
    handler?: any;
    pluginName?: string;
}
interface PluginInstance {
    name: string;
    description?: string;
    version?: string;
    author?: string;
    commands: PluginCommand[];
    initialize?(): Promise<void> | void;
    destroy?(): Promise<void> | void;
}
interface FailedPlugin {
    name: string;
    file: string;
    error: Error;
}
interface Logger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    fatal(message: string): void;
}
interface ErrorHandler {
    handleError(error: Error, context?: any): void;
}
interface Config {
    pluginConfig: {
        loadPlugins: boolean;
        pluginsPath?: string;
        hotReload?: boolean;
    };
}
interface DependencyContainer {
    resolve<T>(key: string | Function): T;
    register(key: string, value: any, options?: any): void;
    isRegistered(key: string): boolean;
}
export declare class PluginLoader {
    readonly commands: Map<string, PluginCommand>;
    readonly loadedPlugins: Map<string, PluginInstance>;
    readonly failedPlugins: FailedPlugin[];
    private readonly pluginFilePaths;
    private readonly config;
    private readonly logger;
    private readonly errorHandler;
    private readonly container;
    constructor(config: Config, logger: Logger, errorHandler: ErrorHandler, container: DependencyContainer);
    loadPlugins(): Promise<void>;
    private getPluginFilesRecursive;
    private isValidPluginFile;
    private loadSinglePlugin;
    private isValidPluginClass;
    private validatePluginInstance;
    private registerPluginCommands;
    private registerCommandHandler;
    private registerCommandAliases;
    private setupHotReload;
    private handlePluginLoadError;
    private handlePluginChange;
    printLoadingSummary(): void;
    stop(): void;
    getCommand(commandName: string): PluginCommand | undefined;
    getAllCommands(): Map<string, PluginCommand>;
    getPluginInstance(pluginName: string): PluginInstance | undefined;
    getCommandsByCategory(category: string): PluginCommand[];
    getPluginStats(): {
        totalPlugins: number;
        loadedPlugins: number;
        failedPlugins: number;
        totalCommands: number;
        categories: Record<string, number>;
    };
}
export default PluginLoader;
//# sourceMappingURL=PluginLoader.d.ts.map