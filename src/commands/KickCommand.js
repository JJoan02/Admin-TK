// src/commands/KickCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para expulsar a un miembro de un grupo.
 */
export class KickCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
