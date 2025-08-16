// src/commandHandlers/SetFeatureFlagCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

export class SetFeatureFlagCommandHandler {
  #featureFlagManager;

  constructor(featureFlagManager) {
    this.#featureFlagManager = featureFlagManager;
  }

  async handle(command) {
    const { context, flagName, enable } = command;
    const { reply } = context;

    try {
      await this.#featureFlagManager.setFlag(flagName, enable);
      reply(`✅ Feature flag '${flagName}' ${enable ? 'habilitado' : 'deshabilitado'} correctamente.`);
    } catch (error) {
      logger.error({ err: error, flagName, enable }, '❌ Error al establecer el feature flag.');
      reply('❌ Ocurrió un error al intentar establecer el feature flag.');
    }
  }
}

export default SetFeatureFlagCommandHandler;
