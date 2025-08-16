// src/commandHandlers/AddCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import DataUtils from '../utils/dataUtils.js';

export class AddCommandHandler {
  async handle(command) {
    const { context } = command;
    const { sock, chat, reply, message } = context;

    const groupMetadata = await sock.groupMetadata(chat.id);
    const botIsAdmin = groupMetadata.participants.some(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(sock.user.id) && p.admin);
    if (!botIsAdmin) {
      return reply('❌ Necesito ser administrador en este grupo para poder añadir a otros.');
    }

    const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentionedJids.length === 0) {
      return reply('⚠️ Debes mencionar a al menos un miembro para añadirlo.');
    }

    const membersToAdd = [];
    const membersAlreadyInGroup = [];

    for (const jid of mentionedJids) {
      const isParticipant = groupMetadata.participants.some(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(jid));
      if (isParticipant) {
        membersAlreadyInGroup.push(DataUtils.getPhoneNumberFromJid(jid));
      } else {
        membersToAdd.push(jid);
      }
    }

    let responseText = '';
    if (membersAlreadyInGroup.length > 0) {
      responseText += `✅ Ya están en el grupo: ${membersAlreadyInGroup.join(', ')}
`;
    }

    if (membersToAdd.length === 0) {
      return reply(responseText.trim() || 'No se mencionaron nuevos miembros para añadir.');
    }

    try {
      const result = await sock.groupParticipantsUpdate(chat.id, membersToAdd, 'add');
      const { success, failed } = this.processGroupUpdateResult(result);

      if (success.length > 0) responseText += `✅ Se añadió a: ${success.join(', ')}
`;
      if (failed.length > 0) responseText += `❌ Falló al añadir a: ${failed.join(', ')}
`;

      reply(responseText.trim());
    } catch (error) {
      logger.error({ err: error }, '❌ Error al intentar añadir participantes.');
      reply('❌ Ocurrió un error inesperado al añadir miembros.');
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

export default AddCommandHandler;
