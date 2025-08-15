// src/plugins/ToUrlPlugin.js

import BasePlugin from './base-plugin.js';
import { ToUrlCommand } from '../commands/ToUrlCommand.js';
import ToUrlCommandHandler from '../commandHandlers/ToUrlCommandHandler.js';

class ToUrlPlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'ToUrl';
    this.description = 'Sube un archivo multimedia a un servicio de hosting y devuelve la URL.';
    this.commands = [
      {
        name: 'tourl',
        alias: ['upload'],
        description: 'Sube un archivo multimedia y obtiene la URL.',
        permission: 'USER',
        isGroupOnly: false,
        cooldown: 15,
        usage: '<responder a un archivo multimedia>',
        command: ToUrlCommand,
        handler: ToUrlCommandHandler,
      },
    ];
  }
}

export default ToUrlPlugin;