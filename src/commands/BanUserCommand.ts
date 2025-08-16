// src/commands/BanUserCommand.js

import { Command } from '../core/CommandBus.js';

export class BanUserCommand extends Command {
  constructor(userId, reason = 'No especificada') {
    super();
    this.userId = userId;
    this.reason = reason;
  }
}
