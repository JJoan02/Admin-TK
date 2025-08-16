// util-capcut.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class utilcapcutPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'capcut',
      category: 'utility-tools',
      description: 'Herramientas de utilidad',
      usage: 'capcut <parámetros>',
      aliases: ["ccdownload"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!args[0]) return await reply(m.chat, `[ ✰ ]  Ingresa un link de CapCut`, m);
          if (!args[0].match(/capcut/gi)) return await reply(m.chat, `[ ✰ ]  Verifica que el link sea de *CapCut*`, m);
      
          await m.react('🕓');
          try {
              const response = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(args[0])
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new CapcutPlugin();
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

handler.command = [["ccdownload"]];

export default handler;
