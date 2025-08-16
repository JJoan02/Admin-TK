// ai-cpf.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aicpfPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'cpf',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'cpf <parámetros>',
            aliases: ["consultacpf"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let q = text ? text.trim() : '';
            let e = "`";
            if (!q) {
                return await reply(m.chat, `⚠️ *CPF inválido!*\n> Para realizar la consulta, escribe el CPF *solo con números*, sin puntos ni guiones.\n> 🔑 Ejemplo de uso: *${e + usedPrefix + command} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new CpfPlugin();
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

handler.command = [["consultacpf"]];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=ai-cpf.js.map