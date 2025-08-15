// src/commands/IAResetPersonalityCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para resetear la personalidad de la IA en un chat.
 */
export class IAResetPersonalityCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
