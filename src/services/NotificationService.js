class NotificationService {
    constructor(config, logger, whatsappClient) {
        this.config = config;
        this.logger = logger;
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
}

export default NotificationService;
