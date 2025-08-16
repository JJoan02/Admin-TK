// src/commandHandlers/ListFeatureFlagsCommandHandler.js
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
export class ListFeatureFlagsCommandHandler {
    #featureFlagManager;
    constructor(featureFlagManager) {
        this.#featureFlagManager = featureFlagManager;
    }
    async handle(command) {
        const { context } = command;
        const { reply } = context;
        try {
            const allFlags = this.#featureFlagManager.getAllFlags();
            let responseText = '✨ *Estado de Feature Flags* ✨\n\n';
            if (allFlags.size === 0) {
                responseText += 'No hay feature flags configurados actualmente.';
            }
            else {
                for (const [name, isEnabled] of allFlags.entries()) {
                    responseText += `- *${name}*: ${isEnabled ? '✅ Habilitado' : '❌ Deshabilitado'}\n`;
                }
            }
            reply(responseText.trim());
        }
        catch (error) {
            logger.error({ err: error }, '❌ Error al listar los feature flags.');
            reply('❌ Ocurrió un error al intentar listar los feature flags.');
        }
    }
}
export default ListFeatureFlagsCommandHandler;
//# sourceMappingURL=ListFeatureFlagsCommandHandler.js.map