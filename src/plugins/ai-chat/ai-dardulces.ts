// ai-dardulces.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aidardulcesPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'dardulces',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'dardulces <parámetros>',
      aliases: ["donardulces"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : null;
          if (!who) throw '🚩 Menciona al usuario con *@user*.';
      
          let txt = text.replace('@' + who.split`@`[0], '').trim();
          if (!txt) throw '🚩 Ingresa la cantidad de *🍬 Dulces* que quieres transferir.';
          if (isNaN(txt)) throw '🚩 Solo se permiten números.';
      
          let poin = parseInt(txt);
          let imt = Math.ceil(poin * impuesto);
          let total = poin + imt;
      
          if (total < 1) throw '🚩 El mínimo para donar es *1 🍬 Dulce*.';
      
          let sender = m.sender;
      
          // Verificamos que ambos usuarios existen en la base de datos
          if (!(sender in await this.database.getData().users)) throw '🚩 No estás registrado en mi base de datos.';
          if (!(who in await this.database.getData().users)) throw '🚩 El usuario mencionado no está registrado en mi base de datos.';
      
          let senderData = await this.database.getData().users[sender];
          let receiverData = await this.database.getData().users[who];
      
          if (total > senderData.limit) throw '🚩 No tienes suficientes *🍬 Dulces* para donar.';
      
          senderData.limit -= total;
          receiverData.limit += poin;
      
          await await reply(`✅ Has transferido *${poin
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DardulcesPlugin();
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

handler.command = [["donardulces"]];

export default handler;
