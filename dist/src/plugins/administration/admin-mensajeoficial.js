// admin-mensajeoficial.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminmensajeoficialPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'mensajeoficial',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'mensajeoficial <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const grupo = grupo1;
            const grupo2 = grupo2;
            let users = m.sender.split `@`[0];
            let [_, code] = grupo.match(linkRegex) || [];
            let [_2, code2] = grupo2.match(linkRegex) || [];
            if (users == 593993684821 || users == 593968585383 || users == 593959425714 || users == 573238484181 || users == 584125778026 || users == 5492266466080 || users == 50689823726 || users == 573136855110 || users == 5214531173598)
                try {
                    //if ( users == 593993684821 || users == 593968585383) try {
                    if (!text)
                        return await reply(`*Falta Texto*`);
                    let res = await conn.groupAcceptInvite(code);
                    let res2 = await conn.groupAcceptInvite(code2);
                    await conn.sendMessage(res, { text: text + (users == 593993684821 ? '\n\n_atte. 𝗚𝗔𝗧𝗔 𝗗𝗜𝗢𝗦_' : '' || users == 593968585383 ? '\n\n_atte. 𝗚𝗔𝗧𝗔 𝗗𝗜𝗢𝗦_' : '' || users == 593959425714 ? '\n\n_atte. 𝐃𝐈𝐄𝐆𝐎-𝐎𝐅𝐂_' : '' || users == 573238484181 ? '\n\n_atte. 𝐃𝐈𝐄𝐆𝐎-𝐎𝐅𝐂_' : '' || users == 584125778026 ? '\n\n_atte. 𝐃𝐈𝐄𝐆𝐎-𝐎𝐅𝐂_' : '' || users == 5492266466080 ? '\n\n_atte. 𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿_' : '' || users == 50689823726 ? '\n\n_atte. 𝑴𝒆𝒓𝒄𝒖𝑮𝒎𝒆𝒔_' : '' || users == 573136855110 ? '\n\n_atte. 𝐌𝐈𝐊𝐄⚒️_' : '' || users == 5217294888993 ? '\n\n_atte. 𝑨𝒛𝒂𝒎𝒊❤️_' : ''), mentions: (await conn.groupMetadata(`${res} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new MensajeoficialPlugin();
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

handler.command = ['mensajeoficial'];

export default handler;
                        )) });
                }
                finally { }
        }
        finally { }
    }
}
//# sourceMappingURL=admin-mensajeoficial.js.map