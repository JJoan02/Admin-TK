// ai-script.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aiscriptPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'script',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'script <parámetros>',
      aliases: ["sc"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      try {
          let res = await fetch('https://api.github.com/repos/David-Chian/Megumin-Bot-MD');
          if (!res.ok) throw new Error('Error al obtener datos del repositorio');
          let json = await res.json();
      
          let txt = `*乂  S C R I P T  -  M A I N  乂*\n\n`;
          txt += `✩  *Nombre* : ${json.name
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ScriptPlugin();
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

handler.command = [["sc"]];

export default handler;
