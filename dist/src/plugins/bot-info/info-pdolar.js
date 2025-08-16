// info-pdolar.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infopdolarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'pdolar',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'pdolar <parámetros>',
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
      🌐 *Precios de TK-Coins* 💰
      
      Estos son los paquetes disponibles:  
      
      🔗 💵 *$2.43* - 550 TK-Coins  
      > (https://dash.tk-joanhost.com/checkout/VZJ5Ztji9vxIdMLdZKxE1)
      
      🔗 💵 *$4.55* - 1100 TK-Coins  
      > (https://dash.tk-joanhost.com/checkout/0UeWPiZm6HQoYkykj3Sjw)
      
      🔗 💵 *$6.66* - 1650 TK-Coins  
      > (https://dash.tk-joanhost.com/checkout/KPLsZompbqXpC_zzLnamv)
      
      🔗 💵 *$8.77* - 2200 TK-Coins  
      > (https://dash.tk-joanhost.com/checkout/Xo8MdwPY-JF66KmKVj0ad)
      
      🔗 💵 *$10.89* - 2500 TK-Coins  
      > (https://dash.tk-joanhost.com/checkout/YJAuZCsn7BcjjR3UCa6ov)
      
      🔗 💵 *$21.46* - 5600 TK-Coins  
      > (https://dash.tk-joanhost.com/checkout/HLxPvvhVLs0Dc5JUpLUk3)
      
      🔗 💵 *$42.60* - 11,500 TK-Coins 
      > (https://dash.tk-joanhost.com/checkout/DcbIC-I2ONZDozRzfOZOo)
      
      Selecciona el paquete que más te convenga y aprovecha los bonos ya incluidos. 🚀
        `.trim();
            await conn.sendFile(m.chat, imageUrl, 'tk-coins.jpg', text, m);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new PdolarPlugin();
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
handler.command = ['pdolar'];
export default handler;
//# sourceMappingURL=info-pdolar.js.map