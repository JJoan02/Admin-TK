import path from 'path';
import fs from 'fs/promises';
import baileys from '@whiskeysockets/baileys';
const { useMultiFileAuthState } = baileys;
const SESSIONS_DIR = path.resolve(process.cwd(), 'sessions');
export class SessionManager {
    #logger;
    constructor(logger) {
        this.#logger = logger;
    }
    async #ensureSessionsDir() {
        try {
            await fs.mkdir(SESSIONS_DIR, { recursive: true });
        }
        catch (error) {
            this.#logger.error({ err: error }, 'Error al crear el directorio de sesiones.');
            throw error;
        }
    }
    // Función de utilidad para validar el ID de sesión
    #validateSessionId(sessionId) {
        if (!sessionId) {
            throw new Error('Se requiere un ID de sesión.');
        }
        // Prevenir path traversal: asegurar que el sessionId no contenga '..' o separadores de ruta
        if (sessionId.includes('..') || sessionId.includes(path.sep)) {
            throw new Error('ID de sesión inválido: No se permiten caracteres especiales o rutas.');
        }
        return sessionId;
    }
    async listSessions() {
        await this.#ensureSessionsDir();
        const files = await fs.readdir(SESSIONS_DIR);
        // Filtra solo los directorios, que representan sesiones
        const sessions = [];
        for (const file of files) {
            const stat = await fs.stat(path.join(SESSIONS_DIR, file));
            if (stat.isDirectory()) {
                sessions.push(file);
            }
        }
        return sessions;
    }
    async loadAuth(sessionId) {
        const validatedSessionId = this.#validateSessionId(sessionId);
        const sessionPath = path.join(SESSIONS_DIR, validatedSessionId);
        await fs.mkdir(sessionPath, { recursive: true });
        this.#logger.info(`Cargando sesión desde: ${sessionPath}`);
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
        return { state, saveCreds };
    }
    async deleteSession(sessionId) {
        const validatedSessionId = this.#validateSessionId(sessionId);
        const sessionPath = path.join(SESSIONS_DIR, validatedSessionId);
        this.#logger.warn(`Eliminando directorio de sesión: ${sessionPath}`);
        await fs.rm(sessionPath, { recursive: true, force: true });
        this.#logger.info(`Sesión '${validatedSessionId}' eliminada exitosamente.`);
    }
}
export default SessionManager;
//# sourceMappingURL=SessionManager.js.map