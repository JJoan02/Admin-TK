// src/commands/IASetPersonalityCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para configurar la personalidad de la IA para un chat.
 */
export class IASetPersonalityCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
