// src/utils/commandUtils.js

import { initializeLogger } from './logger.js';
const logger = initializeLogger();
import DataUtils from './dataUtils.js';

/**
 * Un decorador o wrapper de orden superior para comandos que requieren contexto de administrador de grupo.
 * Realiza todas las validaciones comunes antes de ejecutar la lógica principal del comando.
 *
 * @param {function(object): Promise<void>} commandLogic - La lógica específica del comando a ejecutar.
 * @returns {function(object): Promise<void>} Una nueva función que envuelve la lógica del comando con validaciones.
 */
export function withGroupAdminContext(commandLogic) {
  return async function(context) {
    const { sock, chat, reply, config, user } = context;

    // 1. Verificar si el bot tiene permisos de administrador
    const groupMetadata = await sock.groupMetadata(chat.id);
    const botNumber = DataUtils.normalizeJid(config.botNumber);
    const botParticipant = groupMetadata.participants.find(p => DataUtils.normalizeJid(p.id) === botNumber);

    if (!botParticipant?.admin) {
      return reply('❌ Necesito ser administrador del grupo para ejecutar este comando.');
    }

    // 2. Extraer JIDs de las menciones
    const mentionedJids = context.message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentionedJids.length === 0) {
      return reply(`⚠️ Debes mencionar al menos a un miembro del grupo.`);
    }

    // 3. Crear un contexto enriquecido para la lógica del comando
    const enrichedContext = {
      ...context,
      groupMetadata,
      botParticipant,
      mentionedJids,
    };

    // 4. Ejecutar la lógica principal del comando
    return commandLogic(enrichedContext);
  };
}

/**
 * Procesa el resultado de una actualización de participantes de grupo (add, remove, promote, demote).
 * @param {Array<object>} result - El array de resultados de groupParticipantsUpdate.
 * @returns {{success: string[], failed: string[]}} Un objeto con arrays de números de teléfono exitosos y fallidos.
 */
export function processGroupUpdateResult(result) {
  const success = [];
  const failed = [];
  for (const res of result) {
    const num = DataUtils.getPhoneNumberFromJid(res.jid);
    if (res.status === '200') {
      success.push(num);
    } else {
      failed.push(`${num} (Error: ${res.status})`);
    }
  }
  return { success, failed };
}
