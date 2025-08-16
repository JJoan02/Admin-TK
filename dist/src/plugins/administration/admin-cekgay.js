// admin-cekgay.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class admincekgayPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'cekgay',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'cekgay <parámetros>',
            aliases: ["gay2"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let who = m.mentionedJid?.[0]
                ? m.mentionedJid[0]
                : m.quoted
                    ? m.quoted.sender
                    : m.sender;
            let nro = Math.floor(Math.random() * 101); // Valor entre 0 y 100
            let mensaje = `@${who.split("@")[0]} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=admin-cekgay.js.map