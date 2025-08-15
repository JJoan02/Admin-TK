// src/plugins/chatManagementPlugin.js

import BasePlugin from './base-plugin.js';
import { BlockUserCommand } from '../commands/BlockUserCommand.js';
import BlockUserCommandHandler from '../commandHandlers/BlockUserCommandHandler.js';
import { UnblockUserCommand } from '../commands/UnblockUserCommand.js';
import UnblockUserCommandHandler from '../commandHandlers/UnblockUserCommandHandler.js';
import DataUtils from '../utils/dataUtils.js'; // Necesario para getTargetJid

class ChatManagementPlugin extends BasePlugin {
  constructor() {
    super();
    this.name = 'Chat Management';
    this.description = 'Gestiona la interacción en chats privados.';
    this.commands = [
      {
        name: 'block',
        alias: ['bloquear'],
        description: 'Bloquea a un usuario para que no pueda usar el bot.',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        usage: '<mención/número>',
        command: BlockUserCommand,
        handler: BlockUserCommandHandler,
        // Función para obtener el JID objetivo, se pasa al comando
        getTargetJid: (message, args, config) => {
          const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
          if (mentionedJids.length > 0) {
            return mentionedJids[0];
          }
          if (args.length > 0) {
            const rawNumber = args[0].replace(/[^0-9]/g, '');
            const formattedNumber = DataUtils.validateAndFormatPhoneNumber(rawNumber);
            if (formattedNumber) {
              return `${formattedNumber.replace('+', '')}@s.whatsapp.net`;
            }
          }
          if (!message.key.remoteJid.endsWith('@g.us')) {
            return message.key.remoteJid;
          }
          return null;
        },
      },
      {
        name: 'unblock',
        alias: ['desbloquear'],
        description: 'Desbloquea a un usuario para que pueda usar el bot.',
        permission: 'OWNER',
        isGroupOnly: false,
        cooldown: 5,
        usage: '<mención/número>',
        command: UnblockUserCommand,
        handler: UnblockUserCommandHandler,
        // Función para obtener el JID objetivo, se pasa al comando
        getTargetJid: (message, args, config) => {
          const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
          if (mentionedJids.length > 0) {
            return mentionedJids[0];
          }
          if (args.length > 0) {
            const rawNumber = args[0].replace(/[^0-9]/g, '');
            const formattedNumber = DataUtils.validateAndFormatPhoneNumber(rawNumber);
            if (formattedNumber) {
              return `${formattedNumber.replace('+', '')}@s.whatsapp.net`;
            }
          }
          if (!message.key.remoteJid.endsWith('@g.us')) {
            return message.key.remoteJid;
          }
          return null;
        },
      },
    ];
  }
}

export default ChatManagementPlugin;
