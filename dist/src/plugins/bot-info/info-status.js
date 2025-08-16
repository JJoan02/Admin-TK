// info-status.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infostatusPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'status',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'status <parámetros>',
            aliases: ["estado"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const used = process.memoryUsage();
            const totalMem = os.totalmem();
            const freeMem = os.freemem();
            const platform = os.platform();
            const arch = os.arch();
            const uptime = process.uptime();
            const cpus = os.cpus();
            const load = os.loadavg();
            const format = (bytes) => {
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes === 0)
                    return '0 Byte';
                const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return `${(bytes / Math.pow(1024, i)).toFixed(2)} catch (error) {
      console.error(`;
                Error;
                en;
                $;
                {
                    this.name;
                }
                `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new StatusPlugin();
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

handler.command = [["estado"]];

export default handler;
                ;
            };
        }
        finally { }
    }
}
//# sourceMappingURL=info-status.js.map