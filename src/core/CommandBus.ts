// src/core/CommandBus.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import { CommandExecutionError } from './ErrorHandler.js';

/**
 * Clase base para todos los comandos.
 * Los comandos son objetos que representan una intención o una acción a realizar.
 */
export export class Command {
  constructor() {
    this.name = this.constructor.name; // El nombre del comando es el nombre de la clase
  }
}

/**
 * El CommandBus es responsable de despachar comandos a sus manejadores.
 * Desacopla el emisor del comando de su ejecución.
 */
export class CommandBus {
  #handlers = new Map();
  #logger;
  #errorHandler;
  #container; // Para resolver manejadores con sus dependencias

  constructor(logger, errorHandler, container) {
    this.#logger = logger;
    this.#errorHandler = errorHandler;
    this.#container = container;
    this.#logger.debug('CommandBus inicializado.');
  }

  /**
   * Registra un manejador para un tipo de comando específico.
   * @param {Function} CommandClass - La clase del comando (ej. BanUserCommand).
   * @param {Function} HandlerClass - La clase del manejador para ese comando.
   */
  register(CommandClass, HandlerClass) {
    const commandName = CommandClass.name;
    if (this.#handlers.has(commandName)) {
      this.#logger.warn(`Manejador para el comando '${commandName}' ya registrado. Sobrescribiendo.`);
    }
    this.#handlers.set(commandName, HandlerClass);
    this.#logger.debug(`Manejador '${HandlerClass.name}' registrado para el comando '${commandName}'.`);
  }

  /**
   * Despacha un comando al manejador registrado.
   * @param {Command} command - La instancia del comando a despachar.
   * @returns {Promise<any>} El resultado de la ejecución del comando.
   * @throws {CommandExecutionError} Si no se encuentra un manejador o si la ejecución falla.
   */
  async dispatch(command) {
    const commandName = command.name;
    const HandlerClass = this.#handlers.get(commandName);

    if (!HandlerClass) {
      const error = new CommandExecutionError(`No se encontró manejador para el comando: ${commandName}`);
      this.#errorHandler.handleError(error, { command });
      throw error;
    }

    try {
      // Resolver el manejador a través del contenedor para inyectar sus dependencias
      const handlerInstance = this.#container.resolve(HandlerClass); // Asume que el contenedor puede resolver clases
      
      if (typeof handlerInstance.handle !== 'function') {
        const error = new CommandExecutionError(`El manejador para ${commandName} no tiene un método 'handle'.`);
        this.#errorHandler.handleError(error, { command, handler: HandlerClass.name });
        throw error;
      }

      this.#logger.debug(`Despachando comando '${commandName}' a manejador '${HandlerClass.name}'.`);
      const result = await handlerInstance.handle(command); // Ejecutar el método handle del manejador
      return result;
    } catch (error) {
      // Si ya es un CommandExecutionError, lo relanzamos. Si no, lo envolvemos.
      if (error instanceof CommandExecutionError) {
        throw error;
      }
      const wrappedError = new CommandExecutionError(`Error al ejecutar el comando ${commandName}.`, error);
      this.#errorHandler.handleError(wrappedError, { command, originalError: error });
      throw wrappedError;
    }
  }
}

export default CommandBus;
