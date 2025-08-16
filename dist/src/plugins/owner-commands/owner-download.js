// owner-download.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownerdownloadPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'unknown',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'unknown <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const helpMessage = `
      > *Fantasy - Agregar personaje*
      
      _Este comando te permite agregar nuevos personajes a la base de datos._
      
      *Uso:*
      \`${usedPrefix + command} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=owner-download.js.map