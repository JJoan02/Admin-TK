// game-apostar.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameapostarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'apostar',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'apostar <parámetros>',
            aliases: ["casino"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = await this.database.getData().users[m.sender];
            let randomaku = `${Math.floor(Math.random() * 101)} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=game-apostar.js.map