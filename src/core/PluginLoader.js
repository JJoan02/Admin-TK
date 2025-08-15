// src/core/PluginLoader.js

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { readdir } from 'fs/promises';
import FileWatcher from '../utils/fileWatcher.js';
import { ApiError } from './ErrorHandler.js'; // Importar ApiError

class PluginLoader {
  commands = new Map();
  loadedPlugins = new Map();
  failedPlugins = [];
  #pluginFilePaths = new Map();

  #config;
  #logger;
  #errorHandler;
  #container; // Referencia al DependencyContainer

  /**
   * @param {object} config - Objeto de configuración.
   * @param {object} logger - Instancia del logger.
   * @param {object} errorHandler - Instancia del manejador de errores.
   * @param {object} container - Instancia del DependencyContainer.
   */
  constructor(config, logger, errorHandler, container) {
    this.#config = config;
    this.#logger = logger;
    this.#errorHandler = errorHandler;
    this.#container = container; // Guardar referencia al contenedor
  }

  async loadPlugins() {
    this.#logger.info(' Iniciando la carga dinámica de plugins...');

    if (this.#config.pluginConfig.loadPlugins !== true) { // Asegurar que sea explícitamente true
      this.#logger.warn('⚠️ La carga de plugins está desactivada en la configuración. Saltando...');
      return;
    }

    const pluginsDirPath = process.env.PLUGINS_DIR || path.resolve(process.cwd(), 'src', 'plugins');
    this.#logger.debug(` Ruta de plugins: ${pluginsDirPath}`);
    let pluginFiles = [];

    try {
      pluginFiles = await readdir(pluginsDirPath);
      pluginFiles = pluginFiles.filter(file => file.endsWith('.js') && file !== 'base-plugin.js');
      this.#logger.debug(` Archivos de plugins encontrados (filtrados): ${pluginFiles.join(', ')}`);
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'PluginLoader.loadPlugins - readdir', pluginsDirPath });
      this.#logger.error(' Sugerencia: Asegúrate de que la carpeta "src/plugins" exista y sea accesible.');
      return;
    }

    if (pluginFiles.length === 0) {
      this.#logger.info(' No se encontraron archivos de plugins en la carpeta "src/plugins".');
      return;
    }

    this.#logger.info(`✨ Se encontraron ${pluginFiles.length} archivos de plugins habilitados para cargar.`);

    this.commands.clear();
    this.failedPlugins = [];
    this.loadedPlugins.clear(); // Limpiar también los plugins cargados
    this.#pluginFilePaths.clear();
    FileWatcher.unwatchAll();

    for (const file of pluginFiles) {
      const pluginName = file.replace('.js', '');
      this.#logger.debug(` Intentando cargar plugin: ${pluginName} desde archivo: ${file}`);
      await this.#loadSinglePlugin(pluginName, file);
    }

    this.printLoadingSummary();
  }

  async #loadSinglePlugin(name, file) {
    const pluginPath = path.resolve(process.cwd(), 'src', 'plugins', file);
    const moduleUrl = pathToFileURL(pluginPath).href;

    try {
      const uniqueModuleUrl = `${moduleUrl}?update=${Date.now()}`;
      this.#logger.debug(` Importando módulo desde: ${uniqueModuleUrl}`);

      const module = await import(uniqueModuleUrl);
      const PluginClass = module.default;

      // Validar que PluginClass sea una función constructora (una clase)
      if (typeof PluginClass !== 'function' || !/^\s*class\s/.test(PluginClass.toString())) {
        throw new Error('El archivo del plugin no exporta una clase por defecto válida.');
      }

      // Pasar las dependencias al constructor del plugin a través del contenedor
      // El constructor del plugin debe declarar sus dependencias como parámetros
      let pluginInstance = this.#container.resolve(PluginClass); // Resolver la clase del plugin

      // Validar la estructura básica de la instancia del plugin
      if (!pluginInstance.name || typeof pluginInstance.name !== 'string' || pluginInstance.name.trim() === '') {
        throw new Error('La instancia del plugin debe tener una propiedad "name" (string no vacío).');
      }
      if (!Array.isArray(pluginInstance.commands)) {
        throw new Error('La instancia del plugin debe tener una propiedad "commands" (array).');
      }

      this.#pluginFilePaths.set(pluginInstance.name, pluginPath);

      const commandBus = this.#container.resolve('commandBus');

      for (const command of pluginInstance.commands) {
        const commandKey = command.name.toLowerCase();
        if (this.commands.has(commandKey)) {
          this.#logger.warn(`⚠️ Conflicto de comandos: El comando '${command.name}' del plugin '${name}' ya existe y será sobreescrito.`);
        }
        this.commands.set(commandKey, { ...command, pluginName: pluginInstance.name });
        this.#logger.debug(`➕ Comando registrado: ${commandKey}`);

        // Si el plugin usa la nueva estructura de Command Bus, registrar el manejador
        if (command.command && command.handler) {
          const CommandClass = command.command;
          const HandlerClass = command.handler;
          const handlerName = HandlerClass.name.charAt(0).toLowerCase() + HandlerClass.name.slice(1);

          // Registrar el manejador en el contenedor si aún no está
          if (!this.#container.isRegistered(handlerName)) {
            this.#container.register(handlerName, HandlerClass, { isSingleton: false }); // Los manejadores suelen ser transitorios
          }
          
          // Registrar en el CommandBus
          commandBus.register(CommandClass, HandlerClass);
          this.#logger.info(`✅ Manejador '${HandlerClass.name}' para el comando '${CommandClass.name}' registrado en el CommandBus.`);
        }

        if (command.alias && Array.isArray(command.alias)) {
          for (const alias of command.alias) {
            const aliasKey = alias.toLowerCase();
            if (this.commands.has(aliasKey)) {
              this.#logger.warn(`⚠️ Conflicto de alias: El alias '${alias}' del plugin '${name}' ya existe y será sobreescrito.`);
            }
            this.commands.set(aliasKey, { ...command, pluginName: pluginInstance.name });
            this.#logger.debug(`➡️ Alias registrado: ${aliasKey} para comando: ${commandKey}`);
          }
        }
      }

      const commandNames = pluginInstance.commands.map(c => c.name).join(', ');
      this.#logger.info(`✅ Plugin '${pluginInstance.name}' cargado. Comandos: [${commandNames}]`);
      this.loadedPlugins.set(pluginInstance.name, pluginInstance);

      FileWatcher.watchFile(pluginPath, (eventType, filename) => {
        this.#logger.info(` Cambio detectado en el plugin '${pluginInstance.name}' (${filename}).`);
        this.#handlePluginChange(pluginInstance.name, pluginPath, file);
      });

    } catch (error) {
      this.#errorHandler.handleError(error, { context: `PluginLoader.#loadSinglePlugin - ${name}` });
      this.#logger.error('-------------------------------------------------');
      this.#logger.error(`❌ Error al cargar el plugin '${name}' desde '${file}':`);
      this.#logger.error(`Mensaje: ${error.message}`);

      if (error.message.includes('Unexpected token \'class\'') ||
          error.message.includes('Cannot use import statement outside a module')) {
        this.#logger.error(' Sugerencia: Este error a menudo indica que el archivo del plugin no está siendo tratado como un módulo ES.');
        this.#logger.error(' Sugerencia: Asegúrate de que tu `package.json` tenga "type": "module" en el nivel superior.');
        this.#logger.error(' Sugerencia: O, si es un archivo CommonJS, asegúrate de que no use `import`/`export` o `class` directamente sin transpilar.');
      } else if (error.message.includes('not export a default')) {
        this.#logger.error(' Sugerencia: Asegúrate de que el plugin exporte su clase principal usando `export default MiClase;`.');
      } else if (error.message.includes('structure required')) {
        this.#logger.error(' Sugerencia: El plugin debe tener propiedades `name` (string) y `commands` (array).');
      }

      this.#logger.error('Este plugin será ignorado.');
      this.#logger.error('-------------------------------------------------');
      this.failedPlugins.push({ name, file, error });
    }
  }

  async #handlePluginChange(pluginName, pluginPath, fileName) {
    this.#logger.info(` Intentando recargar plugin: ${pluginName}`);

    const commandsToRemove = [];
    for (const [key, cmd] of this.commands.entries()) {
      if (cmd.pluginName === pluginName) {
        commandsToRemove.push(key);
      }
    }
    commandsToRemove.forEach(key => this.commands.delete(key));
    this.#logger.debug(`️ Comandos antiguos de '${pluginName}' eliminados.`);

    FileWatcher.unwatchFile(pluginPath);

    this.loadedPlugins.delete(pluginName);
    this.failedPlugins = this.failedPlugins.filter(p => p.name !== pluginName);

    await this.#loadSinglePlugin(pluginName, fileName);

    this.#logger.info(`✅ Plugin '${pluginName}' recargado exitosamente.`);
    this.printLoadingSummary();
  }

  printLoadingSummary() {
    this.#logger.info('========================================');
    this.#logger.info('        RESUMEN DE CARGA DE PLUGINS');
    this.#logger.info('========================================');
    this.#logger.info(`✅ Plugins cargados exitosamente: ${this.loadedPlugins.size}`); // Usar .size para Map
    this.loadedPlugins.forEach(plugin => this.#logger.info(`  - ${plugin.name}`)); // Iterar sobre los valores del Map

    this.#logger.info(`❌ Plugins que fallaron al cargar: ${this.failedPlugins.length}`);
    this.failedPlugins.forEach(p => this.#logger.error(`  - ${p.name} (${p.file}): ${p.error.message}`));

    this.#logger.info(` Total de comandos cargados: ${this.commands.size}. Comandos: ${Array.from(this.commands.keys()).join(', ')}`);
    this.#logger.info('========================================');
  }

  /**
   * Detiene la observación de cambios en los archivos de plugins.
   */
  stop() {
    FileWatcher.unwatchAll();
    this.#logger.info('PluginLoader: Observación de archivos de plugins detenida.');
  }

  /**
   * Obtiene un comando por su nombre o alias.
   * @param {string} commandName - El nombre o alias del comando.
   * @returns {object | undefined} El objeto del comando o undefined si no se encuentra.
   */
  getCommand(commandName) {
    return this.commands.get(commandName.toLowerCase());
  }

  /**
   * Devuelve todos los comandos cargados.
   * @returns {Map<string, object>}
   */
  getAllCommands() {
    // CORREGIDO: Filtrar para devolver solo los comandos principales (no los alias)
    const mainCommands = new Map();
    for (const [key, cmd] of this.commands.entries()) {
      // Un comando es "principal" si su nombre (en minúsculas) coincide con la clave del mapa.
      // Esto evita que los alias se muestren como comandos separados en el menú.
      if (cmd.name.toLowerCase() === key) {
        mainCommands.set(key, cmd);
      }
    }
    return mainCommands;
  }

  /**
   * Obtiene la instancia de un plugin cargado por su nombre.
   * Útil para acceder a propiedades o métodos específicos de un plugin.
   * @param {string} pluginName - El nombre del plugin (ej. 'AI').
   * @returns {object | undefined} La instancia del plugin o undefined si no se encuentra.
   */
  getPluginInstance(pluginName) {
    return this.loadedPlugins.get(pluginName);
  }
}

export default PluginLoader;