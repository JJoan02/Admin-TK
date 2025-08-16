// tool-convert-to-image.ts - Plugin mejorado y optimizado
// Categoría: media-tools
// Funcionalidad: Herramientas multimedia y conversores
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class toolconverttoimagePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'toimg',
            category: 'media-tools',
            description: 'Herramientas multimedia y conversores',
            usage: 'toimg <parámetros>',
            aliases: ["img", "jpg"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const notStickerMessage = `Hubo un Error *${usedPrefix + command} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=tool-convert-to-image.js.map