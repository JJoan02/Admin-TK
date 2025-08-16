// search-cscstalk.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class searchcscstalkPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'cscstalk',
            category: 'search-tools',
            description: 'Herramientas de búsqueda',
            usage: 'cscstalk <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply('Ingresa un nombre de usuario, ejemplo: cscstalk ZenzzXD');
            await await reply('⏳ Obteniendo datos...');
            try {
                let username = text.trim();
                let result = await buscarPerfil(username);
                if (!result || !result.perfil)
                    return await reply('❌ No se pudo obtener la información 😂');
                let txt = `*Perfil de Codeshare*\n`;
                txt += `• Usuario: ${result.perfil.username} catch (error) {
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
  const plugin = new CscstalkPlugin();
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

handler.command = ['cscstalk'];

export default handler;
                ;
            }
            finally { }
        }
        finally { }
    }
}
//# sourceMappingURL=search-cscstalk.js.map