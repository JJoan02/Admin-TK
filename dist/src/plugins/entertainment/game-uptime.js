// game-uptime.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameuptimePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'uptime',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'uptime <parámetros>',
            aliases: ["runtime"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let uptime = await process.uptime();
            let runtime = `${global.packname} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=game-uptime.js.map