export declare class ChaosService {
    /**
     * @param {import('../core/ConnectionManager.js').default} connectionManager
     * @param {import('../core/SessionManager.js').default} sessionManager
     */
    constructor(connectionManager: any, sessionManager: any);
    /**
     * Simula una desconexión forzada del bot.
     * Dispara el evento 'connection.update' con 'close' para que ConnectionManager intente reconectar.
     */
    simulateDisconnect(): void;
    /**
     * Simula un error de autenticación crítico.
     * Esto se haría normalmente corrompiendo el archivo de sesión o forzando un error en `loadAuth`.
     * Por ahora, lanzará una excepción para que el proceso principal la capture.
     */
    simulateAuthError(): void;
}
export default ChaosService;
//# sourceMappingURL=ChaosService.d.ts.map