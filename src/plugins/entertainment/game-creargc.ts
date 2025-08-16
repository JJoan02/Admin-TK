// game-creargc.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gamecreargcPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'creargc',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'creargc <parámetros>',
      aliases: ["newgc","creargrupo","grupocrear"],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) return await reply('🚩 Ingresa un nombre para el grupo.')
      try{
      await reply('🚩 *Creando grupo*')
      let group = await conn.groupCreate(text, [m.sender])
      let link = await conn.groupInviteCode(group.gid)
      await reply('https://chat.whatsapp.com/' + url)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new CreargcPlugin();
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

handler.command = [["newgc","creargrupo","grupocrear"]];
handler.rowner = true;

export default handler;
