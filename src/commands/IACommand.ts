// src/commands/IACommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para iniciar una conversación con la IA.
 */
export class IACommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
