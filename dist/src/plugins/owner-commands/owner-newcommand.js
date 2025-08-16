// owner-newcommand.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownernewcommandPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'newcommand',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'newcommand <parámetros>',
            aliases: ["sug"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply(m.chat, '🚩 Que comando quieres sugerir?', m);
            if (text.length < 10)
                return await reply(m.chat, '🚩 La sugerencia debe ser mas de 10 character.', m);
            if (text.length > 1000)
                return await reply(m.chat, '🚩 Maximo de la sugerencia es de 1000 character.', m);
            const teks = `🚩 Sugerencia de un nuevo comando del usuario *${nombre} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=owner-newcommand.js.map