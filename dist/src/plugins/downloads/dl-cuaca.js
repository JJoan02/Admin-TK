// dl-cuaca.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dlcuacaPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'cuaca',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'cuaca <parámetros>',
            aliases: ["weather"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                if (!args[0])
                    return await reply('🧭 ¿Para qué lugar quieres consultar el clima?\nEjemplo: _.cuaca Caracas_ ');
                const lugar = args.join(' ');
                const resultado = await clima.ejecutar(lugar);
                await await reply(resultado);
            }
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
        const plugin = new CuacaPlugin();
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
    command = [["weather"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=dl-cuaca.js.map