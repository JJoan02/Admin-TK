// src/plugins/KickPlugin.js

import BasePlugin from './base-plugin.js';
import { KickCommand } from '../commands/KickCommand.js';
import KickCommandHandler from '../commandHandlers/KickCommandHandler.js';

class KickPlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'Kick';
    this.description = 'Expulsa a uno o más miembros de un grupo.';
    this.commands = [
      {
        name: 'kick',
        alias: ['expulsar', 'sacar'],
        description: 'Expulsa a un miembro del grupo.',
        permission: 'GROUP_ADMIN',
        isGroupOnly: true,
        cooldown: 5,
        usage: '@miembro1 @miembro2',
        command: KickCommand,
        handler: KickCommandHandler,
      },
    ];
  }
}

export default KickPlugin;
