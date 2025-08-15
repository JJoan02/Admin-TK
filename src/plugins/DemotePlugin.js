// src/plugins/DemotePlugin.js

import BasePlugin from './base-plugin.js';
import { DemoteCommand } from '../commands/DemoteCommand.js';
import DemoteCommandHandler from '../commandHandlers/DemoteCommandHandler.js';

class DemotePlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'Demote';
    this.description = 'Degrada a uno o más administradores a miembros en un grupo.';
    this.commands = [
      {
        name: 'demote',
        alias: ['degradar'],
        description: 'Degrada a un administrador a miembro del grupo.',
        permission: 'GROUP_ADMIN',
        isGroupOnly: true,
        cooldown: 5,
        usage: '@admin1 @admin2',
        command: DemoteCommand,
        handler: DemoteCommandHandler,
      },
    ];
  }
}

export default DemotePlugin;
