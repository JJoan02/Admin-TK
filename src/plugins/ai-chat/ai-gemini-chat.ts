// ai-gemini-chat.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aigeminichatPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'gemini',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'gemini <parámetros>',
      aliases: ["geminis","imgia","imagina"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let q = m.quoted || m
        let mime = (q.msg || q).mimetype || ''
        let hasImage = /^image\/(jpe?g|png)$/.test(mime)
      
        if (!text && !hasImage) {
          return await reply(m.chat, `💡 Envía o responde a una imagen con una pregunta, o escribe un prompt para generar una imagen.\n\nEjemplo:\n${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new GeminiPlugin();
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

handler.command = [["geminis","imgia","imagina"]];

export default handler;
