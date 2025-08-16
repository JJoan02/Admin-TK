// owner-ping.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownerpingPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'ping',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'ping <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let timestamp = speed();
            let latensi = speed() - timestamp;
            exec(`neofetch --stdout`, (error, stdout, stderr) => {
                let child = stdout.toString("utf-8");
                let ssd = child.replace(/Memory:/, "Ram:");
                await reply(m.chat, `*Pong* 🏓 ${latensi.toFixed(4)} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new PingPlugin();
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

handler.command = ['ping'];

export default handler;
                );
            });
        }
        finally { }
    }
}
//# sourceMappingURL=owner-ping.js.map