// ai-prebots.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aiprebotsPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'prebots',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'prebots <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      const imageUrl = 'https://files.catbox.moe/p48khr.jpeg'; // URL de la imagen
        const text = `
      🌐 *Prebots Disponibles en TK-Host* 🖥️
      
      Aquí tienes la lista completa de los prebots que puedes utilizar:
      
      🌟 *Lista de Prebots Disponibles* 🌟
      
      1. KatashiBot-MD (TK-Oficial)
      2. Admin-TK (TK-Oficial)
      3. GenesisBot-MD (TK-Oficial)
      4. Megumin-MD
      5. Waguri-Ai
      6. Ai-hoshino
      7. CrowBot-Ai
      8. Kakaroto-Bot-MD
      9. Yuki_Suou-Bot
      10. Sylph | Wa Bot
      
      🔗 *Crea tu servidor con tu prebot favorito aquí:*
      > (https://dash.tk-joanhost.com/servers/create)
      
      ¡Selecciona tu prebot favorito y comienza a configurarlo ahora mismo!
      
        `.trim();
        await conn.sendFile(m.chat, imageUrl, 'pagina-panel.jpg', text, m, null, fake);
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new PrebotsPlugin();
  await plugin.execute({
    message: m,
    args: text?.split(' ') || [],
    reply: (msg: string) => conn.reply(m.chat, msg, m),
    conn,
    text,
    usedPrefix,
    command
  });
};

handler.command = ['prebots'];

export default handler;
