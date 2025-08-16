export declare class DataUtils {
    /**
     * Normaliza un JID (Jabber ID) para asegurar un formato consistente.
     * Elimina el sufijo de servidor si no es necesario y asegura el formato @s.whatsapp.net.
     * @param {string} jid - El JID a normalizar.
     * @returns {string | null} El JID normalizado o null si la entrada es inválida.
     */
    static normalizeJid(jid: any): string | null;
    /**
     * Extrae el número de teléfono de un JID.
     * @param {string} jid - El JID del que extraer el número.
     * @returns {string | null} El número de teléfono o null si el JID es inválido.
     */
    static getPhoneNumberFromJid(jid: any): string | null;
    /**
     * Valida y formatea un número de teléfono, añadiendo el prefijo '+' si falta.
     * @param {string} phoneNumber - El número de teléfono a validar y formatear.
     * @returns {string | null} El número formateado (ej. '+51912345678') o null si es inválido.
     */
    static validateAndFormatPhoneNumber(phoneNumber: any): string | null;
    /**
     * Elimina un archivo o directorio de forma recursiva.
     * @param {string} targetPath - La ruta al archivo o directorio a eliminar.
     * @returns {Promise<boolean>} True si la eliminación fue exitosa, false en caso contrario.
     */
    static deletePath(targetPath: any): Promise<boolean>;
    /**
     * Limpia archivos temporales generados por el bot.
     * @param {string} directory - El directorio a limpiar. Por defecto, './tmp'.
     * @param {number} maxAgeInHours - La edad máxima de los archivos en horas antes de ser eliminados. Por defecto, 24 horas.
     */
    static cleanTempFiles(directory?: string, maxAgeInHours?: number): Promise<void>;
    /**
     * Intenta liberar memoria forzando la recolección de basura.
     * @returns {object} Un objeto con el uso de memoria antes y después de la recolección.
     */
    static forceGarbageCollection(): {
        memoryBefore: any;
        memoryAfter: any;
    } | null;
}
export default DataUtils;
//# sourceMappingURL=dataUtils.d.ts.map