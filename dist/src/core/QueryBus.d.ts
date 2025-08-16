/**
 * Clase base para todas las consultas.
 * Las consultas son objetos que representan una petición de datos.
 */
export declare class Query {
    constructor();
}
/**
 * El QueryBus es responsable de despachar consultas a sus manejadores.
 * Desacopla el emisor de la consulta de su ejecución.
 */
export declare class QueryBus {
    #private;
    constructor(logger: any, errorHandler: any, container: any);
    /**
     * Registra un manejador para un tipo de consulta específico.
     * @param {Function} QueryClass - La clase de la consulta (ej. GetUserQuery).
     * @param {Function} HandlerClass - La clase del manejador para esa consulta.
     */
    register(QueryClass: any, HandlerClass: any): void;
    /**
     * Despacha una consulta al manejador registrado.
     * @param {Query} query - La instancia de la consulta a despachar.
     * @returns {Promise<any>} El resultado de la ejecución de la consulta.
     * @throws {CommandExecutionError} Si no se encuentra un manejador o si la ejecución falla.
     */
    dispatch(query: any): Promise<any>;
}
export default QueryBus;
//# sourceMappingURL=QueryBus.d.ts.map