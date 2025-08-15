// src/plugins/base/BasePlugin.ts - Plugin base en TypeScript

import { EventEmitter } from 'events';
import { IPluginModule, ICommand, ICommandResult, PluginMetadata, PluginConfig, HealthStatus, Permission } from '../../types/index.js';
import { createModuleLogger } from '../../utils/logger.js';

const logger = createModuleLogger('BasePlugin');

export abstract class BasePlugin extends EventEmitter implements IPluginModule {
  abstract readonly metadata: PluginMetadata;
  abstract readonly config: PluginConfig;
  
  protected isInitialized = false;
  protected isEnabled = true;
  
  constructor() {
    super();
    this.setupEventHandlers();
  }

  /**
   * Inicializa el plugin
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      logger.info(`🔌 Inicializando plugin: ${this.metadata.name}`);
      
      await this.onInitialize();
      
      this.isInitialized = true;
      this.emit('initialized', this.metadata.name);
      
      logger.info(`✅ Plugin ${this.metadata.name} inicializado correctamente`);
    } catch (error) {
      logger.error({ err: error }, `❌ Error al inicializar plugin ${this.metadata.name}`);
      throw error;
    }
  }

  /**
   * Ejecuta un comando del plugin
   */
  async execute(command: ICommand): Promise<ICommandResult> {
    if (!this.isInitialized) {
      throw new Error(`Plugin ${this.metadata.name} no está inicializado`);
    }

    if (!this.isEnabled) {
      return {
        success: false,
        error: `Plugin ${this.metadata.name} está deshabilitado`
      };
    }

    try {
      // Verificar permisos
      if (!this.hasPermission(command)) {
        return {
          success: false,
          error: 'No tienes permisos para ejecutar este comando'
        };
      }

      // Verificar cooldown
      if (!this.checkCooldown(command)) {
        return {
          success: false,
          error: 'Comando en cooldown, espera un momento'
        };
      }

      // Ejecutar comando
      const result = await this.onExecute(command);
      
      // Registrar ejecución exitosa
      this.emit('commandExecuted', {
        command: command.name,
        user: command.sender,
        success: result.success
      });

      return result;

    } catch (error) {
      logger.error({ err: error }, `Error ejecutando comando ${command.name} en plugin ${this.metadata.name}`);
      
      this.emit('commandError', {
        command: command.name,
        user: command.sender,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      return {
        success: false,
        error: 'Error interno del plugin'
      };
    }
  }

  /**
   * Limpia recursos del plugin
   */
  async cleanup(): Promise<void> {
    try {
      logger.info(`🧹 Limpiando plugin: ${this.metadata.name}`);
      
      await this.onCleanup();
      
      this.isInitialized = false;
      this.emit('cleaned', this.metadata.name);
      
      logger.info(`✅ Plugin ${this.metadata.name} limpiado correctamente`);
    } catch (error) {
      logger.error({ err: error }, `❌ Error al limpiar plugin ${this.metadata.name}`);
      throw error;
    }
  }

  /**
   * Obtiene el estado de salud del plugin
   */
  async getHealth(): Promise<HealthStatus> {
    try {
      if (!this.isInitialized) {
        return {
          status: 'warning',
          message: 'Plugin no inicializado',
          lastCheck: new Date()
        };
      }

      if (!this.isEnabled) {
        return {
          status: 'warning',
          message: 'Plugin deshabilitado',
          lastCheck: new Date()
        };
      }

      const customHealth = await this.onHealthCheck?.();
      return customHealth || {
        status: 'healthy',
        message: 'Plugin funcionando correctamente',
        lastCheck: new Date()
      };

    } catch (error) {
      return {
        status: 'error',
        message: `Error en health check: ${error instanceof Error ? error.message : 'Unknown error'}`,
        lastCheck: new Date()
      };
    }
  }

  /**
   * Habilita o deshabilita el plugin
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    this.emit('enabledChanged', { plugin: this.metadata.name, enabled });
    logger.info(`Plugin ${this.metadata.name} ${enabled ? 'habilitado' : 'deshabilitado'}`);
  }

  /**
   * Verifica si el usuario tiene permisos para ejecutar el comando
   */
  protected hasPermission(command: ICommand): boolean {
    // Si no hay permisos requeridos en el metadata, permitir acceso
    if (!this.metadata.permissions || this.metadata.permissions.length === 0) {
      return true;
    }

    // Verificar si el usuario tiene alguno de los permisos requeridos
    return this.metadata.permissions.some((permission: Permission) => 
      command.permissions.includes(permission)
    );
  }

  /**
   * Verifica el cooldown del comando
   */
  protected checkCooldown(command: ICommand): boolean {
    if (!this.config.cooldown) {
      return true;
    }

    // Implementar lógica de cooldown aquí
    // Por ahora retornamos true
    return true;
  }

  /**
   * Configura los event handlers del plugin
   */
  private setupEventHandlers(): void {
    this.on('error', (error) => {
      logger.error({ err: error }, `Error en plugin ${this.metadata.name}`);
    });
  }

  // Métodos abstractos que deben implementar los plugins hijos
  protected abstract onInitialize(): Promise<void>;
  protected abstract onExecute(command: ICommand): Promise<ICommandResult>;
  protected abstract onCleanup(): Promise<void>;
  protected onHealthCheck?(): Promise<HealthStatus>;
}

export default BasePlugin;
