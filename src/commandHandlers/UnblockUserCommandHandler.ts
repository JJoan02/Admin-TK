// src/commandHandlers/UnblockUserCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import DataUtils from '../utils/dataUtils.js';

export class UnblockUserCommandHandler {
  #userManager;

  constructor(userManager) {
    this.#userManager = userManager;
  }

  async handle(command) {
    const { context, targetJid } = command;
    const { reply } = context;

    const normalizedTargetJid = DataUtils.normalizeJid(targetJid);
    if (!normalizedTargetJid) {
      return reply('❌ El JID proporcionado no es válido.');
    }

    try {
      await this.#userManager.unbanUser(normalizedTargetJid);
      logger.info(`🔓 Usuario ${normalizedTargetJid} ha sido desbloqueado.`);
      reply(`✅ El usuario ${normalizedTargetJid.split('@')[0]} ha sido desbloqueado.`);
    } catch (error) {
      logger.error({ err: error, targetJid: normalizedTargetJid }, '❌ Error al desbloquear al usuario.');
      reply('❌ Ocurrió un error al intentar desbloquear al usuario.');
    }
  }
}

export default UnblockUserCommandHandler;
