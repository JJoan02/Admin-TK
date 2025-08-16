// admin-desbanearuser.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class admindesbanearuserPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'desbanearuser',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'desbanearuser <parámetros>',
            aliases: ["desbanearusuario", "desbanear"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            function no(number) {
                return number.replace(/\s/g, '').replace(/([@+-])/g, '');
            }
            try { }
            catch (error) {
                console.error(`Error en ${this.name}:`, error);
                await reply('❌ Ocurrió un error al ejecutar el comando');
            }
        }
        finally {
        }
    }
    // Exportar para compatibilidad con sistema legacy
    handler = async (m, { conn, text, usedPrefix, command }) => {
        const plugin = new DesbanearuserPlugin();
        await plugin.execute({
            message: m,
            args: text?.split(' ') || [],
            reply: (msg) => conn.reply(m.chat, msg, m),
            conn,
            text,
            usedPrefix,
            command
        });
    };
    handler;
    command = [["desbanearusuario", "desbanear"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=admin-desbanearuser.js.map