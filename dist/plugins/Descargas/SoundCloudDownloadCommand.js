import { Command } from '../../core/Command.js';
import axios from 'axios';
import cheerio from 'cheerio';
import Starlights from '@StarlightsTeam/Scraper';
class SoundCloudDownloadCommand extends Command {
    #logger;
    constructor(logger) {
        super('soundcloud', 'Busca y descarga música de SoundCloud. Uso: !soundcloud <nombre de la canción> o !soundcloudr <url>');
        this.#logger = logger;
        this.commands = ['soundcloud', 'soundcloudr'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, `Ingresa el nombre de la canción a buscar`, m);
            return;
        }
        try {
            await m.react(global.rwait);
            if (command.toLowerCase() === "soundcloudr") {
                let ddlink = null;
                let ddname = null;
                let portada = null;
                try {
                    const dddata = await axios.get(`${global.apis}/download/soundcloud?url=${text}`);
                    ddlink = dddata.data.data.url;
                    ddname = dddata.data.data.title;
                    portada = dddata.data.data.imageURL;
                }
                catch (e) {
                    this.#logger.warn(`global.apis/download/soundcloud falló: ${e.message}`);
                }
                if (!ddlink) {
                    try {
                        const starlightRes = await Starlights.soundcloud(text);
                        if (starlightRes && starlightRes.audio) {
                            ddlink = starlightRes.audio;
                            ddname = starlightRes.title;
                            portada = starlightRes.image;
                        }
                    }
                    catch (e) {
                        this.#logger.warn(`Starlights.soundcloud falló: ${e.message}`);
                    }
                }
                if (ddlink) {
                    await conn.sendMessage(m.chat, { image: { url: portada }, caption: `Espera por favor...\n\nEnviando: ${ddname}\n\n${global.wm}` }, { quoted: m });
                    await this.#delay(15000);
                    await conn.sendMessage(m.chat, { audio: { url: ddlink }, fileName: `${ddname}`, mimetype: 'audio/mpeg' }, { quoted: m });
                    await m.react('✅');
                }
                else {
                    await conn.reply(m.chat, `No se pudo descargar la canción de SoundCloud.`, m);
                    await m.react('✖️');
                }
            }
            else {
                let listSections = [];
                try {
                    const response = await axios.get(`https://m.soundcloud.com/search/sounds?q=${encodeURIComponent(text)}`);
                    const data = response.data;
                    const regexUrls = /(?<="permalink_url":")[^"]*/g;
                    const urls = data.match(regexUrls);
                    const regexNames = /(?<="permalink":")[^"]*/g;
                    const names = data.match(regexNames);
                    if (urls && names) {
                        for (let index = 0; index < urls.length; index++) {
                            let counts = urls[index].split('/').length - 1;
                            if (counts > 3) {
                                listSections.push({
                                    rows: [
                                        {
                                            header: `Music ${index + 1}`,
                                            title: "",
                                            description: `${names[index]}\n`,
                                            id: `${usedPrefix}soundcloudr ${urls[index]}`,
                                        }
                                    ]
                                });
                            }
                        }
                    }
                }
                catch (e) {
                    this.#logger.warn(`Scraping de m.soundcloud.com falló: ${e.message}`);
                }
                if (listSections.length === 0) {
                    try {
                        const starlightSearchRes = await Starlights.soundcloudSearch(text);
                        if (starlightSearchRes && starlightSearchRes.length > 0) {
                            for (let index = 0; index < starlightSearchRes.length; index++) {
                                let track = starlightSearchRes[index];
                                listSections.push({
                                    rows: [
                                        {
                                            header: `Music ${index + 1}`,
                                            title: track.title,
                                            description: `${track.artist} | ${track.duration}\n`,
                                            id: `${usedPrefix}soundcloudr ${track.url}`,
                                        }
                                    ]
                                });
                            }
                        }
                    }
                    catch (e) {
                        this.#logger.warn(`Starlights.soundcloudSearch falló: ${e.message}`);
                    }
                }
                if (listSections.length === 0) {
                    await conn.reply(m.chat, `No se encontraron resultados en SoundCloud para "${text}".`, m);
                    await m.react('✖️');
                    return;
                }
                await conn.sendList(m.chat, `${global.htki} *RESULTADOS* ${global.htka}\n`, `\nBusqueda de: ${text}`, `B U S C A R`, listSections, global.fkontak);
                await m.react('✅');
            }
        }
        catch (e) {
            this.#logger.error(`Error al buscar/descargar de SoundCloud: ${e.message}`);
            await conn.reply(m.chat, "Error al procesar la solicitud de SoundCloud.", m);
            await m.react('✖️');
        }
    }
    #delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
export default SoundCloudDownloadCommand;
//# sourceMappingURL=SoundCloudDownloadCommand.js.map