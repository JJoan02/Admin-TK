// util-skiplink.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class utilskiplinkPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'skiplink',
            category: 'utility-tools',
            description: 'Herramientas de utilidad',
            usage: 'skiplink <parámetros>',
            aliases: ["skiplinksub4unlock"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply(`Contoh : .skiplink https://sub4unlock.co/S9oU0`);
            await reply('wett');
            try {
                let api = `https://fgsi.koyeb.app/api/tools/skip/sub4unlock?apikey=APIKEY&url=${encodeURIComponent(text)} catch (error) {
      console.error(`, Error, en, $, { this: , name };
            }
            finally { }
        }
        finally { }
    }
}
//# sourceMappingURL=util-skiplink.js.map