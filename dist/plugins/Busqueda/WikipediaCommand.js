import { Command } from '../../core/Command.js';
import axios from 'axios';
import { load } from 'cheerio';
import { busquedaContent } from '../../content/busqueda-content.js';
class WikipediaCommand extends Command {
    #logger;
    constructor(logger) {
        super('wikipedia', busquedaContent.wikipedia.description);
        this.#logger = logger;
        this.commands = ['wiki', 'wikipedia'];
        this.content = busquedaContent.wikipedia;
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, this.content.noText(global.lenguajeTK.smsAvisoMG(), global.AdminTK_mid.smsMalused, usedPrefix, command), m);
            return;
        }
        try {
            await m.react(global.AdminTK_rwait);
            const result = await this.#wikipediaSearch(text);
            if (!result || !result.result || !result.result.isi) {
                await conn.reply(m.chat, this.content.notFound(text), m);
                await m.react('✖️');
                return;
            }
            const caption = this.content.caption(global.AdminTK_mid.buscador9, result.result.isi);
            const imageUrl = result.result.thumb || global.AdminTK_imagen2;
            await conn.sendFile(m.chat, imageUrl, 'wikipedia.jpg', caption, m, false, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: this.content.externalAdReplyTitle,
                        body: this.content.externalAdReplyBody,
                        previewType: 0,
                        thumbnail: global.AdminTK_imagen2,
                        sourceUrl: global.AdminTK_accountsgb
                    }
                }
            });
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`${this.content.errorSearch} ${e.message}`);
            await conn.reply(m.chat, this.content.error(global.lenguajeTK.smsMalError3(), global.lenguajeTK.smsMensError2(), usedPrefix, command, global.AdminTK_wm), m);
            await m.react('✖️');
        }
    }
    async #wikipediaSearch(query) {
        try {
            const link = await axios.get(`https://es.wikipedia.org/wiki/${encodeURIComponent(query)}`);
            const $ = load(link.data);
            const judul = $('#firstHeading').text().trim();
            const thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src');
            const isi = [];
            $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
                const penjelasan = $(Ra).find('p').text().trim();
                isi.push(penjelasan);
            });
            const mainContent = isi.find(p => p.length > 50) || isi[0] || '';
            const data = {
                status: link.status,
                result: {
                    judul: judul,
                    thumb: thumb ? 'https:' + thumb : null,
                    isi: mainContent
                }
            };
            return data;
        }
        catch (err) {
            this.#logger.error(`Error en la función wikipediaSearch: ${err.message}`);
            return null;
        }
    }
}
export default WikipediaCommand;
//# sourceMappingURL=WikipediaCommand.js.map