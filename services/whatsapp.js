const { initializeLogger } = require('../utils/logger');
const logger = initializeLogger();

class WhatsAppService {
  constructor(whatsappClient) {
    this.whatsappClient = whatsappClient; // La instancia de sock de Baileys
    this.logger = logger;
  }

  async sendMessage(number, message) {
    if (!this.whatsappClient) {
      this.logger.error('WhatsApp client no está inicializado. No se puede enviar el mensaje.');
      return false;
    }
    try {
      // Asegurarse de que el número tenga el formato correcto (ej. 51912345678@c.us)
      const jid = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;
      await this.whatsappClient.sendMessage(jid, { text: message });
      this.logger.info(`Mensaje enviado a ${number}: ${message}`);
      return true;
    } catch (error) {
      this.logger.error({ error }, `Error al enviar mensaje a ${number}: ${error.message}`);
      return false;
    }
  }
}

module.exports = WhatsAppService;
