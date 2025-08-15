// src/plugins/FeatureFlagPlugin.js

import BasePlugin from './base-plugin.js';
import { SetFeatureFlagCommand } from '../commands/SetFeatureFlagCommand.js';
import SetFeatureFlagCommandHandler from '../commandHandlers/SetFeatureFlagCommandHandler.js';
import { ListFeatureFlagsCommand } from '../commands/ListFeatureFlagsCommand.js';
import ListFeatureFlagsCommandHandler from '../commandHandlers/ListFeatureFlagsCommandHandler.js';

class FeatureFlagPlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'FeatureFlags';
    this.description = 'Gestiona los feature flags del bot.';
    this.commands = [
      {
        name: 'setflag',
        alias: ['flag'],
        description: 'Habilita o deshabilita un feature flag. Uso: .setflag <nombre> <on|off>',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        minArgs: 2,
        usage: '<nombre> <on|off>',
        command: SetFeatureFlagCommand,
        handler: SetFeatureFlagCommandHandler,
      },
      {
        name: 'listflags',
        alias: ['flags'],
        description: 'Lista todos los feature flags y su estado.',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        command: ListFeatureFlagsCommand,
        handler: ListFeatureFlagsCommandHandler,
      },
    ];
  }
}

export default FeatureFlagPlugin;
