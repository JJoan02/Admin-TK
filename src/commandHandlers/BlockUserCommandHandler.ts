// src/commandHandlers/BlockUserCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import DataUtils from '../utils/dataUtils.js';

export class BlockUserCommandHandler {
  #userManager;
  #config;

  constructor(userManager, config) {
    this.#userManager = userManager;
    this.#config = config;
  }

  async handle(command) {
    const { context, targetJid } = command;
    const { reply } = context;

    const normalizedTargetJid = DataUtils.normalizeJid(targetJid);
    if (!normalizedTargetJid) {
      return reply('❌ El JID proporcionado no es válido.');
    }

    if (this.#isProtected(normalizedTargetJid, this.#config)) {
      return reply('❌ No puedes bloquear a un usuario protegido (owner o el propio bot).');
    }

    try {
      await this.#userManager.banUser(normalizedTargetJid);
      logger.info(`🚫 Usuario ${normalizedTargetJid} ha sido bloqueado.`);
      reply(`✅ El usuario ${normalizedTargetJid.split('@')[0]} ha sido bloqueado.`);
    } catch (error) {
      logger.error({ err: error, targetJid: normalizedTargetJid }, '❌ Error al bloquear al usuario.');
      reply('❌ Ocurrió un error al intentar bloquear al usuario.');
    }
  }

  /**
   * Verifica si un JID está protegido (es un owner o el propio bot).
   * @private
   */
  #isProtected(jid, config) {
    const botJid = DataUtils.normalizeJid(config.botNumber);
    const ownerJids = config.ownerNumbers.map(num => DataUtils.normalizeJid(`${num}@s.whatsapp.net`));
    return jid === botJid || ownerJids.includes(jid);
  }
}

export default BlockUserCommandHandler;
