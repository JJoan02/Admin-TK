// info-nuevafotochannel.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infonuevafotochannelPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'nuevafotochannel',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'nuevafotochannel <parámetros>',
            aliases: ["nosilenciarcanal", "silenciarcanal", "noseguircanal", "seguircanal", "avisoschannel", "resiviravisos", "inspect", "inspeccionar", "eliminarfotochannel", "reactioneschannel", "reaccioneschannel", "nuevonombrecanal", "nuevadescchannel"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const isCommand1 = /^(inspect|inspeccionar)\b$/i.test(command);
            const isCommand2 = /^(seguircanal)\b$/i.test(command);
            const isCommand3 = /^(noseguircanal)\b$/i.test(command);
            const isCommand4 = /^(silenciarcanal)\b$/i.test(command);
            const isCommand5 = /^(nosilenciarcanal)\b$/i.test(command);
            const isCommand6 = /^(nuevafotochannel)\b$/i.test(command);
            const isCommand7 = /^(eliminarfotochannel)\b$/i.test(command);
            const isCommand8 = /^(avisoschannel|resiviravisos)\b$/i.test(command);
            const isCommand9 = /^(reactioneschannel|reaccioneschannel)\b$/i.test(command);
            const isCommand10 = /^(nuevonombrecanal)\b$/i.test(command);
            const isCommand11 = /^(nuevadescchannel)\b$/i.test(command);
            const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new NuevafotochannelPlugin();
    await plugin.execute({
        message: m,
        args: text?.split(' ') || [],
        reply: (msg) => conn.reply(m.chat, msg, m),
        conn,
        text,
        usedPrefix,
        command
    });
};
handler.command = [["nosilenciarcanal", "silenciarcanal", "noseguircanal", "seguircanal", "avisoschannel", "resiviravisos", "inspect", "inspeccionar", "eliminarfotochannel", "reactioneschannel", "reaccioneschannel", "nuevonombrecanal", "nuevadescchannel"]];
export default handler;
//# sourceMappingURL=info-nuevafotochannel.js.map