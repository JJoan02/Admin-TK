// src/plugins/AIPlugin.js

import BasePlugin from './base-plugin.js';
import { IACommand } from '../commands/IACommand.js';
import IACommandHandler from '../commandHandlers/IACommandHandler.js';
import { IALearnCommand } from '../commands/IALearnCommand.js';
import IALearnCommandHandler from '../commandHandlers/IALearnCommandHandler.js';
import { IASetPersonalityCommand } from '../commands/IASetPersonalityCommand.js';
import IASetPersonalityCommandHandler from '../commandHandlers/IASetPersonalityCommandHandler.js';
import { IAResetPersonalityCommand } from '../commands/IAResetPersonalityCommand.js';
import IAResetPersonalityCommandHandler from '../commandHandlers/IAResetPersonalityCommandHandler.js';
import { IAListPersonalityCommand } from '../commands/IAListPersonalityCommand.js';
import IAListPersonalityCommandHandler from '../commandHandlers/IAListPersonalityCommandHandler.js';
import { IAListFactsCommand } from '../commands/IAListFactsCommand.js';
import IAListFactsCommandHandler from '../commandHandlers/IAListFactsCommandHandler.js';

class AIPlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'AI';
    this.description = 'Interactúa con la IA Admin-TK y gestiona su aprendizaje.';
    this.commands = [
      {
        name: 'ia',
        alias: ['ai', 'admin'],
        description: 'Inicia una conversación con la IA Admin-TK.',
        permission: 'USER',
        isGroupOnly: false,
        cooldown: 5,
        minArgs: 1,
        usage: '<tu pregunta>',
        command: IACommand,
        handler: IACommandHandler,
      },
      {
        name: 'ia-aprender',
        alias: ['iaaprender', 'teachai'],
        description: 'Enseña un nuevo hecho a la IA Admin-TK (solo Owner).',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        minArgs: 1,
        usage: '<hecho que quieres que aprenda>',
        command: IALearnCommand,
        handler: IALearnCommandHandler,
      },
      {
        name: 'ia-personalidad',
        alias: ['iapersonalidad', 'setpersonality'],
        description: 'Configura la personalidad de la IA para este chat (solo Owner).',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        minArgs: 1,
        usage: '<rasgo1, rasgo2, ...>',
        command: IASetPersonalityCommand,
        handler: IASetPersonalityCommandHandler,
      },
      {
        name: 'ia-reset-personalidad',
        alias: ['iaresetp'],
        description: 'Resetea la personalidad de la IA en este chat a su estado natural (solo Owner).',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        command: IAResetPersonalityCommand,
        handler: IAResetPersonalityCommandHandler,
      },
      {
        name: 'ia-listar-personalidades',
        alias: ['ialistarp', 'listp'],
        description: 'Lista la personalidad de la IA configurada para este chat (solo Owner).',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        command: IAListPersonalityCommand,
        handler: IAListPersonalityCommandHandler,
      },
      {
        name: 'ia-listar-hechos',
        alias: ['ialistarh', 'listh'],
        description: 'Lista los hechos que la IA ha aprendido sobre este chat (solo Owner).',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        command: IAListFactsCommand,
        handler: IAListFactsCommandHandler,
      },
    ];
  }
}

export default AIPlugin;

