// owner-dashboard.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class ownerdashboardPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'dashboard',
      category: 'owner-commands',
      description: 'Comandos exclusivos del propietario',
      usage: 'dashboard <parámetros>',
      aliases: ["dash","views","database","usuarios","user"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (command == 'dash' || command == 'dashboard' || command == 'views') {
              let stats = Object.entries(db.data.stats).map(([key, val]) => {
                  let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key 
      
                  if (/exec/.test(name)) return
                  return { name, ...val
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DashboardPlugin();
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

handler.command = [["dash","views","database","usuarios","user"]];

export default handler;
