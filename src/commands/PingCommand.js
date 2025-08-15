// src/commands/PingCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para ejecutar la lógica de ping.
 */
export class PingCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
