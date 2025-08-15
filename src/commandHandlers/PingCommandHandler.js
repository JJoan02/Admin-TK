// src/commandHandlers/PingCommandHandler.js

import { jidNormalizedUser } from '@whiskeysockets/baileys';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

/**
 * Manejador para el comando PingCommand.
 */
class PingCommandHandler {
  /**
   * Maneja la ejecución del comando de ping.
   * @param {PingCommand} command - El comando que contiene el contexto del mensaje.
   */
  async handle(command) {
    const { context } = command;
    const { reply, sock, chat, message } = context;
    const startTime = Date.now();

    await reply('🏓 ¡Pong! Refactorizado!');

    const endTime = Date.now();
    const latency = endTime - startTime;

    const targetJid = jidNormalizedUser(chat?.id || message.key.remoteJid);

    if (!targetJid) {
      logger.error(`❌ ERROR: JID inválido para sendMessage. chat.id: ${chat?.id}, message.key.remoteJid: ${message.key.remoteJid}`);
      await reply('❌ Error interno: No se pudo determinar el chat para enviar la latencia.');
      return;
    }

    await sock.sendMessage(targetJid, { text: `⏱️ Latencia: *${latency} ms*` });
  }
}

export default PingCommandHandler;
