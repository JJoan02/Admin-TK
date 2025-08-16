// search-sonu.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class searchsonuPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'sonu',
            category: 'search-tools',
            description: 'Herramientas de búsqueda',
            usage: 'sonu <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                if (!text.includes('|'))
                    return await reply(`Ejemplo de uso:\n.sonu título | letra | estado de ánimo | género | voz`);
                let [titulo, letra, estado, genero, voz] = text.split('|').map(v => v.trim());
                if (!titulo)
                    return await reply('⚠️ El título de la canción no puede estar vacío.');
                if (!letra)
                    return await reply('⚠️ Falta la letra de la canción.');
                if (letra.length > 1500)
                    return await reply('⚠️ La letra no puede superar los 1500 caracteres.');
                await reply('⏳ Generando canción, espera un momento...');
                const deviceId = uuidv4();
                const userHeaders = {
                    'user-agent': 'NB Android/1.0.0',
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'x-platform': 'android',
                    'x-app-version': '1.0.0',
                    'x-country': 'VE',
                    'accept-language': 'es-ES',
                    'x-client-timezone': 'America/Caracas',
                };
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
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new SonuPlugin();
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
        handler.command = ['sonu'];
        export default handler;
    }
}
//# sourceMappingURL=search-sonu.js.map