// src/plugins/MenuPlugin.js

import { MenuCommand } from '../commands/MenuCommand.js';
import MenuCommandHandler from '../commandHandlers/MenuCommandHandler.js';

class MenuPlugin {
  constructor() {
    this.name = 'Menu';
    this.description = 'Muestra el menú de comandos disponibles.';
    this.commands = [
      {
        name: 'menu',
        alias: ['help', 'ayuda', 'comandos'],
        description: 'Muestra este menú de ayuda.',
        permission: 'USER',
        isGroupOnly: false,
        cooldown: 10,
        command: MenuCommand,
        handler: MenuCommandHandler,
      },
    ];
  }
}

export default MenuPlugin;
