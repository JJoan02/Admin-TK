// src/commands/ListFeatureFlagsCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para listar todos los feature flags y su estado.
 */
export class ListFeatureFlagsCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
