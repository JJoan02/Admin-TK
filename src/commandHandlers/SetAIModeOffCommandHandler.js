// src/commandHandlers/SetAIModeOffCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import Auth from '../utils/auth.js';

class SetAIModeOffCommandHandler {
  #groupManager;
  #chatManager;

  constructor(groupManager, chatManager) {
    this.#groupManager = groupManager;
    this.#chatManager = chatManager;
  }

  async handle(command) {
    const { context } = command;
    const { reply, args, chat, isGroup, user } = context;

    if (args[0].toLowerCase() !== 'ia' && args[0].toLowerCase() !== 'ai') {
      return reply('⚠️ Modo desconocido. El único modo disponible actualmente es "ia".');
    }

    // Lógica de permisos
    if (isGroup) {
      if (!Auth.isGroupAdmin(user.role) && !Auth.isOwner(user.role)) {
        return reply('❌ Solo los administradores del grupo o el dueño del bot pueden desactivar el modo IA en grupos.');
      }
    } else {
      if (!Auth.isUser(user.role) && !Auth.isOwner(user.role)) {
        return reply('❌ Solo los usuarios o el dueño del bot pueden desactivar el modo IA en chats privados.');
      }
    }

    try {
      if (isGroup) {
        await this.#groupManager.updateGroup(chat.id, { isAiEnabled: false });
        reply('🤖 Modo IA autónomo DESACTIVADO en este grupo.');
        logger.info(`🤖 IA: Modo autónomo desactivado en grupo ${chat.id}.`);
      } else {
        await this.#chatManager.updateChat(chat.id, { isAiEnabled: false });
        reply('🤖 Modo IA autónomo DESACTIVADO en este chat.');
        logger.info(`🤖 IA: Modo autónomo desactivado en chat privado ${chat.id}.`);
      }
    } catch (error) {
      logger.error({ err: error }, '❌ Error al desactivar el modo IA autónomo.');
      reply('❌ Ocurrió un error al intentar desactivar el modo IA.');
    }
  }
}

export default SetAIModeOffCommandHandler;
