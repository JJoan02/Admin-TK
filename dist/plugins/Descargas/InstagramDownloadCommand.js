import { Command } from '../../core/Command.js';
import fetch from 'node-fetch';
import axios from 'axios';
import { igdl } from 'ruhend-scraper';
import { instagram } from '@xct007/frieren-scraper';
import { instagramdl } from '@bochilteam/scraper';
import instagramGetUrl from 'instagram-url-direct';
import Starlights from '@StarlightsTeam/Scraper';
class InstagramDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('instagram', 'Descarga contenido de Instagram (imágenes y videos). Uso: !instagram <enlace>');
        this.#logger = logger;
        this.commands = ['instagram', 'ig', 'igdl'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command } = context;
        if (!args[0]) {
            await conn.reply(m.chat, `${global.lenguajeGB.smsAvisoMG()}${global.mid.smsInsta}\n*${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/?igshid=YmMyMTA2M2Y=*`, m);
            return;
        }
        const url = args[0];
        const key = (await conn.sendMessage(m.chat, { text: global.wait }, { quoted: m })).key;
        try {
            await m.react(global.rwait);
            let downloadUrl = null;
            let fileType = null;
            try {
                const res = await igdl(url);
                if (res && res.data && res.data.length > 0) {
                    const data = res.data.find(i => i.resolution === "720p (HD)") || res.data.find(i => i.resolution === "360p (SD)");
                    if (data) {
                        downloadUrl = data.url;
                        fileType = data.url.includes('.mp4') ? 'video' : 'image';
                    }
                }
            }
            catch (e) {
                this.#logger.warn(`ruhend-scraper (igdl) falló: ${e.message}`);
            }
            if (!downloadUrl) {
                try {
                    const { dl_url } = await Starlights.igdl(url);
                    if (dl_url) {
                        downloadUrl = dl_url;
                        fileType = dl_url.includes('.mp4') ? 'video' : 'image';
                    }
                }
                catch (e) {
                    this.#logger.warn(`@StarlightsTeam/Scraper (igdl) falló: ${e.message}`);
                }
            }
            if (!downloadUrl) {
                try {
                    const apiUrl = `${global.apis}/download/instagram?url=${encodeURIComponent(url)}`;
                    const apiResponse = await fetch(apiUrl);
                    const delius = await apiResponse.json();
                    if (delius && delius.data && delius.data.length > 0) {
                        downloadUrl = delius.data[0].url;
                        fileType = delius.data[0].type;
                    }
                }
                catch (e) {
                    this.#logger.warn(`apis-starlights-team falló: ${e.message}`);
                }
            }
            if (!downloadUrl) {
                try {
                    const apiUrll = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(url)}&apikey=bot-secx3`;
                    const responsel = await axios.get(apiUrll);
                    const resultl = responsel.data;
                    if (resultl && resultl.message && resultl.message.length > 0) {
                        downloadUrl = resultl.message[0]._url;
                        fileType = resultl.message[0]._url.includes('.mp4') ? 'video' : 'image';
                    }
                }
                catch (e) {
                    this.#logger.warn(`betabotz.org falló: ${e.message}`);
                }
            }
            if (!downloadUrl) {
                try {
                    const datTa = await instagram.v1(url);
                    if (datTa && datTa.length > 0) {
                        downloadUrl = datTa[0].url;
                        fileType = datTa[0].url.includes('.mp4') ? 'video' : 'image';
                    }
                }
                catch (e) {
                    this.#logger.warn(`frieren-scraper falló: ${e.message}`);
                }
            }
            if (!downloadUrl) {
                try {
                    const resultss = await instagramGetUrl(url).url_list[0];
                    if (resultss) {
                        downloadUrl = resultss;
                        fileType = resultss.includes('.mp4') ? 'video' : 'image';
                    }
                }
                catch (e) {
                    this.#logger.warn(`instagram-url-direct falló: ${e.message}`);
                }
            }
            if (!downloadUrl) {
                try {
                    const resultssss = await instagramdl(url);
                    if (resultssss && resultssss.length > 0) {
                        downloadUrl = resultssss[0].url;
                        fileType = resultssss[0].url.includes('.mp4') ? 'video' : 'image';
                    }
                }
                catch (e) {
                    this.#logger.warn(`bochilteam/scraper falló: ${e.message}`);
                }
            }
            if (!downloadUrl) {
                try {
                    const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${global.lolkeysapi}&url=${url}`);
                    const json = await human.json();
                    if (json.result) {
                        downloadUrl = json.result;
                        fileType = json.result.includes('.mp4') ? 'video' : 'image';
                    }
                }
                catch (e) {
                    this.#logger.warn(`lolhuman.xyz falló: ${e.message}`);
                }
            }
            if (downloadUrl && fileType) {
                if (fileType === 'image') {
                    await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', `${global.wm}`, m, null, global.fake);
                }
                else if (fileType === 'video') {
                    await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', `${global.wm}`, m, null, global.fake);
                }
                await conn.sendMessage(m.chat, { text: global.waittttt, edit: key });
                await m.react('✅');
            }
            else {
                await conn.reply(m.chat, '*`No se pudo descargar el contenido de Instagram. Inténtalo de nuevo más tarde.`*', m);
                await m.react('✖️');
            }
        }
        catch (e) {
            this.#logger.error(`Error general al descargar de Instagram: ${e.message}`);
            await conn.sendMessage(m.chat, { text: `${global.lenguajeGB.smsMalError3()}#report ${global.lenguajeGB.smsMensError2()} ${usedPrefix + command}\n\n${global.wm}`, edit: key });
            await m.react('✖️');
        }
    }
}
export default InstagramDownloadCommand;
//# sourceMappingURL=InstagramDownloadCommand.js.map