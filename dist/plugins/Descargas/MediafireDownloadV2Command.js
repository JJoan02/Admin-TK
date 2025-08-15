import { Command } from '../../core/CommandBus.js';
import axios from 'axios';
import fetch from 'node-fetch';
import { downloaderMessages } from '../content/descargas-content.js';
export class MediafireDownloadV2Command extends Command {
    constructor() {
        super();
        this.name = 'mediafire2';
        this.description = 'Descarga archivos de Mediafire (versión 2).';
        this.commands = ['mediafire2', 'mdfire2', 'mf2'];
        this.tags = ['descargas'];
        this.help = ['mediafire2 <url>'];
        this.premium = false;
    }
    async execute(context) {
        const { conn, m, args, usedPrefix, command } = context;
        if (!args[0]) {
            return m.reply(downloaderMessages.mediafireUsage, m);
        }
        if (!args[0].match(/mediafire/gi)) {
            return m.reply(downloaderMessages.mediafireInvalidLink, m);
        }
        try {
            await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
            const apiBase64 = 'aHR0cHM6Ly9yZXN0YXBpLmFwaWJvdHdhLmJpei5pZC9hcGkvbWVkaWFmaXJlP3VybD0=';
            const apiUrl = Buffer.from(apiBase64, 'base64').toString('utf-8');
            let response = await axios.get(`${apiUrl}${args[0]}`);
            let { datos } = response.data;
            let { "Nombre del archivo": title, tipo, "tamaño": size, "subido": uploaded, mimetype, "descargar": downloadUrl } = datos.respuesta;
            let txt = `${downloaderMessages.mediafireDownloadHeader}\n\n`;
            txt += `${downloaderMessages.mediafireName} : ${title}\n`;
            txt += `${downloaderMessages.mediafireSize} : ${size}\n`;
            txt += `${downloaderMessages.mediafirePublished} : ${uploaded || 'Desconocido'}\n`;
            txt += `${downloaderMessages.mediafireMimeType} : ${mimetype}\n\n`;
            txt += `${downloaderMessages.mediafireSending}`;
            let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer();
            await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, null, null, { asDocument: false });
            await conn.sendFile(m.chat, downloadUrl, title, null, null, null, { mimetype, asDocument: true });
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        }
        catch (err) {
            console.error(err);
            await conn.reply(m.chat, '❌ Hubo un error al procesar tu solicitud.', m);
            await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key } });
        }
    }
}
//# sourceMappingURL=MediafireDownloadV2Command.js.map