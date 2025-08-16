// src/core/QueryBus.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import { CommandExecutionError } from './ErrorHandler.js'; // Reutilizamos CommandExecutionError por simplicidad, idealmente sería QueryExecutionError
/**
 * Clase base para todas las consultas.
 * Las consultas son objetos que representan una petición de datos.
 */
export export class Query {
    constructor() {
        this.name = this.constructor.name; // El nombre de la consulta es el nombre de la clase
    }
}
/**
 * El QueryBus es responsable de despachar consultas a sus manejadores.
 * Desacopla el emisor de la consulta de su ejecución.
 */
export class QueryBus {
    #handlers = new Map();
    #logger;
    #errorHandler;
    #container; // Para resolver manejadores con sus dependencias
    constructor(logger, errorHandler, container) {
        this.#logger = logger;
        this.#errorHandler = errorHandler;
        this.#container = container;
        this.#logger.info('QueryBus inicializado.');
    }
    /**
     * Registra un manejador para un tipo de consulta específico.
     * @param {Function} QueryClass - La clase de la consulta (ej. GetUserQuery).
     * @param {Function} HandlerClass - La clase del manejador para esa consulta.
     */
    register(QueryClass, HandlerClass) {
        const queryName = QueryClass.name;
        if (this.#handlers.has(queryName)) {
            this.#logger.warn(`Manejador para la consulta '${queryName}' ya registrado. Sobrescribiendo.`);
        }
        this.#handlers.set(queryName, HandlerClass);
        this.#logger.debug(`Manejador '${HandlerClass.name}' registrado para la consulta '${queryName}'.`);
    }
    /**
     * Despacha una consulta al manejador registrado.
     * @param {Query} query - La instancia de la consulta a despachar.
     * @returns {Promise<any>} El resultado de la ejecución de la consulta.
     * @throws {CommandExecutionError} Si no se encuentra un manejador o si la ejecución falla.
     */
    async dispatch(query) {
        const queryName = query.name;
        const HandlerClass = this.#handlers.get(queryName);
        if (!HandlerClass) {
            const error = new CommandExecutionError(`No se encontró manejador para la consulta: ${queryName}`);
            this.#errorHandler.handleError(error, { query });
            throw error;
        }
        try {
            // Resolver el manejador a través del contenedor para inyectar sus dependencias
            const handlerInstance = this.#container.resolve(HandlerClass); // Asume que el contenedor puede resolver clases
            if (typeof handlerInstance.handle !== 'function') {
                const error = new CommandExecutionError(`El manejador para ${queryName} no tiene un método 'handle'.`);
                this.#errorHandler.handleError(error, { query, handler: HandlerClass.name });
                throw error;
            }
            this.#logger.debug(`Despachando consulta '${queryName}' a manejador '${HandlerClass.name}'.`);
            const result = await handlerInstance.handle(query); // Ejecutar el método handle del manejador
            return result;
        }
        catch (error) {
            // Si ya es un CommandExecutionError, lo relanzamos. Si no, lo envolvemos.
            if (error instanceof CommandExecutionError) {
                throw error;
            }
            const wrappedError = new CommandExecutionError(`Error al ejecutar la consulta ${queryName}.`, error);
            this.#errorHandler.handleError(wrappedError, { query, originalError: error });
            throw wrappedError;
        }
    }
}
export default QueryBus;
//# sourceMappingURL=QueryBus.js.map