// src/commands/AddCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para añadir a un miembro a un grupo.
 */
export class AddCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
