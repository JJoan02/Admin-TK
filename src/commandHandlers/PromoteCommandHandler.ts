// src/commandHandlers/PromoteCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import DataUtils from '../utils/dataUtils.js';

export class PromoteCommandHandler {
  async handle(command) {
    const { context } = command;
    const { sock, chat, reply, message, user } = context;

    // Lógica de withGroupAdminContext
    const groupMetadata = await sock.groupMetadata(chat.id);
    const botIsAdmin = groupMetadata.participants.some(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(sock.user.id) && p.admin);
    if (!botIsAdmin) {
      return reply('❌ Necesito ser administrador en este grupo para poder promover a otros.');
    }

    const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentionedJids.length === 0) {
      return reply('⚠️ Debes mencionar a al menos un miembro para promoverlo.');
    }

    const membersToPromote = [];
    for (const jid of mentionedJids) {
      const target = groupMetadata.participants.find(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(jid));
      if (target?.admin) {
        reply(`✅ El usuario ${DataUtils.getPhoneNumberFromJid(jid)} ya es un administrador.`);
        continue;
      }
      membersToPromote.push(jid);
    }

    if (membersToPromote.length === 0) {
      return;
    }

    try {
      const result = await sock.groupParticipantsUpdate(chat.id, membersToPromote, 'promote');
      const { success, failed } = this.processGroupUpdateResult(result);

      let responseText = '';
      if (success.length > 0) responseText += `✅ Se promovió a: ${success.join(', ')}
`;
      if (failed.length > 0) responseText += `❌ Falló al promover a: ${failed.join(', ')}
`;

      reply(responseText.trim());
    } catch (error) {
      logger.error({ err: error }, '❌ Error al intentar promover participantes.');
      reply('❌ Ocurrió un error inesperado al promover miembros.');
    }
  }

  processGroupUpdateResult(result) {
    const success = [];
    const failed = [];
    for (const res of result) {
      const jid = DataUtils.getPhoneNumberFromJid(res.jid);
      if (res.status.toString().startsWith('2')) {
        success.push(jid);
      } else {
        failed.push(jid);
      }
    }
    return { success, failed };
  }
}

export default PromoteCommandHandler;
