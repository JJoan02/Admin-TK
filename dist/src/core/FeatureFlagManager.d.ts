export declare class FeatureFlagManager {
    #private;
    constructor(dbService: any, logger: any);
    init(): Promise<void>;
    /**
     * Verifica si un feature flag está habilitado.
     * @param {string} flagName - El nombre del feature flag.
     * @returns {boolean} True si el flag está habilitado, false en caso contrario.
     */
    isEnabled(flagName: any): any;
    /**
     * Habilita o deshabilita un feature flag y lo persiste en la base de datos.
     * @param {string} flagName - El nombre del feature flag.
     * @param {boolean} enable - True para habilitar, false para deshabilitar.
     */
    setFlag(flagName: any, enable: any): Promise<void>;
    /**
     * Obtiene el estado de todos los feature flags.
     * @returns {Map<string, boolean>} Un mapa con el nombre del flag y su estado.
     */
    getAllFlags(): Map<any, any>;
}
export default FeatureFlagManager;
//# sourceMappingURL=FeatureFlagManager.d.ts.map