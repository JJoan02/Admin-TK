// src/core/PluginLoader.ts

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { readdir } from 'fs/promises';
import FileWatcher from '../utils/fileWatcher.js';
import { ApiError } from './ErrorHandler.js';

// Interfaces para tipado
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
  command?: any; // Command class
  handler?: any; // Handler class
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

export class PluginLoader {
  public readonly commands = new Map<string, PluginCommand>();
  public readonly loadedPlugins = new Map<string, PluginInstance>();
  public readonly failedPlugins: FailedPlugin[] = [];
  
  private readonly pluginFilePaths = new Map<string, string>();
  private readonly config: Config;
  private readonly logger: Logger;
  private readonly errorHandler: ErrorHandler;
  private readonly container: DependencyContainer;

  constructor(
    config: Config,
    logger: Logger,
    errorHandler: ErrorHandler,
    container: DependencyContainer
  ) {
    this.config = config;
    this.logger = logger;
    this.errorHandler = errorHandler;
    this.container = container;
  }

  public async loadPlugins(): Promise<void> {
    this.logger.info('🔌 Iniciando la carga dinámica de plugins...');

    if (this.config.pluginConfig.loadPlugins !== true) {
      this.logger.warn('⚠️ La carga de plugins está desactivada en la configuración. Saltando...');
      return;
    }

    const pluginsDirPath = process.env.PLUGINS_DIR || 
      path.resolve(process.cwd(), 'src', 'plugins');
    
    this.logger.debug(`📁 Ruta de plugins: ${pluginsDirPath}`);
    
    let pluginFiles: string[] = [];

    try {
      pluginFiles = await this.getPluginFilesRecursive(pluginsDirPath);
      this.logger.debug(`📄 Archivos encontrados: ${pluginFiles.map(p => path.basename(p)).join(', ')}`);
    } catch (error) {
      this.errorHandler.handleError(error as Error, { 
        context: 'PluginLoader.loadPlugins - readdir', 
        pluginsDirPath 
      });
      this.logger.error('💡 Sugerencia: Asegúrate de que la carpeta "src/plugins" exista y sea accesible.');
      return;
    }

    if (pluginFiles.length === 0) {
      this.logger.info('📭 No se encontraron archivos de plugins en la carpeta "src/plugins".');
      return;
    }

    this.logger.info(`✨ Se encontraron ${pluginFiles.length} archivos de plugins para cargar.`);

    // Limpiar estado anterior
    this.commands.clear();
    this.failedPlugins.length = 0;
    this.loadedPlugins.clear();
    this.pluginFilePaths.clear();
    FileWatcher.unwatchAll();

    // Cargar plugins
    for (const file of pluginFiles) {
      const pluginName = path.basename(file, '.js');
      this.logger.debug(`🔄 Cargando plugin: ${pluginName}`);
      await this.loadSinglePlugin(pluginName, file);
    }

    this.printLoadingSummary();
  }

  private async getPluginFilesRecursive(dir: string): Promise<string[]> {
    let results: string[] = [];
    const list = await readdir(dir, { withFileTypes: true });
    
    for (const file of list) {
      const filePath = path.resolve(dir, file.name);
      
      if (file.isDirectory()) {
        // Buscar recursivamente en subdirectorios
        results = results.concat(await this.getPluginFilesRecursive(filePath));
      } else if (this.isValidPluginFile(filePath)) {
        results.push(filePath);
      }
    }
    
    return results;
  }

  private isValidPluginFile(filePath: string): boolean {
    const fileName = path.basename(filePath);
    return (filePath.endsWith('.js') || filePath.endsWith('.ts')) && 
           !fileName.startsWith('.') &&
           !fileName.includes('base-plugin') &&
           !fileName.includes('README');
  }

  private async loadSinglePlugin(name: string, file: string): Promise<void> {
    const pluginPath = path.resolve(file);
    const moduleUrl = pathToFileURL(pluginPath).href;

    try {
      const uniqueModuleUrl = `${moduleUrl}?update=${Date.now()}`;
      this.logger.debug(`📥 Importando: ${uniqueModuleUrl}`);

      const module = await import(uniqueModuleUrl);
      const PluginClass = module.default;

      // Validar que sea una clase válida
      if (!this.isValidPluginClass(PluginClass)) {
        throw new Error('El archivo del plugin no exporta una clase por defecto válida.');
      }

      // Resolver dependencias e instanciar
      const pluginInstance = this.container.resolve<PluginInstance>(PluginClass);

      // Validar estructura del plugin
      this.validatePluginInstance(pluginInstance);

      // Registrar rutas de archivos
      this.pluginFilePaths.set(pluginInstance.name, pluginPath);

      // Registrar comandos
      await this.registerPluginCommands(pluginInstance, name);

      // Inicializar plugin si tiene método initialize
      if (pluginInstance.initialize) {
        await pluginInstance.initialize();
      }

      const commandNames = pluginInstance.commands.map(c => c.name).join(', ');
      this.logger.info(`✅ Plugin '${pluginInstance.name}' cargado. Comandos: [${commandNames}]`);
      this.loadedPlugins.set(pluginInstance.name, pluginInstance);

      // Configurar hot-reload si está habilitado
      if (this.config.pluginConfig.hotReload) {
        this.setupHotReload(pluginInstance, pluginPath, file);
      }

    } catch (error) {
      this.handlePluginLoadError(name, file, error as Error);
    }
  }

  private isValidPluginClass(PluginClass: any): boolean {
    return typeof PluginClass === 'function' && 
           /^\s*class\s/.test(PluginClass.toString());
  }

  private validatePluginInstance(pluginInstance: any): asserts pluginInstance is PluginInstance {
    if (!pluginInstance.name || typeof pluginInstance.name !== 'string' || pluginInstance.name.trim() === '') {
      throw new Error('La instancia del plugin debe tener una propiedad "name" (string no vacío).');
    }
    
    if (!Array.isArray(pluginInstance.commands)) {
      throw new Error('La instancia del plugin debe tener una propiedad "commands" (array).');
    }
  }

  private async registerPluginCommands(pluginInstance: PluginInstance, pluginName: string): Promise<void> {
    const commandBus = this.container.resolve('commandBus');

    for (const command of pluginInstance.commands) {
      const commandKey = command.name.toLowerCase();
      
      // Verificar conflictos
      if (this.commands.has(commandKey)) {
        this.logger.warn(`⚠️ Conflicto: El comando '${command.name}' del plugin '${pluginName}' será sobreescrito.`);
      }

      // Registrar comando
      this.commands.set(commandKey, { ...command, pluginName: pluginInstance.name });
      this.logger.debug(`➕ Comando registrado: ${commandKey}`);

      // Registrar en CommandBus si usa la nueva arquitectura
      if (command.command && command.handler) {
        await this.registerCommandHandler(command, commandBus);
      }

      // Registrar aliases
      if (command.alias && Array.isArray(command.alias)) {
        this.registerCommandAliases(command, pluginInstance.name);
      }
    }
  }

  private async registerCommandHandler(command: PluginCommand, commandBus: any): Promise<void> {
    const CommandClass = command.command;
    const HandlerClass = command.handler;
    const handlerName = HandlerClass.name.charAt(0).toLowerCase() + HandlerClass.name.slice(1);

    if (!this.container.isRegistered(handlerName)) {
      this.container.register(handlerName, HandlerClass, { isSingleton: false });
    }
    
    commandBus.register(CommandClass, HandlerClass);
    this.logger.info(`🔗 Handler '${HandlerClass.name}' registrado para '${CommandClass.name}'.`);
  }

  private registerCommandAliases(command: PluginCommand, pluginName: string): void {
    for (const alias of command.alias!) {
      const aliasKey = alias.toLowerCase();
      
      if (this.commands.has(aliasKey)) {
        this.logger.warn(`⚠️ Conflicto de alias: '${alias}' será sobreescrito.`);
      }
      
      this.commands.set(aliasKey, { ...command, pluginName });
      this.logger.debug(`🔗 Alias registrado: ${aliasKey} → ${command.name}`);
    }
  }

  private setupHotReload(pluginInstance: PluginInstance, pluginPath: string, file: string): void {
    FileWatcher.watchFile(pluginPath, (eventType: string, filename: string) => {
      this.logger.info(`🔄 Cambio detectado en '${pluginInstance.name}' (${filename}).`);
      this.handlePluginChange(pluginInstance.name, pluginPath, file);
    });
  }

  private handlePluginLoadError(name: string, file: string, error: Error): void {
    this.errorHandler.handleError(error, { context: `PluginLoader.loadSinglePlugin - ${name}` });
    
    this.logger.error('─'.repeat(50));
    this.logger.error(`❌ Error cargando plugin '${name}' desde '${file}':`);
    this.logger.error(`💬 ${error.message}`);

    // Sugerencias específicas según el tipo de error
    if (error.message.includes('Unexpected token \'class\'') ||
        error.message.includes('Cannot use import statement outside a module')) {
      this.logger.error('💡 El archivo no está siendo tratado como módulo ES.');
      this.logger.error('💡 Verifica que package.json tenga "type": "module".');
    } else if (error.message.includes('not export a default')) {
      this.logger.error('💡 El plugin debe exportar su clase con `export default MiClase;`.');
    } else if (error.message.includes('structure required')) {
      this.logger.error('💡 El plugin debe tener propiedades `name` (string) y `commands` (array).');
    }

    this.logger.error('🚫 Este plugin será ignorado.');
    this.logger.error('─'.repeat(50));
    
    this.failedPlugins.push({ name, file, error });
  }

  private async handlePluginChange(pluginName: string, pluginPath: string, fileName: string): Promise<void> {
    this.logger.info(`🔄 Recargando plugin: ${pluginName}`);

    // Remover comandos antiguos
    const commandsToRemove: string[] = [];
    for (const [key, cmd] of this.commands.entries()) {
      if (cmd.pluginName === pluginName) {
        commandsToRemove.push(key);
      }
    }
    commandsToRemove.forEach(key => this.commands.delete(key));
    this.logger.debug(`🗑️ Comandos antiguos de '${pluginName}' eliminados.`);

    // Limpiar watchers y estado
    FileWatcher.unwatchFile(pluginPath);
    
    const oldPlugin = this.loadedPlugins.get(pluginName);
    if (oldPlugin?.destroy) {
      await oldPlugin.destroy();
    }
    
    this.loadedPlugins.delete(pluginName);
    this.failedPlugins.splice(
      this.failedPlugins.findIndex(p => p.name === pluginName), 1
    );

    // Recargar plugin
    await this.loadSinglePlugin(pluginName, fileName);
    this.logger.info(`✅ Plugin '${pluginName}' recargado exitosamente.`);
    this.printLoadingSummary();
  }

  public printLoadingSummary(): void {
    this.logger.info('═'.repeat(40));
    this.logger.info('        📊 RESUMEN DE PLUGINS');
    this.logger.info('═'.repeat(40));
    this.logger.info(`✅ Plugins cargados: ${this.loadedPlugins.size}`);
    
    this.loadedPlugins.forEach(plugin => {
      this.logger.info(`  🔌 ${plugin.name} (${plugin.commands.length} comandos)`);
    });

    this.logger.info(`❌ Plugins fallidos: ${this.failedPlugins.length}`);
    this.failedPlugins.forEach(p => {
      this.logger.error(`  💥 ${p.name}: ${p.error.message}`);
    });

    this.logger.info(`🎯 Total comandos: ${this.commands.size}`);
    this.logger.info('═'.repeat(40));
  }

  public stop(): void {
    FileWatcher.unwatchAll();
    this.logger.info('🛑 PluginLoader: Observación de archivos detenida.');
  }

  public getCommand(commandName: string): PluginCommand | undefined {
    return this.commands.get(commandName.toLowerCase());
  }

  public getAllCommands(): Map<string, PluginCommand> {
    const mainCommands = new Map<string, PluginCommand>();
    
    for (const [key, cmd] of this.commands.entries()) {
      // Solo comandos principales (no aliases)
      if (cmd.name.toLowerCase() === key) {
        mainCommands.set(key, cmd);
      }
    }
    
    return mainCommands;
  }

  public getPluginInstance(pluginName: string): PluginInstance | undefined {
    return this.loadedPlugins.get(pluginName);
  }

  public getCommandsByCategory(category: string): PluginCommand[] {
    const commands: PluginCommand[] = [];
    
    for (const cmd of this.commands.values()) {
      if (cmd.category === category && cmd.name.toLowerCase() === cmd.name.toLowerCase()) {
        commands.push(cmd);
      }
    }
    
    return commands;
  }

  public getPluginStats(): {
    totalPlugins: number;
    loadedPlugins: number;
    failedPlugins: number;
    totalCommands: number;
    categories: Record<string, number>;
  } {
    const categories: Record<string, number> = {};
    
    for (const cmd of this.commands.values()) {
      if (cmd.category) {
        categories[cmd.category] = (categories[cmd.category] || 0) + 1;
      }
    }

    return {
      totalPlugins: this.loadedPlugins.size + this.failedPlugins.length,
      loadedPlugins: this.loadedPlugins.size,
      failedPlugins: this.failedPlugins.length,
      totalCommands: this.commands.size,
      categories
    };
  }
}

export default PluginLoader;
