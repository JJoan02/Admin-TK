import { BasePlugin } from '../base/BasePlugin.js';
import type { ICommand, ICommandResult, PluginMetadata, PluginConfig } from '../../types/index.js';
export declare class PingPlugin extends BasePlugin {
    readonly metadata: PluginMetadata;
    readonly config: PluginConfig;
    private startTime;
    protected onInitialize(): Promise<void>;
    protected onExecute(command: ICommand): Promise<ICommandResult>;
    protected onCleanup(): Promise<void>;
    /**
     * Genera el mensaje de ping con información del sistema
     */
    private generatePingMessage;
    /**
     * Obtiene el tiempo de actividad del bot
     */
    private getUptime;
    /**
     * Obtiene información del sistema
     */
    private getSystemInfo;
    /**
     * Calcula el uso aproximado de CPU
     */
    private getCPUUsage;
    cleanup(): Promise<void>;
}
export default PingPlugin;
//# sourceMappingURL=PingPlugin.d.ts.map