// src/commands/IALearnCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para enseñar un nuevo hecho a la IA.
 */
export class IALearnCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
