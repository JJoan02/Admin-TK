// tool-convert-to-audio.ts - Plugin mejorado y optimizado
// Categoría: media-tools
// Funcionalidad: Herramientas multimedia y conversores
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class toolconverttoaudioPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'tomp3',
      category: 'media-tools',
      description: 'Herramientas multimedia y conversores',
      usage: 'tomp3 <parámetros>',
      aliases: ["toaudio"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let q = m.quoted ? m.quoted : m
      let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
      if (!/video|audio/.test(mime)) throw `✅ Responde al *Video* o *Nota de Voz* que desea convertir a mp3.`
      try {
      let media = await q.download?.()
      if (!media) return null
      let audio = await toAudio(media, 'mp4')
      if (!audio.data) return null
      await conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4'
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new Tomp3Plugin();
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

handler.command = [["toaudio"]];

export default handler;
