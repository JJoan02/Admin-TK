import os from 'os';

export class MonitoringService {
    constructor(webServer, logger) {
        this.webServer = webServer;
        this.logger = logger;
        this.interval = null;
        this.interactionCounter = 0;
    }

    startMonitoring(intervalMs = 5000) {
        this.logger.info('Iniciando monitoreo de sistema y simulación de interacciones.');
        this.interval = setInterval(() => {
            this.collectAndSendMetrics();
            this.simulateRecentInteraction();
        }, intervalMs);
    }

    stopMonitoring() {
        if (this.interval) {
            clearInterval(this.interval);
            this.logger.info('Monitoreo de sistema detenido.');
        }
    }

    collectAndSendMetrics() {
        // Simulación de uso de CPU y RAM
        const cpuUsage = Math.floor(Math.random() * 50) + 10; // 10-60%
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemoryGB = (totalMemory - freeMemory) / (1024 * 1024 * 1024);
        const totalMemoryGB = totalMemory / (1024 * 1024 * 1024);

        this.webServer.sendRealtimeUpdate('system_metrics', {
            cpu: cpuUsage,
            ram: parseFloat(usedMemoryGB.toFixed(2)),
            totalRam: parseFloat(totalMemoryGB.toFixed(2))
        });
    }

    simulateRecentInteraction() {
        this.interactionCounter++;
        const messages = [
            "¿Cómo puedo reiniciar mi servidor?",
            "Para reiniciar tu servidor, escribe: /server restart",
            "¿Qué comandos están disponibles?",
            "Escribe /help para ver todos los comandos disponibles",
            "Necesito ayuda con la configuración de mi bot.",
            "Claro, ¿qué problema específico tienes?",
            "Mi servidor está lento, ¿puedes revisarlo?",
            "Estoy verificando el estado de tu servidor."
        ];
        const senders = ["Juan Pérez", "Ana Gómez", "Carlos Ruiz", "Bot"];
        const fromBot = this.interactionCounter % 2 === 0; // Alternar entre usuario y bot

        const interaction = {
            sender: fromBot ? 'Bot' : senders[Math.floor(Math.random() * (senders.length - 1))],
            time: new Date().toLocaleTimeString(),
            message: messages[Math.floor(Math.random() * messages.length)],
            from: fromBot ? 'bot' : 'user'
        };

        this.webServer.sendRealtimeUpdate('recent_interaction', { interaction });
    }
}

export default MonitoringService;
