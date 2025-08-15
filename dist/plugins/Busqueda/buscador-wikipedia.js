import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { WIKIPEDIA_SEARCH_NO_TEXT, WIKIPEDIA_SEARCH_RESULTS_HEADER, WIKIPEDIA_SEARCH_ERROR_REPORT, WIKIPEDIA_SEARCH_ERROR_MESSAGE } from '../../content/busqueda/wikipedia-search-responses';
async function wikipediaSearch(querry) {
    try {
        const link = await axios.get(`https://es.wikipedia.org/wiki/${querry}`);
        const $ = cheerio.load(link.data);
        const judul = $('#firstHeading').text().trim();
        const thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
        const isi = [];
        $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
            const penjelasan = $(Ra).find('p').text().trim();
            isi.push(penjelasan);
        });
        for (const i of isi) {
            const data = {
                status: link.status,
                result: {
                    judul: judul,
                    thumb: 'https:' + thumb,
                    isi: i
                }
            };
            return data;
        }
        return { status: 404, Pesan: WIKIPEDIA_SEARCH_ERROR_MESSAGE };
    }
    catch (err) {
        console.error("Error en wikipediaSearch:", err);
        return { status: 500, Pesan: WIKIPEDIA_SEARCH_ERROR_MESSAGE };
    }
}
class BuscadorWikipediaPlugin {
    name = "BuscadorWikipediaPlugin";
    commands = [
        {
            name: "wikipedia",
            alias: ["wiki"],
            desc: "Busca información en Wikipedia.",
            category: "Busqueda",
            react: "📚",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    return conn.reply(m.chat, WIKIPEDIA_SEARCH_NO_TEXT(global.lenguajeGB.smsAvisoMG(), global.mid.smsMalused, usedPrefix, command), m);
                try {
                    const res = await wikipediaSearch(text);
                    if (res.status !== 200) {
                        return conn.reply(m.chat, WIKIPEDIA_SEARCH_ERROR_MESSAGE, m, global.fkontak);
                    }
                    conn.reply(m.chat, WIKIPEDIA_SEARCH_RESULTS_HEADER(global.mid.buscador9) + res.result.isi, global.fkontak, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 | 𝙒𝙞𝙠𝙞𝙥𝙚𝙙𝙞𝙖', body: '𝗦𝘂𝗽𝗲𝗿 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗕𝗼𝘁 🐱❤️', previewType: 0, thumbnail: global.imagen2, sourceUrl: global.accountsgb } } });
                }
                catch (e) {
                    console.error(`❗❗ ${WIKIPEDIA_SEARCH_ERROR_REPORT(usedPrefix, command)} ❗❗`);
                    console.error(e);
                    conn.reply(m.chat, WIKIPEDIA_SEARCH_ERROR_MESSAGE, m, global.fkontak);
                }
            }
        }
    ];
}
export default BuscadorWikipediaPlugin;
//# sourceMappingURL=buscador-wikipedia.js.map