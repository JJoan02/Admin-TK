// src/plugins/AddPlugin.js

import BasePlugin from './base-plugin.js';
import { AddCommand } from '../commands/AddCommand.js';
import AddCommandHandler from '../commandHandlers/AddCommandHandler.js';

class AddPlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'Add';
    this.description = 'Añade uno o más miembros a un grupo.';
    this.commands = [
      {
        name: 'add',
        alias: ['añadir', 'agregar'],
        description: 'Añade miembros al grupo.',
        permission: 'GROUP_ADMIN',
        isGroupOnly: true,
        cooldown: 5,
        usage: '@miembro1 @miembro2',
        command: AddCommand,
        handler: AddCommandHandler,
      },
    ];
  }
}

export default AddPlugin;
