import { Command } from '../../core/CommandBus.js';
import fetch from 'node-fetch';
import { downloaderMessages } from '../content/descargas-content.js';
export class MediafireDownloadCommand extends Command {
    constructor() {
        super();
        this.name = 'mediafire';
        this.description = 'Descarga archivos de Mediafire.';
        this.commands = ['mediafire', 'mf', 'mfdl'];
        this.tags = ['descargas'];
        this.help = ['mediafire <url>'];
    }
    async execute(context) {
        const { conn, m, args, usedPrefix, command } = context;
        if (!args || !args[0]) {
            return m.reply(downloaderMessages.mediafireUsage.replace('${usedPrefix}', usedPrefix).replace('${command}', command), m);
        }
        if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) {
            return m.reply(downloaderMessages.mediafireInvalidLink, m);
        }
        await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
        try {
            const json = await (await fetch(`https://api.sylphy.xyz/download/mediafire?url=${args[0]}&apikey=tesis-te-amo`)).json();
            if (!json.data.download) {
                return conn.reply(m.chat, "No se pudo obtener la información del archivo.", m);
            }
            let info = `
✦ \`Nombre :\` ${json.data.filename}\n✧ \`Peso :\` ${json.data.size}\n✦ \`Link :\` ${args[0]}\n✧ \`Mime :\` ${json.data.mimetype}\n`;
            m.reply(info);
            await conn.sendFile(m.chat, json.data.download, json.data.filename, "", m);
        }
        catch (e) {
            console.error(e);
            return conn.reply(m.chat, `Error: ${e.message}`, m);
        }
    }
}
//# sourceMappingURL=MediafireDownloadCommand.js.map