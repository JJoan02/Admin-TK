// src/commandHandlers/IASetPersonalityCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

export class IASetPersonalityCommandHandler {
  #chatManager;

  constructor(chatManager) {
    this.#chatManager = chatManager;
  }

  async handle(command) {
    const { context } = command;
    const { reply, args, chat, user } = context;

    const personalityString = args.join(' ').trim();
    if (!personalityString) {
      return reply('⚠️ Debes proporcionar al menos un rasgo de personalidad. Ejemplo: `.ia-personalidad celosa, atrevida`');
    }

    try {
      await this.#chatManager.updateChat(chat.id, { personality_profile: personalityString });
      reply(`✅ ¡Entendido! A partir de ahora, mi personalidad en este chat será: *${personalityString}*.`);
      logger.info(`IA: Owner ${user.name || user.jid.split('@')[0]} configuró personalidad para ${chat.id}: ${personalityString}`);
    } catch (error) {
      logger.error({ err: error }, '❌ IA: Error al configurar la personalidad del chat.');
      reply('❌ Ocurrió un error al intentar configurar mi personalidad para este chat.');
    }
  }
}

export default IASetPersonalityCommandHandler;
