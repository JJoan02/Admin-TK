// ai-precios2.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aiprecios2Plugin extends BasePlugin {
  constructor() {
    super({
      name: 'precios2',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'precios2 <parámetros>',
      aliases: ["p2"],
      permissions: ['group'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      // React con un emoji al mensaje
          await m.react('⭐');
      
          // Mensaje que se enviará
          const message = `
      *¡AQUÍ ESTÁN LOS PRECIOS!*
      
      1 BOT = 3$
      2 BOT = 6$
      3 BOT = 9$
      4 BOT = 12$
      5 BOT = 15$
      
      > Bot Para Grupos ⭐`;
      
          if (m.isGroup) {
              // URL de la imagen
              const imageUrl ='https://qu.ax/iVZTn.jpg'; // Cambia esta URL por la de la imagen que deseas enviar
      
              // Envía la imagen con el mensaje
              await conn.sendMessage(m.chat, { image: { url: imageUrl
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new Precios2Plugin();
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

handler.command = [["p2"]];
handler.group = true;

export default handler;
