// info-xvideosearch.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class infoxvideosearchPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'xvideosearch',
      category: 'bot-info',
      description: 'Información del bot',
      usage: 'xvideosearch <parámetros>',
      aliases: ["xvideosearch"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!db.data.chats[m.chat].nsfw && m.isGroup) return await reply(m.chat, '🚩 *¡Estos comandos están desactivados!*', m, fake);
        if (!text) return await reply(m.chat, 'Ingresa el texto de lo que quieres buscar en Xvideo 🤍', m, rcanal);
        await m.react('🕓');
        try {
          async function createImage(url) {
            const { imageMessage
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new XvideosearchPlugin();
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

handler.command = [["xvideosearch"]];

export default handler;
