// admin-reporte.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminreportePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'reporte',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'reporte <parámetros>',
            aliases: ["report", "reportar", "bug", "error"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                throw '⚠ *_️Ingrese el error ue desea reportar._*';
            if (text.length < 10)
                throw '⚠️ *_Especifique bien el error, mínimo 10 caracteres._*';
            if (text.length > 1000)
                throw '⚠️ *_Máximo 1000 caracteres para enviar el error._*';
            const teks = `╭───────────────────\n│⊷〘 *R E P O R T E* 🤍 〙⊷\n├───────────────────\n│⁖🧡꙰  *Cliente:*\n│✏️ Wa.me/${m.sender.split `@`[0]} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=admin-reporte.js.map