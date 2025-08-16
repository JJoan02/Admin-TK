import baileys from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import qrcodeTerminal from 'qrcode-terminal';
import qrcode from 'qrcode'; // Importar qrcode
import whatsappConfig from '../../config/whatsappConfig.js';
import StateManager, { BotState } from './StateManager.js';
import EventBus from './EventBus.js';
import { sleep } from '../utils/helpers.js';

const { makeWASocket, DisconnectReason, Browsers } = baileys;

export class ConnectionManager {
  sock = null;
  #sessionManager;
  #eventHandler;
  #logger;
  #config;
  #resolveConnectionPromise = () => {};
  #rejectConnectionPromise = () => {};
  #connectionAttempt = 0;
  #maxConnectionAttempts = 5; // Número máximo de reintentos
  #currentOptions = {}; // Para almacenar las opciones del intento actual
  #lastQr = null; // Para almacenar el último QR generado

  constructor(sessionManager, eventHandler, logger, config) {
    this.#sessionManager = sessionManager;
    this.#eventHandler = eventHandler;
    this.#logger = logger;
    this.#config = config;
  }

  async connect(options = {}) {
    // Si ya estamos conectados o intentando conectar con las mismas opciones, ignorar.
    if (StateManager.is(BotState.CONNECTING) || StateManager.is(BotState.READY)) {
      if (JSON.stringify(options) === JSON.stringify(this.#currentOptions)) {
        this.#logger.warn('⚠️ Ya hay un intento de conexión en curso o ya está conectado con las mismas opciones. Ignorando solicitud.');
        return;
      }
      // Si las opciones son diferentes, forzar desconexión y reintentar.
      this.#logger.warn('⚠️ Intentando nueva conexión con opciones diferentes. Forzando desconexión actual...');
      await this.disconnect();
    }

    StateManager.setState(BotState.CONNECTING);
    this.#connectionAttempt = 0; // Resetear contador de intentos
    this.#currentOptions = options; // Guardar las opciones actuales

    return new Promise(async (resolve, reject) => {
      this.#resolveConnectionPromise = resolve;
      this.#rejectConnectionPromise = reject;

      const connectInternal = async () => {
        this.#connectionAttempt++;
        if (this.#connectionAttempt > 1) {
          this.#logger.info(`Reintento de conexión #${this.#connectionAttempt}/${this.#maxConnectionAttempts}...`);
        }

        try {
          const { state, saveCreds } = await this.#sessionManager.loadAuth(options.sessionId);

          this.sock = makeWASocket({
            ...whatsappConfig,
            auth: state,
            printQRInTerminal: false,
            browser: Browsers.macOS('Desktop'),
            logger: pino({ level: 'silent' }), // Silenciar logs internos de Baileys
          });

          this.sock.ev.on('creds.update', saveCreds);
          this.sock.ev.on('connection.update', (update) => 
            this.#handleConnectionUpdate(update, options)
          );

          if (options.method === 'code' && options.phoneNumber && !this.sock.authState.creds.registered) {
            await this.#requestPairingCode(options.phoneNumber);
          }
        } catch (error) {
          this.#logger.error({ err: error }, 'Error al iniciar makeWASocket. Reintentando...');
          this.#handleConnectionClose(options, error); // Reutilizar lógica de cierre
        }
      };

      // Iniciar el primer intento de conexión
      await connectInternal();
    });
  }

  async #requestPairingCode(phoneNumber) {
    try {
      const code = await this.sock.requestPairingCode(phoneNumber);
      this.#logger.info(`> Tu código de vinculación es: ${code.match(/.{1,4}/g).join('-')}`);
      this.#logger.info('  Visita http://localhost:3000/ para ver el dashboard y los logs.');
    } catch (error) {
      this.#logger.error({ err: error }, 'Error al solicitar el código de emparejamiento.');
      this.#rejectConnectionPromise(new Error('Error al solicitar el código de emparejamiento.'));
    }
  }

  #handleConnectionUpdate = async (update, options) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr && options.method === 'qr') {
      this.#logger.info('⏳ Escanea el código QR en la consola o visita http://localhost:3000');
      qrcodeTerminal.generate(qr, { small: true });
      this.#logger.info('  Link para escanear en el navegador: http://localhost:3000/');
      
      // Generar Data URL del QR para el frontend
      const qrDataUrl = await qrcode.toDataURL(qr);
      this.#lastQr = qrDataUrl; // Almacenar el último QR
      EventBus.emit('qr.received', qrDataUrl);
    }

    if (connection === 'open') {
      StateManager.setState(BotState.READY);
      EventBus.emit('connection.open', this.sock);
      if (this.#eventHandler) {
        this.#eventHandler.register(this.sock);
      }
      this.#resolveConnectionPromise(this.sock);
    }

    if (connection === 'close') {
      this.#handleConnectionClose(options, lastDisconnect?.error);
    }
  };

  #handleConnectionClose = async (options, error) => {
    StateManager.setState(BotState.RECONNECTING);
    const boomError = new Boom(error);
    const statusCode = boomError.output?.statusCode;

    if (statusCode === DisconnectReason.loggedOut) {
      const loggedOutError = new Error('Logged Out');
      loggedOutError.sessionId = options.sessionId; // Adjuntar el ID de la sesión corrupta
      this.#rejectConnectionPromise(loggedOutError);
    } else {
      this.#logger.warn(`🔌 Conexión cerrada (Razón: ${statusCode || 'Desconocida'}).`);
      if (this.#connectionAttempt < this.#maxConnectionAttempts) {
        const delay = Math.pow(2, this.#connectionAttempt) * 1000; // Retraso exponencial
        this.#logger.info(`Reintento de conexión en ${delay / 1000} segundos...`);
        await sleep(delay);
        // Reintentar la conexión llamando a connect de nuevo
        this.connect(options).then(this.#resolveConnectionPromise).catch(this.#rejectConnectionPromise);
      } else {
        this.#logger.error(`❌ Falló la conexión después de ${this.#maxConnectionAttempts} intentos. Por favor, revisa tu conexión a internet o el estado de tu cuenta de WhatsApp.`);
        this.#rejectConnectionPromise(new Error(`Conexión fallida después de ${this.#maxConnectionAttempts} intentos.`));
      }
    }
  };

  async disconnect() {
    if (this.sock) {
      this.#logger.info('Desconectando de WhatsApp...');
      try {
        await this.sock.end();
        this.#logger.info('✅ Desconexión de WhatsApp completada.');
      } catch (error) {
        this.#logger.error({ err: error }, '❌ Error al desconectar de WhatsApp.');
      }
      this.sock = null;
      StateManager.setState(BotState.DISCONNECTED);
    }
  }

  async generateQrCode() {
    if (this.#lastQr) {
      return this.#lastQr;
    } else if (StateManager.is(BotState.DISCONNECTED) || StateManager.is(BotState.STARTING)) {
      // Si está desconectado o iniciando, intentar conectar para generar un QR
      this.#logger.info('Solicitando nueva conexión para generar QR...');
      try {
        await this.connect({ method: 'qr' });
        // Esperar un corto tiempo para que el QR se genere y se almacene
        await sleep(2000); 
        return this.#lastQr; // Devolver el QR que se generó
      } catch (error) {
        this.#logger.error({ err: error }, 'Error al intentar generar QR mediante nueva conexión.');
        return null;
      }
    } else {
      this.#logger.warn('No se puede generar QR en el estado actual del bot.');
      return null;
    }
  }
}

export default ConnectionManager;