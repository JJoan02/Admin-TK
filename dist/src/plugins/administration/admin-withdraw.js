// admin-withdraw.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminwithdrawPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'withdraw',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'withdraw <parámetros>',
            aliases: ["retirar", "wd"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = await this.database.getData().users[m.sender];
            if (!args[0])
                return await reply('🚩 Ingresa la cantidad de *Chocolates 🍫* que deseas Retirar.');
            if (args[0] == 'all') {
                let count = parseInt(user.bank);
                user.bank -= count * 1;
                user.chocolates += count * 1;
                await await reply(`🚩 Retiraste *${count} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new WithdrawPlugin();
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

handler.command = [["retirar","wd"]];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=admin-withdraw.js.map