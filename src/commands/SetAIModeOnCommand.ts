// src/commands/SetAIModeOnCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para activar el modo IA en un chat/grupo.
 */
export class SetAIModeOnCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
