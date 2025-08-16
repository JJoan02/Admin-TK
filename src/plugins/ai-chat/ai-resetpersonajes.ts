// ai-resetpersonajes.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class airesetpersonajesPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'resetpersonajes',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'resetpersonajes <parámetros>',
      aliases: ["resetp","eliminarpersonajes","eliminarp"],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let data = obtenerDatos()  
          let mentionedJid = m.mentionedJid && m.mentionedJid[0] 
              ? m.mentionedJid[0] 
              : m.quoted && m.quoted.sender 
                  ? m.quoted.sender 
                  : null
          if (!mentionedJid) {
              await reply(m.chat, '𝑷𝒐𝒓 𝒇𝒂𝒗𝒐𝒓, 𝒎𝒆𝒏𝒄𝒊𝒐𝒏𝒂 𝒂 𝒖𝒏 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒐 𝒓𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒅𝒆𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒄𝒖𝒚𝒐 𝒑𝒆𝒓𝒇𝒊𝒍 𝒅𝒆𝒔𝒆𝒂𝒔 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒓.', m, rcanal)
              return
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ResetpersonajesPlugin();
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

handler.command = [["resetp","eliminarpersonajes","eliminarp"]];
handler.rowner = true;

export default handler;
