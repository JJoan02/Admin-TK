// ai-nuevolink.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class ainuevolinkPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'nuevolink',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'nuevolink <parámetros>',
      aliases: ["nuevoenlace","revoke","resetlink"],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg' 
      
      let res = await conn.groupRevokeInvite(m.chat)
      await reply(m.chat, lenguajeGB.smsRestGp(), + '\n\n*https://chat.whatsapp.com/' + res + '*', fkontak, m)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new NuevolinkPlugin();
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

handler.command = [["nuevoenlace","revoke","resetlink"]];
handler.admin = true;

export default handler;
