// info-psoles.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infopsolesPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'psoles',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'psoles <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const imageUrl = 'https://files.catbox.moe/r8gcdz.jpeg'; // URL de la imagen
            const text = `
      🌐 *Precios de TK-Coins* 💰 (Precios en soles - S/.)
      
      Estos son los paquetes disponibles:  
      
      🔗 💵 *S/ 4* - 250 TK-Coins  
      🔗 💵 *S/ 8* - 550 TK-Coins  
      🔗 💵 *S/ 16* - 1100 TK-Coins  
      🔗 💵 *S/ 24* - 1650 TK-Coins  
      🔗 💵 *S/ 32* - 2200 TK-Coins  
      🔗 💵 *S/ 40* - 2500 TK-Coins  
      🔗 💵 *S/ 80* - 5600 TK-Coins  
      🔗 💵 *S/ 160* - 11,500 TK-Coins  
      
      Selecciona el paquete que más te convenga y aprovecha los bonos ya incluidos. 🚀
      
      💳 *Formas de Pago para Usuarios en Perú*:
      1️⃣ Yape: *927803866*  
      2️⃣ Plin: *976673519*  
      3️⃣ Transferencia Bancaria (BCP, Interbank, BBVA).    
      
      Contáctanos para más detalles sobre tu método de pago preferido. 🛒
        `.trim();
            await conn.sendFile(m.chat, imageUrl, 'tk-coins.jpg', text, m, null, fake);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new PsolesPlugin();
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
handler.command = ['psoles'];
export default handler;
//# sourceMappingURL=info-psoles.js.map