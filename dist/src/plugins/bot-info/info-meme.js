// info-meme.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infomemePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'meme',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'meme <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const memes = [
                'https://i.imgur.com/1.jpg', // Reemplaza con enlaces a tus memes
                'https://qu.ax/dpYLN.jpg',
                'https://qu.ax/YvLWt.jpg',
                'https://qu.ax/FxBzq.jpg',
                'https://qu.ax/oRkAi.jpg',
                'https://qu.ax/Gfnrz.jpg',
                'https://qu.ax/UFWsB.jpg',
                'https://qu.ax/rubYe.jpg',
                'https://qu.ax/UFWsB.jpg',
                'https://qu.ax/uyjpK.jpg',
                'https://qu.ax/RcxFR.jpg',
                'https://qu.ax/MctMj.jpg',
                'https://qu.ax/znbWC.jpg',
                'https://qu.ax/lLJMP.jpg',
                'https://qu.ax/HhOVP.jpg',
                'https://qu.ax/yQoQW.jpg',
                'https://qu.ax/msDFZ.jpg',
                'https://qu.ax/MTDhM.jpg',
                'https://qu.ax/hFQOL.jpg',
                'https://qu.ax/hFQOL.jpg',
                'https://qu.ax/iHSQp.jpg',
                'https://qu.ax/dWkJV.jpg',
                'https://qu.ax/jyaXq.jpg',
                'https://qu.ax/iTDtj.jpg',
                'https://qu.ax/GjjKW.jpg',
                'https://qu.ax/JOqKm.jpg',
                'https://qu.ax/ztadH.jpg',
                'https://qu.ax/FQCDQ.jpg',
                'https://qu.ax/nQqCP.jpg',
                'https://qu.ax/QxSun.jpg',
                'https://qu.ax/tXWnk.jpg',
                'https://qu.ax/EuuUz.jpg',
                'https://qu.ax/enMBc.jpg',
                'https://qu.ax/QpCpk.jpg',
                'https://qu.ax/UbtkV.jpg',
            ];
            // Elegir un meme aleatorio
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            // Enviar el meme al chat
            await conn.sendMessage(m.chat, { image: { url: randomMeme
                }, catch(error) {
                    console.error(`Error en ${this.name}:`, error);
                    await reply('❌ Ocurrió un error al ejecutar el comando');
                }
            });
        }
        // Exportar para compatibilidad con sistema legacy
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new MemePlugin();
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
        handler.command = ['meme'];
        export default handler;
    }
}
//# sourceMappingURL=info-meme.js.map