// src/commands/SetFeatureFlagCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para establecer el estado de un feature flag.
 */
export class SetFeatureFlagCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   * @param {string} flagName - El nombre del feature flag.
   * @param {boolean} enable - True para habilitar, false para deshabilitar.
   */
  constructor(context, flagName, enable) {
    super();
    this.context = context;
    this.flagName = flagName;
    this.enable = enable;
  }
}
