// src/commands/PromoteCommand.js

import { Command } from '../core/CommandBus.js';

/**
 * Comando para promover a un miembro a administrador.
 */
export class PromoteCommand extends Command {
  /**
   * @param {object} context - El objeto de contexto completo del MessageHandler.
   */
  constructor(context) {
    super();
    this.context = context;
  }
}
