import { EventEmitter } from 'events';
import { IPluginModule, ICommand, ICommandResult, PluginMetadata, PluginConfig, HealthStatus } from '../../types/index.js';
export declare abstract class BasePlugin extends EventEmitter implements IPluginModule {
    abstract readonly metadata: PluginMetadata;
    abstract readonly config: PluginConfig;
    protected isInitialized: boolean;
    protected isEnabled: boolean;
    constructor();
    /**
     * Inicializa el plugin
     */
    initialize(): Promise<void>;
    /**
     * Ejecuta un comando del plugin
     */
    execute(command: ICommand): Promise<ICommandResult>;
    /**
     * Limpia recursos del plugin
     */
    cleanup(): Promise<void>;
    /**
     * Obtiene el estado de salud del plugin
     */
    getHealth(): Promise<HealthStatus>;
    /**
     * Habilita o deshabilita el plugin
     */
    setEnabled(enabled: boolean): void;
    /**
     * Verifica si el usuario tiene permisos para ejecutar el comando
     */
    protected hasPermission(command: ICommand): boolean;
    /**
     * Verifica el cooldown del comando
     */
    protected checkCooldown(command: ICommand): boolean;
    /**
     * Configura los event handlers del plugin
     */
    private setupEventHandlers;
    protected abstract onInitialize(): Promise<void>;
    protected abstract onExecute(command: ICommand): Promise<ICommandResult>;
    protected abstract onCleanup(): Promise<void>;
    protected onHealthCheck?(): Promise<HealthStatus>;
}
export default BasePlugin;
//# sourceMappingURL=BasePlugin.d.ts.map