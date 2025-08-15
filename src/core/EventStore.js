// src/core/EventStore.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import EventBus from './EventBus.js';

/**
 * Clase base para todos los eventos de dominio.
 */
export class DomainEvent {
  constructor(type, payload, aggregateId = null) {
    this.type = type;
    this.payload = payload;
    this.aggregateId = aggregateId;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * El EventStore es responsable de persistir eventos de dominio
 * y de publicarlos en el EventBus.
 */
class EventStore {
  #dbService;
  #logger;

  constructor(dbService, logger) {
    this.#dbService = dbService;
    this.#logger = logger;
    this.#logger.info('EventStore inicializado.');
  }

  /**
   * Persiste un evento en la base de datos y lo publica en el EventBus.
   * @param {DomainEvent} event - La instancia del evento de dominio a persistir y publicar.
   */
  async publish(event) {
    if (!(event instanceof DomainEvent)) {
      this.#logger.error('Intento de publicar un objeto que no es una instancia de DomainEvent.', event);
      return;
    }

    try {
      const db = this.#dbService.getDB();
      const eventData = JSON.stringify(event.payload);

      await db.run(
        `INSERT INTO events (type, payload, timestamp, aggregateId) VALUES (?, ?, ?, ?)`,
        event.type,
        eventData,
        event.timestamp,
        event.aggregateId
      );
      this.#logger.debug(`EventStore: Evento '${event.type}' persistido y publicado.`);

      // Publicar el evento en el EventBus
      EventBus.emit(event.type, event);
    } catch (error) {
      this.#logger.error({ err: error, event }, '❌ Error al persistir o publicar evento en EventStore.');
    }
  }

  /**
   * Recupera eventos de la base de datos.
   * @param {string} [type=null] - Tipo de evento a filtrar. Si es null, recupera todos.
   * @param {string} [aggregateId=null] - ID del agregado a filtrar. Si es null, no filtra por agregado.
   * @returns {Promise<DomainEvent[]>} Lista de eventos recuperados.
   */
  async getEvents(type = null, aggregateId = null) {
    try {
      const db = this.#dbService.getDB();
      let query = 'SELECT * FROM events';
      const params = [];
      const conditions = [];

      if (type) {
        conditions.push('type = ?');
        params.push(type);
      }
      if (aggregateId) {
        conditions.push('aggregateId = ?');
        params.push(aggregateId);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY timestamp ASC';

      const rows = await db.all(query, params);
      return rows.map(row => new DomainEvent(row.type, JSON.parse(row.payload), row.aggregateId, row.timestamp));
    } catch (error) {
      this.#logger.error({ err: error, type, aggregateId }, '❌ Error al recuperar eventos de EventStore.');
      return [];
    }
  }
}

export default EventStore;
