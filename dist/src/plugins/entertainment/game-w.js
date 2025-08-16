// game-w.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamewPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'w',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'w <parámetros>',
            aliases: ["work"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = globalThis.db.data.users[m.sender];
            let tiempo = 5 * 60;
            if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
                const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000));
                await reply(m.chat, `✧ Debes esperar *${tiempo2} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new WPlugin();
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

handler.command = [["work"]];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=game-w.js.map