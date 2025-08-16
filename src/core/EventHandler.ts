import { truncateString } from '../utils/helpers.js';
const dotenv = require('dotenv');
dotenv.config();

const OWNER_WHATSAPP_NUMBER = process.env.OWNER_WHATSAPP_NUMBER;

export class EventHandler {
  #initialized = false;
  #logger;
  #errorHandler;
  #messageHandler;
  #groupHandler;
  #notificationService;
  #printEvent;

  /**
   * @param {object} logger - Instancia del logger.
   * @param {object} errorHandler - Instancia del manejador de errores.
   * @param {object} messageHandler - Instancia de MessageHandler.
   * @param {object} groupHandler - Instancia de GroupHandler.
   * @param {object} notificationService - Instancia de NotificationService.
   * @param {Function} printEvent - Función para imprimir eventos.
   */
  constructor(logger, errorHandler, messageHandler, groupHandler, notificationService, printEvent) {
    this.#logger = logger;
    this.#errorHandler = errorHandler;
    this.#messageHandler = messageHandler;
    this.#groupHandler = groupHandler;
    this.#notificationService = notificationService;
    this.#printEvent = printEvent;
  }

  /**
   * Registra todos los manejadores de eventos en el socket de Baileys.
   * Este método se llama una vez que el socket está conectado.
   * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket de Baileys.
   */
  register(sock) {
    if (this.#initialized) {
      this.#logger.warn('⚠️ EventHandler ya ha sido inicializado. Saltando registro duplicado.');
      return;
    }

    this.#logger.info('✨ Registrando manejadores de eventos en modo OMNI...');

    // Eventos principales que requieren lógica de manejo
    sock.ev.on('messages.upsert', (m) => this.#handleEvent('messages.upsert', m, sock, this.#messageHandler.handle.bind(this.#messageHandler)));
    sock.ev.on('group-participants.update', (e) => this.#handleEvent('group-participants.update', e, sock, this.#groupHandler.handleParticipantUpdate.bind(this.#groupHandler)));
    sock.ev.on('groups.update', (u) => this.#handleEvent('groups.update', u, sock, this.#groupHandler.handleGroupUpdate.bind(this.#groupHandler)));

    // Registrar otros eventos para logging/impresión (sin lógica de manejo compleja aquí)
    this.#registerPrintOnlyEvents(sock);

    this.#initialized = true;
    this.#logger.info('✅ Todos los manejadores de eventos OMNI han sido registrados.');
  }

  /**
   * Wrapper genérico para manejar eventos, incluyendo logging y manejo de errores.
   * @private
   */
  async #handleEvent(eventName, data, sock, handler) {
    try {
      // Imprimir el evento antes de procesarlo, pasando todas las dependencias para el contexto
      this.#printEvent(eventName, data, { sock, logger: this.#logger }); // Solo pasar logger
      // Ejecutar el manejador específico
      await handler(data, sock);
    } catch (error) {
      const stringifiedData = data ? truncateString(JSON.stringify(data), 200) : 'No data available';
      this.#errorHandler.handleError(error, { context: `EventHandler.#handleEvent - ${eventName}`, eventData: stringifiedData });
      
      // Usar sendNotification en lugar de notifyOwner
      if (OWNER_WHATSAPP_NUMBER) {
        this.#notificationService.sendNotification(
          `Error crítico en el evento: ${eventName}. Detalles: ${error.message}. Datos: ${stringifiedData}`,
          OWNER_WHATSAPP_NUMBER
        );
      }
    }
  }

  /**
   * Registra eventos que solo necesitan ser impresos para depuración.
   * @private
   */
  #registerPrintOnlyEvents(sock) {
    const eventsToLog = [
      'connection.update', 'creds.update', 'messages.update', 'presence.update',
      'chats.update', 'call', 'connection.phone-change', 'auth-state.update',
      'message-receipt.update', 'messages.delete', 'messages.clear', 'history.set',
      'contacts.upsert', 'blocklist.update', 'group-invite', 'group-revoke-invite-link',
      'group-announce', 'app-state.update', 'battery.status', 'battery.low',
      'status.upsert', 'stories.upsert', 'status.delete', 'call-state.update',
      'group-call', 'group-call-participants.update'
    ];

    for (const eventName of eventsToLog) {
      sock.ev.on(eventName, (data) => this.#printEvent(eventName, data, { sock, logger: this.#logger }));
    }
  }
}

export default EventHandler;