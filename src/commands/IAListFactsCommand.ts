// src/commands/IAListFactsCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para listar los hechos que la IA ha aprendido sobre un chat.
 */
export class IAListFactsCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
