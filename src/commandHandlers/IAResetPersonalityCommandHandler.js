// src/commandHandlers/IAResetPersonalityCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

class IAResetPersonalityCommandHandler {
  #chatManager;

  constructor(chatManager) {
    this.#chatManager = chatManager;
  }

  async handle(command) {
    const { context } = command;
    const { reply, chat, user } = context;

    try {
      await this.#chatManager.updateChat(chat.id, { personality_profile: null });
      reply('✅ ¡Personalidad reseteada! Volveré a ser yo misma en este chat.');
      logger.info(`IA: Owner ${user.name || user.jid.split('@')[0]} reseteó la personalidad para ${chat.id}.`);
    } catch (error) {
      logger.error({ err: error }, '❌ IA: Error al resetear la personalidad del chat.');
      reply('❌ Ocurrió un error al intentar resetear mi personalidad.');
    }
  }
}

export default IAResetPersonalityCommandHandler;
