// dl-creador.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dlcreadorPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'creador',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'creador <parámetros>',
            aliases: ["creator", "owner", "propietario", "dueño"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let creadorID = '5351524614@s.whatsapp.net';
            let isInGroup = m.isGroup && (await conn.groupMetadata(m.chat)).participants.some(p => p.id === creadorID);
            let numeroTexto = isInGroup ? `@${creadorID.split('@')[0]} catch (error) {
      console.error(` : , Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=dl-creador.js.map