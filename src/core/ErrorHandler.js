// src/core/ErrorHandler.js

// import NotificationService from '../services/NotificationService.js'; // Ya no se importa directamente

/**
 * Clase base para errores personalizados.
 */
class AppError extends Error {
  constructor(message, type = 'AppError', originalError = null) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.originalError = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Errores relacionados con la base de datos.
 */
export class DatabaseError extends AppError {
  constructor(message, originalError = null) {
    super(message, 'DatabaseError', originalError);
  }
}

/**
 * Errores relacionados con APIs externas.
 */
export class ApiError extends AppError {
  constructor(message, originalError = null) {
    super(message, 'ApiError', originalError);
  }
}

/**
 * Errores relacionados con la ejecución de comandos.
 */
export class CommandExecutionError extends AppError {
  constructor(message, originalError = null) {
    super(message, 'CommandExecutionError', originalError);
  }
}

/**
 * Servicio centralizado para el manejo y reporte de errores.
 */
class ErrorHandler {
  #logger;
  #correlation;
  #notificationService; // Inyectado

  constructor(logger, correlation, notificationService) {
    this.#logger = logger;
    this.#correlation = correlation;
    this.#notificationService = notificationService;
    this.#logger.debug('ErrorHandler inicializado.');
  }

  // Los métodos handleUncaughtException y handleUnhandledRejection se moverán a app.js
  // para ser suscritos después de la inicialización completa del contenedor.

  /**
   * Maneja un error, lo registra y potencialmente lo notifica.
   * @param {Error} error - El objeto de error.
   * @param {object} [context={}] - Contexto adicional del error.
   */
  handleError(error, context = {}) {
    const errorType = error.type || error.name || 'UnknownError';
    this.#logger.error({ error, context, stack: error.stack }, `[${errorType}] Error manejado: ${error.message}`);

    // Notificar al propietario si es un error crítico o inesperado
    if (!(error instanceof AppError) || error.type === 'DatabaseError' || error.type === 'ApiError') {
      this.#notificationService.notifyOwner(error, context); // Usar la instancia inyectada
    }
  }

  /**
   * Notifica al propietario sobre un error crítico.
   * Este método es llamado por los manejadores de eventos globales (uncaughtException, unhandledRejection).
   * @param {Error} error - El error crítico.
   * @param {object} context - Contexto adicional.
   */
  notifyOwnerOfCriticalError(error, context) {
    // La lógica de formateo del mensaje se mantiene en NotificationService.notifyOwner
    this.#notificationService.notifyOwner(error, context);
  }
}

export default ErrorHandler; // Exportar la clase, no la instancia