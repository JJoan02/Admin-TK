// src/core/FeatureFlagManager.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import { DatabaseError } from './ErrorHandler.js';
export class FeatureFlagManager {
    #dbService;
    #logger;
    #flags = new Map(); // Caché en memoria para los flags
    constructor(dbService, logger) {
        this.#dbService = dbService;
        this.#logger = logger;
        this.#logger.info('FeatureFlagManager inicializado.');
    }
    async init() {
        try {
            const db = this.#dbService.getDB();
            const flagsFromDb = await db.all('SELECT * FROM feature_flags');
            flagsFromDb.forEach(flag => {
                this.#flags.set(flag.name, flag.is_enabled === 1); // SQLite almacena BOOLEAN como INTEGER
            });
            this.#logger.info(`FeatureFlagManager: ${this.#flags.size} flags cargados desde la DB.`);
        }
        catch (error) {
            this.#logger.error({ err: error }, '❌ Error al cargar feature flags desde la base de datos.');
            throw new DatabaseError('Error al cargar feature flags.', error);
        }
    }
    /**
     * Verifica si un feature flag está habilitado.
     * @param {string} flagName - El nombre del feature flag.
     * @returns {boolean} True si el flag está habilitado, false en caso contrario.
     */
    isEnabled(flagName) {
        // Por defecto, si un flag no está en la DB, se considera deshabilitado.
        return this.#flags.get(flagName) || false;
    }
    /**
     * Habilita o deshabilita un feature flag y lo persiste en la base de datos.
     * @param {string} flagName - El nombre del feature flag.
     * @param {boolean} enable - True para habilitar, false para deshabilitar.
     */
    async setFlag(flagName, enable) {
        try {
            const db = this.#dbService.getDB();
            const isEnabledValue = enable ? 1 : 0;
            await db.run(`INSERT OR REPLACE INTO feature_flags (name, is_enabled) VALUES (?, ?)`, flagName, isEnabledValue);
            this.#flags.set(flagName, enable);
            this.#logger.info(`Feature flag '${flagName}' ${enable ? 'habilitado' : 'deshabilitado'}.`);
        }
        catch (error) {
            this.#logger.error({ err: error, flagName, enable }, '❌ Error al establecer feature flag en la base de datos.');
            throw new DatabaseError('Error al establecer feature flag.', error);
        }
    }
    /**
     * Obtiene el estado de todos los feature flags.
     * @returns {Map<string, boolean>} Un mapa con el nombre del flag y su estado.
     */
    getAllFlags() {
        return new Map(this.#flags);
    }
}
export default FeatureFlagManager;
//# sourceMappingURL=FeatureFlagManager.js.map