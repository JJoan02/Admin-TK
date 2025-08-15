// src/commands/MenuCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para solicitar la generación y envío del menú de comandos.
 */
export class MenuCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
