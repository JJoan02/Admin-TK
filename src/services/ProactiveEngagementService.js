// src/services/ProactiveEngagementService.js

// Mensajes predefinidos para cada nivel de proactividad
const proactiveMessages = [
  "¡Hola! 👋 Ha pasado un tiempo. ¿Cómo has estado?",
  "Solo pasaba a saludar. ¡Espero que todo vaya genial! 😊",
  "¿Todo bien por aquí? Si necesitas algo o simplemente quieres charlar, aquí estoy. ✨",
  "¡Hey! Te echo de menos. ¿Alguna novedad interesante que contar? 👀",
  "Este es mi último intento por hoy. ¡Espero que estés teniendo un día increíble! Si quieres hablar, ya sabes dónde encontrarme. 🚀"
];

class ProactiveEngagementService {
  #config;
  #logger;
  #chatManager;
  #dbService; // Necesitamos dbService para las consultas directas

  constructor(config, logger, chatManager, dbService) {
    this.#config = config;
    this.#logger = logger;
    this.#chatManager = chatManager;
    this.#dbService = dbService;
    this.#logger.info('ProactiveEngagementService inicializado.');
  }

  /**
   * Revisa todos los chats privados y envía mensajes proactivos si es necesario.
   * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
   */
  async checkAndSend(sock) {
    this.#logger.info('🏃‍♂️ Ejecutando revisión de interacción proactiva.');
    const db = this.#dbService.getDB();

    try {
      const chats = await db.all(
        "SELECT * FROM chats WHERE isAiEnabled = 1 AND jid NOT LIKE '%@g.us%'"
      );
      const intervals = (this.#config.proactiveIntervals || '1,2,4,6,11')
        .split(',')
        .map(Number);

      for (const chat of chats) {
        const now = new Date();
        const lastInteraction = new Date(chat.lastInteraction);
        const hoursDiff = (now - lastInteraction) / (1000 * 60 * 60);

        const currentLevel = chat.proactive_message_level || 0;

        // Si ya hemos enviado todos los mensajes, no hacer nada más.
        if (currentLevel >= intervals.length) continue;

        const requiredHours = intervals[currentLevel];

        if (hoursDiff >= requiredHours) {
          const messageToSend = proactiveMessages[currentLevel];
          this.#logger.info(
            `💬 Enviando mensaje proactivo nivel ${currentLevel + 1} a ${chat.jid}. Han pasado ${hoursDiff.toFixed(2)} horas.`
          );

          try {
            await sock.sendMessage(chat.jid, { text: messageToSend });
            // Incrementar el nivel después de enviar el mensaje
            await this.#chatManager.updateChat(chat.jid, { proactive_message_level: currentLevel + 1 });
          } catch (error) {
            this.#logger.error({ err: error, jid: chat.jid }, '❌ Error al enviar mensaje proactivo.');
          }
        }
      }
    } catch (error) {
      this.#logger.error({ err: error }, '❌ Error fatal durante la revisión de interacción proactiva.');
    }
  }
}

export default ProactiveEngagementService;