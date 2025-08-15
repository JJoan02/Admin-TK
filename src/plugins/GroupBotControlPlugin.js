// src/plugins/GroupBotControlPlugin.js

import { ToggleBotCommand } from '../commands/ToggleBotCommand.js';
import ToggleBotCommandHandler from '../commandHandlers/ToggleBotCommandHandler.js';

class GroupBotControlPlugin {
  constructor() {
    this.name = 'Group Bot Control';
    this.description = 'Activa o desactiva el bot en un grupo.';
    this.commands = [
      {
        name: 'togglebot',
        alias: ['bot'],
        description: 'Activa o desactiva el bot en este grupo.',
        permission: 'GROUP_ADMIN',
        isGroupOnly: true,
        cooldown: 5,
        command: ToggleBotCommand,
        handler: ToggleBotCommandHandler,
      },
    ];
  }
}

export default GroupBotControlPlugin;
