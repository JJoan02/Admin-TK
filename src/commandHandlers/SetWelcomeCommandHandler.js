// src/commandHandlers/SetWelcomeCommandHandler.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

class SetWelcomeCommandHandler {
  #groupManager;

  constructor(groupManager) {
    this.#groupManager = groupManager;
  }

  async handle(command) {
    const { context } = command;
    const { chat, args, reply, config } = context;

    const welcomeMessage = args.join(' ').trim();

    if (!welcomeMessage) {
      let usage = `⚠️ Debes proporcionar un mensaje.\n\n`;
      usage += `*Uso:* ${config.prefix}setwelcome <mensaje>\n\n`;
      usage += `Puedes usar estas variables:\n`;
      usage += `  - *{user}*: Menciona al nuevo miembro.\n`;
      usage += `  - *{group}*: Pone el nombre del grupo.`;
      return reply(usage);
    }

    try {
      await this.#groupManager.updateGroup(chat.id, { welcomeMessage: welcomeMessage });
      logger.info(`📝 Mensaje de bienvenida actualizado para el grupo ${chat.id}.`);

      let confirmation = `✅ Mensaje de bienvenida actualizado.\n\n`;
      confirmation += `*Vista previa:*
${welcomeMessage}`;

      reply(confirmation);
    } catch (error) {
      logger.error({ err: error }, '❌ Error al establecer el mensaje de bienvenida.');
      reply('❌ Ocurrió un error al guardar el mensaje de bienvenida.');
    }
  }
}

export default SetWelcomeCommandHandler;
