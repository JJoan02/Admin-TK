// src/utils/sessionCleanup.js
import fs from 'fs/promises';
import path from 'path';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();
import DataUtils from './dataUtils.js'; // Para usar DataUtils.deletePath
// Configuración: Antigüedad máxima de una sesión inactiva para ser eliminada (en días)
const MAX_INACTIVITY_DAYS = 30;
const SESSIONS_DIR = path.resolve(process.cwd(), 'sessions');
/**
 * Limpia las sesiones de WhatsApp inactivas o antiguas.
 * Una sesión se considera inactiva si su archivo 'creds.json'
 * no ha sido modificado en MAX_INACTIVITY_DAYS.
 * La sesión activa del bot no será eliminada.
 * @param {string} currentSessionId - El ID de la sesión activa del bot.
 */
export const cleanInactiveSessions = async (currentSessionId) => {
    logger.info('🧹 Iniciando limpieza de sesiones inactivas...');
    try {
        const sessionDirs = await fs.readdir(SESSIONS_DIR, { withFileTypes: true });
        const now = Date.now();
        const cutoffTime = now - (MAX_INACTIVITY_DAYS * 24 * 60 * 60 * 1000); // Convertir días a milisegundos
        for (const dirent of sessionDirs) {
            if (dirent.isDirectory()) {
                const sessionId = dirent.name;
                const sessionPath = path.join(SESSIONS_DIR, sessionId);
                const credsFilePath = path.join(sessionPath, 'creds.json');
                // No eliminar la sesión activa del bot
                if (sessionId === currentSessionId) {
                    logger.debug(`ℹ️ Sesión activa '${sessionId}' omitida de la limpieza.`);
                    continue;
                }
                try {
                    const stats = await fs.stat(credsFilePath);
                    // Si el archivo creds.json es más antiguo que el tiempo de corte
                    if (stats.mtimeMs < cutoffTime) {
                        logger.warn(`🗑️ Eliminando sesión inactiva: ${sessionId} (última actividad: ${new Date(stats.mtimeMs).toLocaleDateString()}).`);
                        await DataUtils.deletePath(sessionPath);
                    }
                    else {
                        logger.debug(`✅ Sesión '${sessionId}' está activa o es reciente. Omitida.`);
                    }
                }
                catch (error) {
                    if (error.code === 'ENOENT') {
                        // Si creds.json no existe, la carpeta de sesión está incompleta o corrupta, eliminarla.
                        logger.warn(`🗑️ Sesión incompleta o corrupta detectada: ${sessionId}. Eliminando.`);
                        await DataUtils.deletePath(sessionPath);
                    }
                    else {
                        logger.error({ err: error, sessionId }, `❌ Error al procesar sesión '${sessionId}' para limpieza.`);
                    }
                }
            }
        }
        logger.info('✅ Limpieza de sesiones inactivas completada.');
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            logger.warn(`⚠️ Directorio de sesiones no encontrado: ${SESSIONS_DIR}. No se realizó la limpieza.`);
        }
        else {
            logger.error({ err: error }, '❌ Error general durante la limpieza de sesiones.');
        }
    }
};
//# sourceMappingURL=sessionCleanup.js.map