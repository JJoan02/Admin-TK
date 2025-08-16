// src/utils/fileWatcher.js
import { watch } from 'fs';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();
export class FileWatcher {
    /**
     * Almacena los watchers activos.
     * @type {Map<string, import('fs').FSWatcher>}
     */
    static #watchers = new Map();
    /**
     * Monitorea un archivo o directorio en busca de cambios.
     * @param {string} path - La ruta del archivo o directorio a monitorear.
     * @param {function(eventType: string, filename: string): void} callback - La función a llamar cuando se detecta un cambio.
     * @param {object} [options={}] - Opciones para fs.watch (ej. { recursive: true }).
     */
    static watchFile(path, callback, options = {}) {
        if (FileWatcher.#watchers.has(path)) {
            logger.warn(`Ya se está monitoreando la ruta: ${path}.`);
            return;
        }
        logger.debug(`Iniciando monitoreo de cambios en: ${path}`);
        const watcher = watch(path, options, (eventType, filename) => {
            logger.debug(`Cambio detectado en ${path}: ${eventType} - ${filename}`);
            callback(eventType, filename);
        });
        watcher.on('error', (error) => {
            logger.error({ err: error, path }, `Error en el monitoreo de archivos para: ${path}`);
            FileWatcher.unwatchFile(path); // Detener el monitoreo en caso de error
        });
        FileWatcher.#watchers.set(path, watcher);
    }
    /**
     * Detiene el monitoreo de un archivo o directorio.
     * @param {string} path - La ruta que se estaba monitoreando.
     */
    static unwatchFile(path) {
        const watcher = FileWatcher.#watchers.get(path);
        if (watcher) {
            watcher.close();
            FileWatcher.#watchers.delete(path);
            logger.debug(`Monitoreo detenido para: ${path}`);
        }
    }
    /**
     * Detiene todos los monitores de archivos activos.
     */
    static unwatchAll() {
        logger.info('Deteniendo todos los monitores de archivos activos.');
        for (const [path, watcher] of FileWatcher.#watchers.entries()) {
            watcher.close();
            logger.debug(`Monitoreo detenido para: ${path}`);
        }
        FileWatcher.#watchers.clear();
    }
}
export default FileWatcher;
//# sourceMappingURL=fileWatcher.js.map