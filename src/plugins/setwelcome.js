// src/plugins/SetWelcomePlugin.js

import { SetWelcomeCommand } from '../commands/SetWelcomeCommand.js';
import SetWelcomeCommandHandler from '../commandHandlers/SetWelcomeCommandHandler.js';

class SetWelcomePlugin {
  constructor() {
    this.name = 'Set Welcome';
    this.description = 'Personaliza el mensaje de bienvenida del grupo.';
    this.commands = [
      {
        name: 'setwelcome',
        alias: ['bienvenida', 'welcome'],
        description: 'Establece el mensaje de bienvenida para nuevos miembros.',
        permission: 'GROUP_ADMIN',
        isGroupOnly: true,
        cooldown: 10,
        command: SetWelcomeCommand,
        handler: SetWelcomeCommandHandler,
      },
    ];
  }
}

export default SetWelcomePlugin;
