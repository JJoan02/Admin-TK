// src/services/ChaosService.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

class ChaosService {
  /**
   * @param {import('../core/ConnectionManager.js').default} connectionManager
   * @param {import('../core/SessionManager.js').default} sessionManager
   */
  constructor(connectionManager, sessionManager) {
    this.connectionManager = connectionManager;
    this.sessionManager = sessionManager;
    logger.info('ChaosService listo para sembrar el caos controlado. 💥');
  }

  /**
   * Simula una desconexión forzada del bot.
   * Dispara el evento 'connection.update' con 'close' para que ConnectionManager intente reconectar.
   */
  simulateDisconnect() {
    if (this.connectionManager && this.connectionManager.sock) {
      logger.warn('💥 CHAOS: Simulando desconexión forzada...');
      this.connectionManager.sock.ev.emit('connection.update', {
        connection: 'close',
        lastDisconnect: {
          error: new Error('Chaos Test: Simulación de desconexión.'),
          date: new Date(),
        },
      });
    } else {
      logger.error('ChaosService no pudo simular la desconexión: ConnectionManager o el socket no están disponibles.');
    }
  }

  /**
   * Simula un error de autenticación crítico.
   * Esto se haría normalmente corrompiendo el archivo de sesión o forzando un error en `loadAuth`.
   * Por ahora, lanzará una excepción para que el proceso principal la capture.
   */
  simulateAuthError() {
    logger.warn('💥 CHAOS: Simulando un error fatal de autenticación...');
    // En una implementación real, podrías querer eliminar o corromper `creds.json`
    // y luego intentar reconectar. Por ahora, lanzamos un error para que lo capture el handler de `start.js`.
    throw new Error('Chaos Test: Simulación de error de autenticación irrecuperable.');
  }
}

export default ChaosService;
