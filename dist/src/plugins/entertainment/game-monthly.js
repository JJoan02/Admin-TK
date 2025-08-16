// game-monthly.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamemonthlyPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'monthly',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'monthly <parámetros>',
            aliases: ["cadames", "mes", "mensual", "entregadelmes"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = await this.database.getData().users[m.sender];
            let premium = user.premium;
            let limit = `${pickRandom([15, 23, 29, 36, 42, 50, 59, 65, 70, 83])} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=game-monthly.js.map