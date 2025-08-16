/**
 * Clase base para todos los comandos.
 * Los comandos son objetos que representan una intención o una acción a realizar.
 */
export declare class Command {
    constructor();
}
/**
 * El CommandBus es responsable de despachar comandos a sus manejadores.
 * Desacopla el emisor del comando de su ejecución.
 */
export declare class CommandBus {
    #private;
    constructor(logger: any, errorHandler: any, container: any);
    /**
     * Registra un manejador para un tipo de comando específico.
     * @param {Function} CommandClass - La clase del comando (ej. BanUserCommand).
     * @param {Function} HandlerClass - La clase del manejador para ese comando.
     */
    register(CommandClass: any, HandlerClass: any): void;
    /**
     * Despacha un comando al manejador registrado.
     * @param {Command} command - La instancia del comando a despachar.
     * @returns {Promise<any>} El resultado de la ejecución del comando.
     * @throws {CommandExecutionError} Si no se encuentra un manejador o si la ejecución falla.
     */
    dispatch(command: any): Promise<any>;
}
export default CommandBus;
//# sourceMappingURL=CommandBus.d.ts.map