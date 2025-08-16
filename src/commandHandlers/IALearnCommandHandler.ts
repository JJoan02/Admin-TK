// src/commandHandlers/IALearnCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

export class IALearnCommandHandler {
  #memoryService;

  constructor(memoryService) {
    this.#memoryService = memoryService;
  }

  async handle(command) {
    const { context } = command;
    const { reply, args, user, message } = context;

    const factText = args.join(' ').trim();
    if (!factText) {
      return reply('⚠️ Debes proporcionar el hecho que quieres que Admin-TK aprenda.');
    }

    try {
      await this.#memoryService.addFact({
        fact_text: factText,
        added_by_jid: user.jid,
        added_by_name: user.name,
        source_chat_id: message.key.remoteJid,
        source_message_id: message.key.id,
      });
      reply('✅ ¡Gracias! He añadido este conocimiento a mi memoria.');
      logger.info(`IA: Owner ${user.name || user.jid.split('@')[0]} enseñó: "${factText.substring(0, 50)}..."`);
    } catch (error) {
      logger.error({ err: error }, '❌ IA: Error al enseñar un hecho.');
      reply('❌ Ocurrió un error al intentar aprender eso.');
    }
  }
}

export default IALearnCommandHandler;
