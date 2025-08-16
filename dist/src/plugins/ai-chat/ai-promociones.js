// ai-promociones.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aipromocionesPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'promociones',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'promociones <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const imageUrl = 'https://files.catbox.moe/x48r2q.jpeg'; // URL de la imagen promocional
            const text = `
      🎉 *Promociones Actuales en TK-HOST* 🏷️
      
      💎 *Ofertas exclusivas en planes y TK-Coins*:
      
      🔹 *Planes de Hosting:*
         - 🌟 20% de descuento en planes anuales.
         - 🌟 1 fotopata de mi prima si compran.
      
      🔹 **TK-Coins:**
         - $2.43: 500 +10% TK-Coins.
         - $4.55: 1000 +10% TK-Coins.
         - $6.66: 1500 +10% TK-Coins.
         - $8.77: 2000 +10% TK-Coins.
         - $10.89: 2500 +10% TK-Coins.
         - $21.46: 5000 +12% TK-Coins.
         - $42.60: 10,000 +15% TK-Coins.
      
      📍 *Promoción válida hasta el 31 de diciembre*.
      
      ✨ Más información y compras en: 
      > [Tienda TK-HOST]
      > (https://dash.tk-joanhost.com/store)
      
      🚀 ¡Aprovecha ahora y haz crecer tu proyecto con nosotros!
        `.trim();
            await conn.sendFile(m.chat, imageUrl, 'promociones.jpg', text, m);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new PromocionesPlugin();
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
handler.command = ['promociones'];
export default handler;
//# sourceMappingURL=ai-promociones.js.map