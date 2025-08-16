import { initializeLogger } from '../utils/logger.js';

export class NotificationService {
    constructor(config, logger, whatsappClient) {
        this.config = config;
        this.logger = logger || initializeLogger();
        this.whatsappClient = whatsappClient; // Inyectar el cliente de WhatsApp
    }

    sendNotification(message, recipient) {
        this.logger.info(`Sending notification: ${message} to ${recipient}`);
        if (this.whatsappClient && recipient) {
            this.whatsappClient.sendMessage(recipient, message)
                .then(() => this.logger.info(`Mensaje de WhatsApp enviado a ${recipient}`)) 
                .catch(err => this.logger.error(`Error al enviar mensaje de WhatsApp a ${recipient}: ${err.message}`));
        } else {
            this.logger.warn(`No se pudo enviar la notificación. Cliente de WhatsApp no disponible o destinatario no especificado.`);
        }
    }

    // Método estático para notificar al owner (usado en index.js)
    static async notifyOwner(title, error, details = '') {
        const logger = initializeLogger();
        logger.error(`[OWNER NOTIFICATION] ${title}: ${error?.message || error}`);
        if (details) {
            logger.error(`[DETAILS] ${details}`);
        }
        
        // Aquí se podría implementar notificación real al owner cuando el bot esté conectado
        // Por ahora solo loggeamos el error
        return Promise.resolve();
    }
}

export default NotificationService;
