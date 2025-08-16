export declare class BackupService {
    #private;
    constructor(config: any, logger: any, dbService: any);
    /**
     * Muestra un menú interactivo y estilizado para gestionar backups.
     */
    showBackupMenu(): Promise<void>;
    /**
     * Autoriza al cliente para usar la API de Google Drive.
     * Carga el token guardado o inicia el proceso de vinculación si no existe.
     */
    authorize(): Promise<void>;
    /**
     * Inicia el proceso para obtener un nuevo token de acceso.
     * @param {import('google-auth-library').OAuth2Client} oAuth2Client
     */
    getAccessToken(oAuth2Client: any): Promise<void>;
    /**
     * Fuerza el proceso de vinculación o re-vinculación.
     */
    linkGoogleDrive(): Promise<void>;
    /**
     * Crea un backup local de la base de datos.
     * @returns {Promise<string>} La ruta al archivo de backup creado.
     */
    createLocalBackup(): Promise<any>;
    /**
     * Sube un backup a Google Drive.
     * @param {string} filePath - La ruta al archivo de backup a subir.
     */
    uploadBackup(filePath: any): Promise<void>;
}
export default BackupService;
//# sourceMappingURL=BackupService.d.ts.map