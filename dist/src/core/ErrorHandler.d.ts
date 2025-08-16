/**
 * Clase base para errores personalizados.
 */
declare class AppError extends Error {
    constructor(message: any, type?: string, originalError?: null);
}
/**
 * Errores relacionados con la base de datos.
 */
export declare class DatabaseError extends AppError {
    constructor(message: any, originalError?: null);
}
/**
 * Errores relacionados con APIs externas.
 */
export declare class ApiError extends AppError {
    constructor(message: any, originalError?: null);
}
/**
 * Errores relacionados con la ejecución de comandos.
 */
export declare class CommandExecutionError extends AppError {
    constructor(message: any, originalError?: null);
}
/**
 * Servicio centralizado para el manejo y reporte de errores.
 */
export declare class ErrorHandler {
    #private;
    constructor(logger: any, correlation: any, notificationService: any);
    /**
     * Maneja un error, lo registra y potencialmente lo notifica.
     * @param {Error} error - El objeto de error.
     * @param {object} [context={}] - Contexto adicional del error.
     */
    handleError(error: any, context?: {}): void;
    /**
     * Notifica al propietario sobre un error crítico.
     * Este método es llamado por los manejadores de eventos globales (uncaughtException, unhandledRejection).
     * @param {Error} error - El error crítico.
     * @param {object} context - Contexto adicional.
     */
    notifyOwnerOfCriticalError(error: any, context: any): void;
}
export default ErrorHandler;
//# sourceMappingURL=ErrorHandler.d.ts.map