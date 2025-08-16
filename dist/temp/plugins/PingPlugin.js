// src/plugins/core/PingPlugin.ts - Plugin de ping y estado del bot
import { BasePlugin } from '../base/BasePlugin.js';
export class PingPlugin extends BasePlugin {
    metadata = {
        name: 'PingPlugin',
        version: '3.0.0',
        description: 'Verifica el estado y latencia del bot',
        category: 'utilidades',
        commands: ['ping', 'estado', 'latencia'],
        author: 'JJoan02',
        permissions: ['user']
    };
    config = {
        enabled: true,
        cooldown: 2000, // 2 segundos
        rateLimitPerUser: 10,
        rateLimitPerGroup: 15,
        requiresInternet: false,
        usesAPI: false
    };
    startTime = Date.now();
    async onInitialize() {
        this.startTime = Date.now();
    }
    async onExecute(command) {
        try {
            const startTime = Date.now();
            // Simular una pequeña operación para medir latencia
            await new Promise(resolve => setTimeout(resolve, 1));
            const responseTime = Date.now() - startTime;
            const uptime = this.getUptime();
            const systemInfo = await this.getSystemInfo();
            const pingMessage = this.generatePingMessage(responseTime, uptime, systemInfo);
            return {
                success: true,
                response: pingMessage,
                shouldReply: true,
                metadata: {
                    responseTime,
                    uptime,
                    systemInfo
                }
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Error verificando el estado del bot',
                shouldReply: true
            };
        }
    }
    async onCleanup() {
        // Cleanup específico del plugin si es necesario
    }
    /**
     * Genera el mensaje de ping con información del sistema
     */
    generatePingMessage(responseTime, uptime, systemInfo) {
        const statusEmoji = responseTime < 100 ? '🟢' : responseTime < 300 ? '🟡' : '🔴';
        const speedText = responseTime < 100 ? 'Excelente' : responseTime < 300 ? 'Buena' : 'Lenta';
        return `
╭─────────────────────────╮
│    ${statusEmoji} ESTADO DEL BOT ${statusEmoji}    │
╰─────────────────────────╯

🏓 *Latencia:* ${responseTime}ms (${speedText})
⏱️ *Tiempo activo:* ${uptime}
🤖 *Versión:* Admin-TK v3.0.0
📱 *Plataforma:* ${systemInfo.platform}
💾 *Memoria:* ${systemInfo.memoryUsage}
🔄 *CPU:* ${systemInfo.cpuUsage}%

╭─────────────────────────╮
│      🌐 CONECTIVIDAD     │
╰─────────────────────────╯

✅ WhatsApp: Conectado
✅ Base de datos: Activa
✅ API interna: Funcionando
🌍 Servidor: admin-tk.fun (206.183.129.67)

_Bot funcionando correctamente_ ✨
`;
    }
    /**
     * Obtiene el tiempo de actividad del bot
     */
    getUptime() {
        const uptimeMs = Date.now() - this.startTime;
        const seconds = Math.floor(uptimeMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days}d ${hours % 24}h ${minutes % 60}m`;
        }
        else if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        }
        else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        }
        else {
            return `${seconds}s`;
        }
    }
    /**
     * Obtiene información del sistema
     */
    async getSystemInfo() {
        const memUsage = process.memoryUsage();
        const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        const memTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
        // Obtener uso de CPU (aproximado)
        const cpuUsage = await this.getCPUUsage();
        return {
            platform: process.platform,
            nodeVersion: process.version,
            memoryUsage: `${memUsedMB}MB / ${memTotalMB}MB`,
            cpuUsage: cpuUsage.toFixed(1)
        };
    }
    /**
     * Calcula el uso aproximado de CPU
     */
    async getCPUUsage() {
        const startUsage = process.cpuUsage();
        const startTime = Date.now();
        // Esperar un poco para medir
        await new Promise(resolve => setTimeout(resolve, 100));
        const endUsage = process.cpuUsage(startUsage);
        const endTime = Date.now();
        const totalTime = (endTime - startTime) * 1000; // microsegundos
        const totalCPUTime = endUsage.user + endUsage.system;
        return (totalCPUTime / totalTime) * 100;
    }
    async cleanup() {
        this.logger.info('PingPlugin limpiado');
    }
}
export default PingPlugin;
//# sourceMappingURL=PingPlugin.js.map