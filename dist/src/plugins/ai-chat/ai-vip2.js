// ai-vip2.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aivip2Plugin extends BasePlugin {
    constructor() {
        super({
            name: 'vip2',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'vip2 <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const imageUrls = [
                'https://files.catbox.moe/7x0gvu.jpeg',
                'https://files.catbox.moe/mrlhnr.jpeg',
                'https://files.catbox.moe/irsabw.jpeg'
            ];
            const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            const text = `
      🌟 *Plan TK-Vip2* 🌟
      
      📊 *Especificaciones del Plan*:
      - *CPU*: 1.75 vCores  
      - *RAM*: 1500 MB  
      - *Disco*: 6000 MB  
      - *Bases de datos MySQL*: 1  
      
      📝 *Descripción*:  
      Plan diseñado para bots avanzados con capacidad para manejar múltiples conexiones.
      
      💰 *Requisitos*:
      - *TK-Coins requeridos*: 250  
      - *Precio total (TK-Coins)*: 500.00  
      
      ⚙️ *Características Adicionales*:
      - Soporte para la creación de servidores *JavaScript*.  
      - Implementación de *Prebots Oficiales*.  
      
      📍 Consiguelo ahora
      > (https://dash.tk-joanhost.com/servers/create).  
      
      💡 ¡Lleva tu bot al siguiente nivel con el Plan TK-Vip2! 🚀
        `.trim();
            await conn.sendFile(m.chat, randomImageUrl, 'tk-vip2.jpg', text, m, null, fake);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new Vip2Plugin();
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
handler.command = ['vip2'];
export default handler;
//# sourceMappingURL=ai-vip2.js.map