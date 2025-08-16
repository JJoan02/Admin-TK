import DataUtils from '../utils/dataUtils.js';
import { DatabaseError } from '../core/ErrorHandler.js';
import { GroupCreatedEvent, GroupUpdatedEvent } from '../events/DomainEvents.js';

export class GroupManager {
  #db;
  #logger;
  #errorHandler;
  #eventStore;
  #groups = new Map(); // Caché en memoria para grupos

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
   * Obtiene los datos de un grupo por su JID.
   * @param {string} jid - El JID del grupo.
   * @param {object} [metadata={}] - Metadatos del grupo de Baileys (usado para crear si no existe).
   * @returns {Promise<object>} - Datos del grupo.
   */
  async getGroup(jid, metadata = {}) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de grupo inválido proporcionado a getGroup: ${jid}`);
      throw new DatabaseError(`JID de grupo inválido: ${jid}`);
    }

    // Intentar obtener de la caché primero
    if (this.#groups.has(normalizedJid)) {
      return this.#groups.get(normalizedJid);
    }

    try {
      let group = await this.#db.get('SELECT * FROM groups WHERE jid = ?', normalizedJid);
      let isNewGroup = false;

      if (!group) {
        this.#logger.info(`Nuevo grupo detectado: ${normalizedJid}. Creando perfil en la base de datos.`);
        const newGroup = {
          jid: normalizedJid,
          subject: metadata?.subject || 'Sujeto no disponible', // Acceso seguro
          creation: metadata?.creation || null, // Acceso seguro
          owner: metadata?.owner || null, // Acceso seguro
          size: metadata?.participants?.length || 0, // Acceso seguro
          isMuted: false,
          welcomeMessage: null,
          goodbyeMessage: null,
          isBotEnabled: true,
          isAiEnabled: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await this.#db.run(
          'INSERT OR IGNORE INTO groups (jid, subject, creation, owner, size, isMuted, welcomeMessage, goodbyeMessage, isBotEnabled, isAiEnabled, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          newGroup.jid,
          newGroup.subject,
          newGroup.creation,
          newGroup.owner,
          newGroup.size,
          newGroup.isMuted,
          newGroup.welcomeMessage,
          newGroup.goodbyeMessage,
          newGroup.isBotEnabled,
          newGroup.isAiEnabled,
          newGroup.createdAt,
          newGroup.updatedAt
        );
        // Después de la inserción, el grupo ya está en la DB o fue ignorado.
        // Si fue insertado, newGroup es el objeto correcto. Si fue ignorado, la siguiente consulta lo obtendrá.
        group = await this.#db.get('SELECT * FROM groups WHERE jid = ?', normalizedJid);
        if (!group) { // Fallback si la inserción fue ignorada y no se pudo obtener
          group = newGroup;
        }
        isNewGroup = true;
      }

      this.#groups.set(normalizedJid, group); // Almacenar en caché

      if (isNewGroup) {
        await this.#eventStore.publish(new GroupCreatedEvent(normalizedJid, group));
      }

      return group;
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'GroupManager.getGroup', jid });
      throw new DatabaseError('Error al obtener o crear grupo.', error);
    }
  }

  /**
   * Actualiza los datos de un grupo en la base de datos y en memoria.
   * @param {string} jid - El JID del grupo a actualizar.
   * @param {object} data - Un objeto con los campos a actualizar.
   * @returns {Promise<void>}
   */
  async updateGroup(jid, data) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de grupo inválido proporcionado a updateGroup: ${jid}`);
      throw new DatabaseError(`JID de grupo inválido: ${jid}`);
    }

    if (Object.keys(data).length === 0) {
      this.#logger.warn(`No se proporcionaron datos para actualizar el grupo: ${normalizedJid}`);
      return;
    }

    try {
      // Obtener datos actuales para fusionar (desde caché o DB)
      let currentData = this.#groups.get(normalizedJid);
      if (!currentData) {
        currentData = await this.getGroup(normalizedJid); // Esto también lo pondrá en caché
        if (!currentData) {
          this.#logger.warn(`No se encontró grupo ${normalizedJid} para actualizar.`);
          return;
        }
      }
      const oldData = { ...currentData }; // Copia de los datos antiguos
      const newData = { ...currentData, ...data, updatedAt: new Date().toISOString() };

      const columns = Object.keys(newData);
      const placeholders = columns.map(() => '?').join(', ');
      const values = Object.values(newData);

      // Usar INSERT OR REPLACE para UPSERT eficiente
      const query = `INSERT OR REPLACE INTO groups (${columns.join(', ')}) VALUES (${placeholders})`;
      await this.#db.run(query, ...values);

      this.#groups.set(normalizedJid, newData); // Actualizar también la caché en memoria
      this.#logger.debug(`Grupo ${normalizedJid} actualizado en DB y memoria.`);

      // Publicar evento GroupUpdatedEvent si hay cambios significativos
      const changedFields = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && oldData[key] !== data[key]) {
          changedFields[key] = data[key];
        }
      }
      if (Object.keys(changedFields).length > 0) {
        await this.#eventStore.publish(new GroupUpdatedEvent(normalizedJid, changedFields));
      }

    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'GroupManager.updateGroup', jid, data });
      throw new DatabaseError('Error al actualizar datos del grupo.', error);
    }
  }

  /**
   * Elimina un grupo de la base de datos y de la caché.
   * @param {string} jid - El JID del grupo a eliminar.
   * @returns {Promise<void>}
   */
  async removeGroup(jid) {
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de grupo inválido proporcionado a removeGroup: ${jid}`);
      throw new DatabaseError(`JID de grupo inválido: ${jid}`);
    }
    try {
      await this.#db.run('DELETE FROM groups WHERE jid = ?', normalizedJid);
      this.#groups.delete(normalizedJid); // Eliminar de la caché
      this.#logger.debug(`Grupo ${normalizedJid} eliminado de DB y memoria.`);
      // No hay un evento GroupDeletedEvent en DomainEvents.js, pero se podría añadir si es necesario.
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'GroupManager.removeGroup', jid });
      throw new DatabaseError('Error al eliminar grupo.', error);
    }
  }

  /**
   * Obtiene todos los grupos de la base de datos.
   * @returns {Promise<Array<object>>}
   */
  async getAllGroups() {
    try {
      const allGroups = await this.#db.all('SELECT * FROM groups');
      // Actualizar caché con todos los grupos
      allGroups.forEach(group => this.#groups.set(group.jid, group));
      return allGroups;
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'GroupManager.getAllGroups' });
      throw new DatabaseError('Error al obtener todos los grupos.', error);
    }
  }

  /**
   * Sincroniza los metadatos de un grupo con la base de datos y la caché.
   * @param {string} jid - El JID del grupo.
   * @param {object} metadata - Los metadatos del grupo de Baileys.
   * @returns {Promise<void>}
   */
  async syncGroup(jid, metadata) {
    if (!jid || !metadata) {
      this.#logger.warn(`syncGroup llamado con JID o metadata nulos/indefinidos. JID: ${jid}, Metadata: ${metadata}`);
      throw new Error('JID o metadatos nulos/indefinidos para sincronizar grupo.');
    }
    const normalizedJid = DataUtils.normalizeJid(jid);
    if (!normalizedJid) {
      this.#logger.error(`JID de grupo inválido proporcionado a syncGroup: ${jid}`);
      throw new DatabaseError(`JID de grupo inválido: ${jid}`);
    }

    try {
      const groupData = {
        subject: metadata.subject || 'Sujeto no disponible', // Asegurar valor por defecto
        size: metadata.participants?.length || 0, // Asegurar que size no sea undefined
        owner: metadata.owner || null, // Asegurar valor por defecto
        desc: metadata.desc || null, // Asumiendo que 'desc' es el campo para la descripción, asegurar valor por defecto
        // Añadir otros campos relevantes de metadata si es necesario
      };
      await this.updateGroup(normalizedJid, groupData);
      this.#logger.debug(`Grupo ${normalizedJid} sincronizado.`);
    } catch (error) {
      this.#errorHandler.handleError(error, { context: 'GroupManager.syncGroup', jid, metadata });
      throw new DatabaseError('Error al sincronizar grupo.', error);
    }
  }
}

export default GroupManager;
