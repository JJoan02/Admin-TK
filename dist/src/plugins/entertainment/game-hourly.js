// game-hourly.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamehourlyPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'hourly',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'hourly <parámetros>',
            aliases: ["entega", "cadahora", "recibirentrega"],
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
            let botol = `${pickRandom([1, 1, 2, 3, 3, 0, 0])} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=game-hourly.js.map