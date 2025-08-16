// util-iqc.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class utiliqcPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'iqc',
            category: 'utility-tools',
            description: 'Herramientas de utilidad',
            usage: 'iqc <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply('📌 Ejemplo de uso:\n.iqc Pollo frito con papas');
            let hora = new Intl.DateTimeFormat('es-ES', {
                timeZone: 'America/Caracas', // Puedes ajustarlo a tu zona
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            try { }
            catch (error) {
                console.error(`Error en ${this.name}:`, error);
                await reply('❌ Ocurrió un error al ejecutar el comando');
            }
        }
        finally {
        }
    }
    // Exportar para compatibilidad con sistema legacy
    handler = async (m, { conn, text, usedPrefix, command }) => {
        const plugin = new IqcPlugin();
        await plugin.execute({
            message: m,
            args: text?.split(' ') || [],
            reply: (msg) => conn.reply(m.chat, msg, m),
            conn,
            text,
            usedPrefix,
            command
        });
    };
    handler;
    command = ['iqc'];
    export;
    default;
    handler;
}
//# sourceMappingURL=util-iqc.js.map