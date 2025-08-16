// src/commands/ToggleBotCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para activar o desactivar el bot en un grupo.
 */
export class ToggleBotCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
