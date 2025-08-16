// game-topmascota.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gametopmascotaPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'topmascota',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'topmascota <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const mascotas = [
                { nombre: "Perro", puntos: 1000
                }
            ];
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
        const plugin = new TopmascotaPlugin();
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
    command = ['topmascota'];
    export;
    default;
    handler;
}
//# sourceMappingURL=game-topmascota.js.map