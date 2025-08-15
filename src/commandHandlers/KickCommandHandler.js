// src/commandHandlers/KickCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import DataUtils from '../utils/dataUtils.js';
import Auth from '../utils/auth.js';

class KickCommandHandler {
  async handle(command) {
    const { context } = command;
    const { sock, chat, reply, message, config, user } = context;

    const groupMetadata = await sock.groupMetadata(chat.id);
    const botIsAdmin = groupMetadata.participants.some(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(sock.user.id) && p.admin);
    if (!botIsAdmin) {
      return reply('❌ Necesito ser administrador en este grupo para poder expulsar a otros.');
    }

    const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentionedJids.length === 0) {
      return reply('⚠️ Debes mencionar a al menos un miembro para expulsarlo.');
    }

    const membersToKick = [];
    for (const jid of mentionedJids) {
      const target = groupMetadata.participants.find(p => DataUtils.normalizeJid(p.id) === DataUtils.normalizeJid(jid));

      if (!target) {
        reply(`⚠️ El usuario ${DataUtils.getPhoneNumberFromJid(jid)} no se encuentra en este grupo.`);
        continue;
      }

      if (DataUtils.normalizeJid(jid) === DataUtils.normalizeJid(config.botNumber)) {
        reply('❌ No puedo expulsarme a mí mismo.');
        continue;
      }

      // if (Auth.isOwner(target.role)) {
      //   reply('❌ No puedes expulsar a un dueño del bot.');
      //   continue;
      // }

      if (target.admin && !Auth.isOwner(user.role)) {
        reply('❌ No tienes permiso para expulsar a otro administrador.');
        continue;
      }

      membersToKick.push(jid);
    }

    if (membersToKick.length === 0) {
      return;
    }

    try {
      const result = await sock.groupParticipantsUpdate(chat.id, membersToKick, 'remove');
      const { success, failed } = this.processGroupUpdateResult(result);

      let responseText = '';
      if (success.length > 0) responseText += `✅ Se expulsó a: ${success.join(', ')}
`;
      if (failed.length > 0) responseText += `❌ Falló al expulsar a: ${failed.join(', ')}
`;

      reply(responseText.trim());
    } catch (error) {
      logger.error({ err: error }, '❌ Error al intentar expulsar participantes.');
      reply('❌ Ocurrió un error inesperado al expulsar miembros.');
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

export default KickCommandHandler;
