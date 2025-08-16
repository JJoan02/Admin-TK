// admin-deposit.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class admindepositPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'deposit',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'deposit <parámetros>',
      aliases: ["depositar","dep","aguardar"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let user = await this.database.getData().users[m.sender]
      if (!args[0]) return await reply('🚩 Ingresa la cantidad de *Chocolates 🍫* que deseas Depositar.')
      if ((args[0]) < 1) return await reply('🚩 Ingresa una cantidad válida de *Chocolates 🍫*.')
      if (args[0] == 'all') {
      let count = parseInt(user.chocolates)
      user.chocolates -= count * 1
      user.bank += count * 1
      await await reply(`Depositaste *${count
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DepositPlugin();
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

handler.command = [["depositar","dep","aguardar"]];

export default handler;
