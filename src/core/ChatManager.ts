import DataUtils from '../utils/dataUtils.js';
import { DatabaseError } from '../core/ErrorHandler.js';
import { ChatUpdatedEvent, ChatPersonalityUpdatedEvent } from '../events/DomainEvents.js';

export class ChatManager {
  #db;
  #logger;
  #errorHandler;
  #eventStore;
  #chats = new Map(); // Caché en memoria para chats

  /**
   * @param {object} dbService - Instancia del servicio de base de datos.
   * @param {object} logger - Instancia del logger.
   * @param {object} errorHandler - Instancia del manejador de errores.
   * @param {object} eventStore - Instancia del EventStore.
   */
  constructor(dbService, logger, errorHandler, eventStore) {
    this.#db = dbService;
    this.#logger = logger;
    this.#errorHandler = errorHandler;
    this.#eventStore = eventStore;
  }

  /**
   * Obtiene los datos de un chat por su JID.
   * @param {string} jid - El JID del chat.
   * @returns {Promise<object>} - Datos del chat.
   */
  async getChat(jid) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de chat inválido proporcionado a getChat: ${jid}`);
      throw new DatabaseError(`JID de chat inválido: ${jid}`);
    }

    // Intentar obtener de la caché primero
    if (this.#chats.has(normalizedJid)) {
      return this.#chats.get(normalizedJid);
    }

    try {
      let chat = await this.#db.get('SELECT * FROM chats WHERE jid = ?', normalizedJid);
      let isNewChat = false;

      if (!chat) {
        this.#logger.info(`Nueva conversación privada detectada con: ${normalizedJid}. Creando registro.`);
        const newChat = {
          jid: normalizedJid,
          isBotMuted: false,
          isAiEnabled: true,
          conversationState: null,
          lastInteraction: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await this.#db.run(
          'INSERT OR IGNORE INTO chats (jid, isBotMuted, isAiEnabled, conversationState, lastInteraction, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
          newChat.jid,
          newChat.isBotMuted,
          newChat.isAiEnabled,
          newChat.conversationState,
          newChat.lastInteraction,
          newChat.createdAt,
          newChat.updatedAt
        );
        // Después de la inserción, el chat ya está en la DB o fue ignorado.
        // Si fue insertado, newChat es el objeto correcto. Si fue ignorado, la siguiente consulta lo obtendrá.
        chat = await this.#db.get('SELECT * FROM chats WHERE jid = ?', normalizedJid);
        if (!chat) { // Fallback si la inserción fue ignorada y no se pudo obtener
          chat = newChat;
        }
        isNewChat = true;
      }

      this.#chats.set(normalizedJid, chat); // Almacenar en caché

      if (isNewChat) {
        // No hay un ChatCreatedEvent en DomainEvents.js, pero se podría añadir si es necesario.
      }

      return chat;
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'ChatManager.getChat', jid });
      throw new DatabaseError('Error al obtener o crear chat.', error);
    }
  }

  /**
   * Actualiza los datos de un chat en la base de datos y en memoria.
   * @param {string} jid - El JID del chat a actualizar.
   * @param {object} data - Un objeto con los campos a actualizar.
   * @returns {Promise<void>}
   */
  async updateChat(jid, data) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de chat inválido proporcionado a updateChat: ${jid}`);
      throw new DatabaseError(`JID de chat inválido: ${jid}`);
    }

    if (Object.keys(data).length === 0) {
      this.#logger.warn(`No se proporcionaron datos para actualizar el chat: ${normalizedJid}`);
      return;
    }

    try {
      // Obtener datos actuales para fusionar (desde caché o DB)
      let currentData = this.#chats.get(normalizedJid);
      if (!currentData) {
        currentData = await this.getChat(normalizedJid); // Esto también lo pondrá en caché
        if (!currentData) {
          this.#logger.warn(`No se encontró chat ${normalizedJid} para actualizar.`);
          return;
        }
      }
      const oldData = { ...currentData }; // Copia de los datos antiguos
      const newData = { ...currentData, ...data, updatedAt: new Date().toISOString() };

      const columns = Object.keys(newData);
      const placeholders = columns.map(() => '?').join(', ');
      const values = Object.values(newData);

      // Usar INSERT OR REPLACE para UPSERT eficiente
      const query = `INSERT OR REPLACE INTO chats (${columns.join(', ')}) VALUES (${placeholders})`;
      await this.#db.run(query, ...values);

      this.#chats.set(normalizedJid, newData); // Actualizar también la caché en memoria
      this.#logger.debug(`Chat ${normalizedJid} actualizado en DB y memoria.`);

      // Publicar evento ChatUpdatedEvent si hay cambios significativos
      const changedFields = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && oldData[key] !== data[key]) {
          changedFields[key] = data[key];
        }
      }
      if (Object.keys(changedFields).length > 0) {
        await this.#eventStore.publish(new ChatUpdatedEvent(normalizedJid, changedFields));

        // Evento específico para cambio de personalidad
        if (changedFields.hasOwnProperty('personality_profile')) {
          await this.#eventStore.publish(new ChatPersonalityUpdatedEvent(normalizedJid, changedFields.personality_profile));
        }
      }

    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'ChatManager.updateChat', jid, data });
      throw new DatabaseError('Error al actualizar datos del chat.', error);
    }
  }

  /**
   * Elimina un chat de la base de datos y de la caché.
   * @param {string} jid - El JID del chat a eliminar.
   * @returns {Promise<void>}
   */
  async removeChat(jid) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de chat inválido proporcionado a removeChat: ${jid}`);
      throw new DatabaseError(`JID de chat inválido: ${jid}`);
    }
    try {
      await this.#db.run('DELETE FROM chats WHERE jid = ?', normalizedJid);
      this.#chats.delete(normalizedJid); // Eliminar de la caché
      this.#logger.debug(`Chat ${normalizedJid} eliminado de DB y memoria.`);
      // No hay un ChatDeletedEvent en DomainEvents.js, pero se podría añadir si es necesario.
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'ChatManager.removeChat', jid });
      throw new DatabaseError('Error al eliminar chat.', error);
    }
  }

  /**
   * Obtiene todos los chats de la base de datos.
   * @returns {Promise<Array<object>>}
   */
  async getAllChats() {
    try {
      const allChats = await this.#db.all('SELECT * FROM chats');
      // Actualizar caché con todos los chats
      allChats.forEach(chat => this.#chats.set(chat.jid, chat));
      return allChats;
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'ChatManager.getAllChats' });
      throw new DatabaseError('Error al obtener todos los chats.', error);
    }
  }

  async setConversationState(jid, state) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de chat inválido proporcionado a setConversationState: ${jid}`);
      throw new DatabaseError(`JID de chat inválido: ${jid}`);
    }
    try {
      await this.updateChat(normalizedJid, { conversationState: state });
      if (state) {
        this.#logger.debug(`Estado de conversación para ${normalizedJid} establecido a: ${state}`);
      } else {
        this.#logger.debug(`Estado de conversación para ${normalizedJid} limpiado.`);
      }
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'ChatManager.setConversationState', jid, state });
      throw new DatabaseError('Error al establecer el estado de conversación.', error);
    }
  }
}

export default ChatManager;
