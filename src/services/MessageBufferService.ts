// src/services/MessageBufferService.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

const DEFAULT_BUFFER_TIMEOUT = 3000; // 3 segundos
const MAX_BUFFER_SIZE = 5; // Máximo 5 mensajes por lote

export class MessageBufferService {
  constructor() {
    this.buffers = new Map();
    this.timeouts = new Map();
    logger.info('🕒 MessageBufferService iniciado');
  }

  /**
   * Agrega mensaje al buffer y programa/envía según condiciones
   * @param {string} chatJid - ID del chat
   * @param {object} message - { content: string, isMedia: boolean }
   * @param {function} sendCallback - Función de envío (content: string) => Promise<void>
   */
  addMessage(chatJid, message, sendCallback) {
    // Determinar tipo de manejo basado en contenido
    if (message.isMedia || this._isUrgentMessage(message.content)) {
      return this._handleImmediateSend(message.content, sendCallback);
    }

    // Crear buffer si no existe
    if (!this.buffers.has(chatJid)) {
      this.buffers.set(chatJid, []);
    }
    
    const buffer = this.buffers.get(chatJid);
    buffer.push(message.content);
    
    // Resetear timeout existente
    if (this.timeouts.has(chatJid)) {
      clearTimeout(this.timeouts.get(chatJid));
    }
    
    // Enviar si se alcanza límite
    if (buffer.length >= MAX_BUFFER_SIZE) {
      return this.flushBuffer(chatJid, sendCallback);
    }
    
    // Programar envío diferido
    this.timeouts.set(
      chatJid,
      setTimeout(() => {
        this.flushBuffer(chatJid, sendCallback);
      }, DEFAULT_BUFFER_TIMEOUT)
    );
  }

  /**
   * Vacía inmediatamente el buffer de un chat específico
   * @param {string} chatJid - ID del chat
   * @param {function} sendCallback - Función de envío
   */
  flushBuffer(chatJid, sendCallback) {
    if (!this.buffers.has(chatJid)) return;

    const buffer = this.buffers.get(chatJid);
    if (buffer.length > 0) {
      const combinedMessage = buffer.join('\n\n');
      sendCallback(combinedMessage)
        .then(() => {
          logger.debug(`📦 Buffer enviado (${buffer.length} mensajes) a ${chatJid}`);
        })
        .catch(error => {
          logger.error(`❌ Error enviando buffer: ${error.message}`);
        });
    }
    
    // Limpiar estructuras
    this.buffers.delete(chatJid);
    if (this.timeouts.has(chatJid)) {
      clearTimeout(this.timeouts.get(chatJid));
      this.timeouts.delete(chatJid);
    }
  }

  /**
   * Vacía todos los buffers activos
   * @param {function} sendCallback - Función de envío
   */
  flushAllBuffers(sendCallback) {
    this.buffers.forEach((_, chatJid) => {
      this.flushBuffer(chatJid, sendCallback);
    });
  }

  // ======== HELPERS PRIVADOS ======== //
  
  /**
   * Maneja envio inmediato para contenidos especiales
   * @private
   */
  _handleImmediateSend(content, sendCallback) {
    sendCallback(content)
      .then(() => logger.debug('⚡ Mensaje urgente/enviado inmediatamente'))
      .catch(error => logger.error('❌ Error enviando mensaje inmediato', error));
  }

  /**
   * Determina si un mensaje requiere envio inmediato
   * @private
   */
  _isUrgentMessage(content) {
    const urgentKeywords = ['urgente', 'importante', 'help', 'ayuda'];
    return urgentKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
  }
}

export default new MessageBufferService();