// jadibot-suno.ts - Plugin mejorado y optimizado
// Categoría: jadibot-system
// Funcionalidad: Sistema de sub-bots
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class jadibotsunoPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'suno',
      category: 'jadibot-system',
      description: 'Sistema de sub-bots',
      usage: 'suno <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) return await reply(`Ejemplo:.suno canción sobre lo que siento por ella, cantante masculino, estilo lofi relajado`)
          await reply('🔄 Generando...')
          try {
              let result = await suno(text)
      
              if (!result?.data?.length) return await reply('❌ No se pudo obtener la canción')
      
              let audioUrl = result.data[0].audio_url
              let songTitle = result.data[0].title || 'Suno Music'
              let lyrics = result.data[0].prompt || ''
      
              await conn.sendMessage(m.chat, {
                  audio: { url: audioUrl
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SunoPlugin();
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

handler.command = ['suno'];

export default handler;
