// ai-panel.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aipanelPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'panel',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'panel <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const imageUrl = 'https://files.catbox.moe/ea82hr.jpeg'; // URL de la imagen
            const text = `
      🌐 *Panel de Gestión de Servidores* 🛠️
      
      🔗 [Acceder al Panel de Gestión]
      > (https://panel.tk-joanhost.com)
      
      📌 *Funciones disponibles*:  
      - 🔧 *Gestionar servidores*: Revisa el estado y controla tus servicios.  
      - ✏️ *Editar archivos*: Modifica configuraciones y archivos fácilmente.  
      - 🔄 *Reinstalar servidor*: Restablece tu servidor en caso necesario.  
      - 📊 *Estadísticas y monitoreo**: Verifica el rendimiento en tiempo real.
        `.trim();
            await conn.sendFile(m.chat, imageUrl, 'panel-gestion.jpg', text, m, null, fake);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new PanelPlugin();
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
handler.command = ['panel'];
export default handler;
//# sourceMappingURL=ai-panel.js.map