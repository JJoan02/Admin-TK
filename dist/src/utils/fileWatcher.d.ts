export declare class FileWatcher {
    #private;
    /**
     * Monitorea un archivo o directorio en busca de cambios.
     * @param {string} path - La ruta del archivo o directorio a monitorear.
     * @param {function(eventType: string, filename: string): void} callback - La función a llamar cuando se detecta un cambio.
     * @param {object} [options={}] - Opciones para fs.watch (ej. { recursive: true }).
     */
    static watchFile(path: any, callback: any, options?: {}): void;
    /**
     * Detiene el monitoreo de un archivo o directorio.
     * @param {string} path - La ruta que se estaba monitoreando.
     */
    static unwatchFile(path: any): void;
    /**
     * Detiene todos los monitores de archivos activos.
     */
    static unwatchAll(): void;
}
export default FileWatcher;
//# sourceMappingURL=fileWatcher.d.ts.map