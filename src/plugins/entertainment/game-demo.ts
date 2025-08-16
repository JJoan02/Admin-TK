// game-demo.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gamedemoPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'demo',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'demo <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) throw '¿Cómo puedo ayudarte hoy?';
          try {
              await reply(m.chat, m);
              let data = await chatGpt(text)
      await conn.sendMessage(m.chat, { 
          text: '*Demo:* ' + data,
          contextInfo: {
              forwardingScore: 9999999,
              isForwarded: false, 
              externalAdReply: {
                  showAdAttribution: true,
                  containsAutoReply: true,
                  title: `[ 𝗖𝗛𝗔𝗧𝗚𝗣𝗧 - 𝗗𝗘𝗠𝗢 ]`,
                  body: dev,
                  previewType: "PHOTO",
                  thumbnailUrl: 'https://tinyurl.com/2awg2bch', 
                  sourceUrl: channels,
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DemoPlugin();
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

handler.command = ['demo'];

export default handler;
