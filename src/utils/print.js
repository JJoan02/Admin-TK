// src/utils/print.js

import { jidDecode, WAMessageStubType, jidNormalizedUser , getContentType } from '@whiskeysockets/baileys';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();
import config from '../../config/config.js';

// --- Funciones Auxiliares de Formato y Utilidad ---

/**
 * Obtiene el timestamp actual formateado para la zona horaria de Lima.
 * @returns {string} El timestamp formateado (HH:MM:SS).
 */
const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Lima',
  });
};

/**
 * Traduce los tipos de contenido de mensaje a un formato legible con emojis.
 * @param {string} messageType - El tipo de contenido del mensaje (ej. 'imageMessage').
 * @returns {string} El tipo de mensaje formateado.
 */
function formatMessageTypes(messageType) {
  const types = {
    conversation: '💬 Texto',
    extendedTextMessage: '📝 Texto Extendido',
    imageMessage: '🖼️ Imagen',
    videoMessage: '📹 Video',
    audioMessage: '🎵 Audio',
    pttMessage: '🎤 Nota de Voz',
    documentMessage: '📄 Documento',
    stickerMessage: '✨ Sticker',
    contactMessage: '👤 Contacto',
    locationMessage: '📍 Ubicación',
    liveLocationMessage: '🛰️ Ubicación en Vivo',
    templateMessage: '📋 Plantilla',
    listMessage: '📜 Lista',
    buttonsMessage: '🔘 Botones',
    viewOnceMessage: '👁️ Mensaje de una vez',
    viewOnceMessageV2: '👁️ Mensaje de una vez v2',
    pollCreationMessage: '📊 Encuesta',
    reactionMessage: '👍 Reacción',
    editedMessage: '✏️ Editado',
    protocolMessage: '🔒 Protocolo',
    messageContextInfo: 'ℹ️ Contexto',
    productMessage: '🛍️ Producto',
    orderMessage: '🛒 Pedido',
    invoiceMessage: '🧾 Factura',
    call: '📞 Llamada',
    chat: '💬 Chat',
    presence: '🟢 Presencia',
    'group-participants': '👥 Participantes Grupo',
    groups: '⚙️ Grupo',
    status: '✨ Estado',
    contacts: '👤 Contactos',
    blocklist: '🚫 Bloqueo',
    history: '📜 Historial',
    'app-state': '📱 App',
    battery: '🔋 Batería',
    'group-call': '📞 Llamada Grupal',
    scheduledCallCreationMessage: '⏰ Llamada Programada',
    ptvMessage: '▶️ Video de una vez',
    botInvokeMessage: '🤖 Invocación Bot',
    callLogMesssage: '📓 Registro Llamada',
    messageHistoryBundle: '📦 Historial Bundle',
    encCommentMessage: '🤫 Comentario Encriptado',
    bcallMessage: '📞 Llamada B',
    lottieStickerMessage: '✨ Sticker Lottie',
    eventMessage: '🗓️ Evento',
    commentMessage: '💬 Comentario',
    newsletterAdminInviteMessage: '✉️ Invitación Newsletter',
    extendedTextMessageWithParentKey: '📝 Texto con Padre',
    placeholderMessage: '❓ Placeholder',
    encEventUpdateMessage: '🤫 Evento Encriptado',
  };
  return types[messageType] || `❓ Desconocido (${messageType})`;
}

/**
 * Formatea los subtipos de mensajes de sistema (stubs) a un formato legible.
 * @param {WAMessageStubType} stubType - El tipo de stub.
 * @returns {string} El tipo de stub formateado.
 */
function formatMessageStubType(stubType) {
  if (!stubType) return 'No especificado';
  const formatted = WAMessageStubType[stubType] || stubType;
  return formatted.replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Obtiene de forma segura el nombre de un JID (usuario o grupo).
 * Previene caídas si `sock` o `sock.getName` no están disponibles.
 * @param {string} jid - El JID del que se quiere obtener el nombre.
 * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket de Baileys.
 * @returns {Promise<string>} El nombre del JID o un valor por defecto.
 */
async function getSafeName(jid, sock) {
  if (!jid) return 'Desconocido';
  const defaultName = jid.split('@')[0];
  if (sock && typeof sock.getName === 'function') {
    try {
      const name = await sock.getName(jid);
      return name || defaultName;
    } catch (e) {
      logger.debug(`⚠️ print.js (getSafeName): No se pudo obtener el nombre para ${jid}: ${e.message}`);
      return defaultName;
    }
  }
  return defaultName;
}

/**
 * Crea una caja de log formateada para mensajes de usuario.
 * @param {object} details - Los detalles del mensaje.
 * @returns {string} El mensaje de log formateado en una caja.
 */
function createLogBoxForMessage(details) {
  const { botName, timestamp, action, senderName, senderJid, isGroup, groupName, chatName, content, filesize } = details;
  const chatIdentifierLine = isGroup
    ? `┃ 👥 En Grupo: ${groupName}`
    : `┃ 👤 En Chat: ${chatName}`;
  const contentLine = content ? `┃ 💬 Contenido: ${content.substring(0, 60)}${content.length > 60 ? '...' : ''}` : '';

  return `╭━━━━━━━━━━━ [ 📥 MENSAJE RECIBIDO ]
┃
┃ 🤖 Bot: ${botName}
┃ 🕒 Horario: ${timestamp}
┃ 🔖 Acción: ${action}
┃ 🗣️De: ${senderName} (${senderJid})
${chatIdentifierLine}
${contentLine ? contentLine + '\n' : ''}┃ 📦 Peso: ${filesize}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

/**
 * Crea una caja de log formateada para eventos del sistema.
 * @param {string} title - El título del evento.
 * @param {Array<{emoji: string, label: string, value: any}>} details - Un array de detalles para mostrar.
 * @returns {string} El mensaje de log formateado en una caja.
 */
function createLogBoxForEvent(title, details) {
  const content = details
    .map(d => `│ ${d.emoji} ${d.label}: ${d.value}`)
    .join('\n');
  return `╭─── [ ${title} ]
${content}
╰────────────────────────────────────────`;
}

// --- Función Principal de Logging de Eventos ---

/**
 * El corazón del sistema de logging. Procesa y formatea todos los eventos de Baileys.
 * @param {string} event - El nombre del evento.
 * @param {any} data - Los datos asociados al evento.
 * @param {object} context - El contexto adicional (user, chat, group, sock).
 */
const logEvent = async (event, data, context = {}) => {
  // Protección: No hacer nada si no hay datos.
  if (!data) {
    logger.warn(`❓ Evento '${event}' recibido sin datos.`);
    return;
  }

  const { user, chat, group, sock } = context;

  switch (event) {
    // --- Eventos de Conexión y Autenticación ---
    case 'connection.update': {
      const { connection, lastDisconnect, qr, code } = data;
      if (connection === 'close') {
        const statusCode = lastDisconnect.error?.output?.statusCode;
        logger.error(`❌ CONEXIÓN: Desconectado. Razón:  ${statusCode ? `(${statusCode}) ${lastDisconnect.error?.message}` : 'Desconocida'}.`);
      } else if (connection === 'open') {
        logger.info('✅ CONEXIÓN: Conectado exitosamente a WhatsApp.');
      } else if (connection === 'connecting') {
        logger.info('🔌 CONEXIÓN: Conectando...');
      }
      if (qr) {
        logger.info('📱 VINCULACIÓN: QR recibido. Escanee con su teléfono.');
      }
      if (code) {
        logger.info(`📱 VINCULACIÓN: Código de 8 dígitos recibido: ${code}.`);
      }
      break;
    }

    case 'creds.update':
      logger.debug('🔑 AUTENTICACIÓN: Credenciales actualizadas y guardadas.');
      break;

    case 'connection.phone-change':
      logger.warn('📱 CONEXIÓN: Cambio de número de teléfono detectado en la sesión.');
      break;

    case 'auth-state.update':
      logger.debug('🔒 AUTENTICACIÓN: Estado de autenticación actualizado.');
      break;

    // --- Eventos de Mensajes ---
    case 'messages.upsert': {
      if (!data.messages || data.messages.length === 0) return;
      const msg = data.messages[0];

      if (msg.key.fromMe) {
        logger.debug(`📤 MENSAJE (Bot): Mensaje propio enviado a ${msg.key.remoteJid}.`);
        return;
      }

      const fromJid = msg.key.remoteJid;
      const isGroup = fromJid.endsWith('@g.us');
      const senderJid = jidNormalizedUser (msg.key?.participant || msg.key?.remoteJid);

      const [chatName, senderName] = await Promise.all([
        getSafeName(fromJid, sock),
        getSafeName(senderJid, sock)
      ]);

      const messageTypeRaw = getContentType(msg.message);
      const filesize = msg.message?.fileLength?.low || msg.message?.fileLength || 0;

      let messageContent = '';
      if (messageTypeRaw === 'conversation') {
        messageContent = msg.message.conversation;
      } else if (messageTypeRaw === 'extendedTextMessage') {
        messageContent = msg.message.extendedTextMessage.text;
      } else if (msg.message?.imageMessage?.caption) {
        messageContent = `🖼️ ${msg.message.imageMessage.caption}`;
      } else if (msg.message?.videoMessage?.caption) {
        messageContent = `📹 ${msg.message.videoMessage.caption}`;
      } else if (msg.messageStubType) {
        messageContent = `[Evento de Sistema: ${formatMessageStubType(msg.messageStubType)}]`;
      }

      const logMessage = createLogBoxForMessage({
        botName: sock?.user?.name || config.botName || 'Admin-TK',
        timestamp: getTimestamp(),
        action: formatMessageTypes(messageTypeRaw),
        senderName: msg.pushName || senderName,
        senderJid: senderJid.split('@')[0],
        isGroup,
        groupName: group?.subject || chatName,
        chatName: chatName,
        content: messageContent,
        filesize: filesize > 0 ? `${(filesize / 1024).toFixed(2)} KB` : 'N/A',
      });

      logger.info(logMessage);
      break;
    }

    case 'messages.update': {
      for (const update of data) {
        const remoteJid = update.key?.remoteJid;
        if (update.status === 4) {
          logger.info(`✔️ MENSAJE: Mensaje ${update.key.id} leído por ${remoteJid ? remoteJid.split('@')[0] : 'N/A'}.`);
        } else if (update.messageStubType === WAMessageStubType.REVOKE) {
          logger.warn(`🗑️ MENSAJE: Mensaje eliminado en ${remoteJid ? remoteJid.split('@')[0] : 'N/A'} (ID: ${update.key.id}).`);
        } else {
          logger.debug(`🔄 MENSAJE: Actualización de estado de mensaje: ${JSON.stringify(update)}`);
        }
      }
      break;
    }

    case 'message-receipt.update': {
      for (const receipt of data) {
        const userJid = receipt.receipt?.userJid;
        logger.debug(`📨 RECIBO: Mensaje ${receipt.key.id} - Estado: ${receipt.receipt?.userReceiptValidation?.timestamp ? 'Leído' : 'Entregado'} por ${userJid ? userJid.split('@')[0] : 'N/A'}.`);
      }
      break;
    }

    case 'messages.delete': {
      const remoteJidDelete = data.remoteJid;
      logger.warn(`🗑️ MENSAJE: Mensaje eliminado por el remitente en ${remoteJidDelete ? remoteJidDelete.split('@')[0] : 'N/A'} (ID: ${data.id}).`);
      break;
    }

    // --- Eventos de Grupos ---
    case 'group-participants.update': {
      const { id: groupId, participants, action } = data;
      const participantJid = participants[0];
      const [groupName, participantName] = await Promise.all([
        getSafeName(groupId, sock),
        getSafeName(participantJid, sock)
      ]);

      const actionMap = {
        add: { emoji: '➕', text: 'se ha unido' },
        remove: { emoji: '➖', text: 'ha abandonado' },
        promote: { emoji: '⬆️', text: 'ahora es admin' },
        demote: { emoji: '⬇️', text: 'ya no es admin' },
      };
      const eventInfo = actionMap[action] || { emoji: '⚙️', text: `realizó la acción "${action}"` };

      const log = createLogBoxForEvent('👥 CAMBIO DE PARTICIPANTES', [
        { emoji: '🏢', label: 'Grupo', value: groupName },
        { emoji: '👤', label: 'Usuario', value: participantName },
        { emoji: '🆔', label: 'JID', value: participantJid.split('@')[0] },
        { emoji: eventInfo.emoji, label: 'Acción', value: eventInfo.text },
      ]);
      logger.info(log);
      break;
    }

    case 'groups.update': {
      for (const update of data) {
        const groupName = await getSafeName(update.id, sock);
        let changeDetail = 'Actualización general.';
        if (update.subject) {
          changeDetail = `Nuevo nombre: "${update.subject}"`;
        } else if (update.description) {
          changeDetail = 'Descripción actualizada.';
        } else if (update.announce !== undefined) {
          changeDetail = `Modo "Solo Admins" ${update.announce ? 'activado' : 'desactivado'}.`;
        }
        const log = createLogBoxForEvent('⚙️ ACTUALIZACIÓN DE GRUPO', [
          { emoji: '🏢', label: 'Grupo', value: groupName },
          { emoji: '🆔', label: 'JID', value: update.id.split('@')[0] },
          { emoji: '✏️', label: 'Cambio', value: changeDetail },
        ]);
        logger.info(log);
      }
      break;
    }

    // --- Eventos de Chats y Contactos ---
    case 'chats.update': {
      for (const update of data) {
        if (!update.id) continue;
        const chatName = await getSafeName(update.id, sock);
        let action = 'Actualización general';
        if (update.unreadCount !== undefined) action = `Mensajes no leídos: ${update.unreadCount}`;
        if (update.mute !== undefined) action = `Chat ${update.mute ? 'silenciado' : 'desilenciado'}`;
        if (update.archive !== undefined) action = `Chat ${update.archive ? 'archivado' : 'desarchivado'}`;
        if (update.pin !== undefined) action = `Chat ${update.pin ? 'fijado' : 'desfijado'}`;
        logger.info(`💬 CHAT: [${chatName}] - ${action}.`);
      }
      break;
    }

    case 'chats.delete':
      logger.warn(`🗑️ CHAT: Chat ${data.jid ? data.jid.split('@')[0] : 'N/A'} eliminado.`);
      break;

    case 'contacts.upsert': {
      for (const contact of data) {
        logger.info(`👤 CONTACTO: Contacto ${contact.notify || contact.id.split('@')[0]} ${contact.name ? 'actualizado' : 'añadido'}.`);
      }
      break;
    }

    case 'blocklist.update': {
      for (const item of data) {
        const user = await getSafeName(item.jid, sock);
        const action = item.action === 'add' ? 'bloqueado' : 'desbloqueado';
        logger.warn(`🚫 BLOQUEO: Usuario ${user} ha sido ${action}.`);
      }
      break;
    }

    // --- Eventos de Llamadas ---
    case 'call': {
      for (const call of data) {
        const callerName = await getSafeName(call.from, sock);
        const callType = call.isGroup ? 'Llamada Grupal' : 'Llamada 1 a 1';
        const log = createLogBoxForEvent('📞 EVENTO DE LLAMADA', [
          { emoji: '🗣️', label: 'De', value: callerName },
          { emoji: '🆔', label: 'ID Llamada', value: call.id },
          { emoji: '🏷️', label: 'Tipo', value: callType },
          { emoji: '📈', label: 'Estado', value: call.status },
        ]);
        logger.info(log);
      }
      break;
    }

    // --- Otros Eventos ---
    case 'presence.update': {
      const { id, presences } = data;
      const chatName = await getSafeName(id, sock);
      for (const jid in presences) {
        const presence = presences[jid];
        const userName = await getSafeName(jid, sock);
        if (presence.lastKnownPresence === 'composing') {
          logger.debug(`✍️ PRESENCIA: ${userName} está escribiendo en ${chatName}.`);
        } else if (presence.lastKnownPresence === 'recording') {
          logger.debug(`🎤 PRESENCIA: ${userName} está grabando un audio en ${chatName}.`);
        } else if (presence.lastKnownPresence === 'available') {
          logger.debug(`🟢 PRESENCIA: ${userName} está en línea en ${chatName}.`);
        } else if (presence.lastKnownPresence === 'unavailable') {
          logger.debug(`⚪ PRESENCIA: ${userName} está fuera de línea en ${chatName}.`);
        } else if (presence.lastKnownPresence === 'paused') {
          logger.debug(`⏸️ PRESENCIA: ${userName} ha pausado la escritura en ${chatName}.`);
        }
      }
      break;
    }

    case 'battery.update': {
      const { battery, plugged } = data;
      const emoji = plugged ? '🔌' : (battery < 20 ? '🪫' : '🔋');
      logger.info(`${emoji} BATERÍA: Nivel: ${battery}%. ${plugged ? 'Cargando.' : ''}`);
      break;
    }

    case 'history.set':
      logger.info('📜 HISTORIAL: Lotes de mensajes iniciales cargados.');
      break;

    default:
      logger.debug(`❓ EVENTO NO MANEJADO: Tipo: ${event}, Datos: ${JSON.stringify(data)}`);
  }
};

export default logEvent;