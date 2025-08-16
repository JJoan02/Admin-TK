// owner-minar.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownerminarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'minar',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'minar <parámetros>',
            aliases: ["miming", "mine"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = await this.database.getData().users[m.sender];
            let chocolates = `${pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=owner-minar.js.map