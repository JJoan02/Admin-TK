// ai-cleartmp.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aicleartmpPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'cleartmp',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'cleartmp <parámetros>',
            aliases: ["borrartmp", "borrarcarpetatmp", "vaciartmp"],
            permissions: ['owner'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            await reply(m.chat, `🚩 Realizado, ya se ha eliminado los archivos de la carpeta tmp`, m, rcanal);
            const tmp = [tmpdir(), join(__dirname, '../megumin/tmp')];
            const filename = [];
            tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))));
            return filename.map(file => {
                const stats = statSync(file);
                unlinkSync(file);
            });
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
        const plugin = new CleartmpPlugin();
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
    command = [["borrartmp", "borrarcarpetatmp", "vaciartmp"]];
    handler;
    rowner = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-cleartmp.js.map