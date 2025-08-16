// ai-regalarxp.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class airegalarxpPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'regalarxp',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'regalarxp <parámetros>',
      aliases: ["donarexp"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let who;
          if (m.isGroup) who = m.mentionedJid[0];
          else who = m.chat;
      
          if (!who) throw '🚩 Menciona al usuario con *@user.*';
      
          let txt = text.replace('@' + who.split('@')[0], '').trim();
          if (!txt) throw '🚩 Ingrese la cantidad de *🌟 Experiencia* que quiere regalar.';
          
          if (isNaN(txt)) throw 'Sólo números.';
          
          let experienciaRegalada = parseInt(txt);
          
          let users = await this.database.getData().users;
          
          if (experienciaRegalada < 1) throw '🚩 Mínimo es *1 🌟 Experiencia*.';
          
          // Verificar si el usuario tiene suficiente experiencia para regalar
          if (users[m.sender].experience < experienciaRegalada) throw 'No tienes suficiente *🌟 Experiencia* para regalar.';
          
          // Restar experiencia del donante y sumar al receptor
          users[m.sender].experience -= experienciaRegalada;
          users[who].experience += experienciaRegalada;
      
          // Respuesta al usuario
          await await reply(`🎉 Has regalado *${experienciaRegalada
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new RegalarxpPlugin();
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

handler.command = [["donarexp"]];

export default handler;
