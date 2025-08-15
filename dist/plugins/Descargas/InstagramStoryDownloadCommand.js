import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import axios from 'axios';
class InstagramStoryDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('igstory', 'Descarga historias de Instagram. Uso: !igstory <nombre de usuario>');
        this.#logger = logger;
        this.commands = ['igstory', 'ighistoria', 'ighistorias'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (!args[0]) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsInsta2}\n*${usedPrefix + command} gata_dios*`, m);
            return;
        }
        const username = args[0];
        try {
            await m.react(global.rwait);
            const res = await fetch(`https://api.lolhuman.xyz/api/igstory/${username}?apikey=${global.lolkeysapi}`);
            const anu = await res.json();
            const anuku = anu.result;
            if (!anuku || anuku.length === 0) {
                await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoFG()}${global.mid.smsInsta3}`, m);
                await m.react('✖️');
                return;
            }
            for (const i of anuku) {
                const resAxios = await axios.head(i);
                const mime = resAxios.headers['content-type'];
                if (/image/.test(mime)) {
                    await conn.sendFile(m.chat, i, 'error.jpg', null, m).catch(() => {
                        return conn.reply(m.chat, `${global.lenguajeGB.smsAvisoFG()}${global.mid.smsInsta3}`, m);
                    });
                }
                else if (/video/.test(mime)) {
                    await conn.sendFile(m.chat, i, 'error.mp4', null, m).catch(() => {
                        return conn.reply(m.chat, `${global.lenguajeGB.smsAvisoFG()}${global.mid.smsInsta3}`, m);
                    });
                }
                await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoIIG()}${global.mid.smsinfo}`, m, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 | 𝙂𝙖𝙩𝙖 𝘿𝙞𝙤𝙨', body: 'Super Bot WhatsApp', previewType: 0, thumbnail: global.gataMenu, sourceUrl: global.md } } });
            }
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error al descargar historia de Instagram: ${e.message}`);
            await conn.reply(m.chat, `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, m);
            await m.react('✖️');
        }
    }
}
export default InstagramStoryDownloadCommand;
//# sourceMappingURL=InstagramStoryDownloadCommand.js.map