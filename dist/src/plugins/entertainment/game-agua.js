// game-agua.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameaguaPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'agua',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'agua <parámetros>',
            aliases: ["pasear", "viajar", "acariciar"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = await this.database.getData().users[m.sender];
            if (!user.mascota)
                return await reply("❌ No tienes una mascota. Usa *.comprarmascota* para adoptar una.");
            let acciones = {
                agua: {
                    mensajes: [
                        "🚰 Tu mascota tomó agua 💧 y se siente refrescada.",
                        "💦 Tu mascota bebió agua y ahora está llena de energía.",
                        "🌊 Tu mascota jugó con el agua antes de beberla, ¡qué divertido!",
                        "🏞️ Encontraste un río y tu mascota disfrutó bebiendo agua fresca.",
                        "🥤 Tu mascota tomó agua en su tazón favorito, ¡le encantó!"
                    ],
                    emoji: "💧"
                }, catch(error) {
                    console.error(`Error en ${this.name}:`, error);
                    await reply('❌ Ocurrió un error al ejecutar el comando');
                }
            };
        }
        // Exportar para compatibilidad con sistema legacy
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new AguaPlugin();
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
        handler.command = [["pasear", "viajar", "acariciar"]];
        export default handler;
    }
}
//# sourceMappingURL=game-agua.js.map