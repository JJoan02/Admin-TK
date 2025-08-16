// src/commandHandlers/ToggleBotCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

export class ToggleBotCommandHandler {
  #groupManager;

  constructor(groupManager) {
    this.#groupManager = groupManager;
  }

  async handle(command) {
    const { context } = command;
    const { chat, reply } = context;

    try {
      const groupData = await this.#groupManager.getGroup(chat.id);
      const currentStatus = groupData ? groupData.isBotEnabled : true;
      const newStatus = !currentStatus;

      await this.#groupManager.updateGroup(chat.id, { isBotEnabled: newStatus });

      const statusMessage = newStatus
        ? '✅ Bot activado en este grupo.'
        : '☑️ Bot desactivado en este grupo.';

      logger.info(`⚙️ Estado del bot en grupo ${chat.id} cambiado a: ${newStatus ? 'Activado' : 'Desactivado'}.`);
      reply(statusMessage);
    } catch (error) {
      logger.error({ err: error }, '❌ Error al cambiar el estado del bot en el grupo.');
      reply('❌ Ocurrió un error al intentar cambiar el estado del bot.');
    }
  }
}

export default ToggleBotCommandHandler;
