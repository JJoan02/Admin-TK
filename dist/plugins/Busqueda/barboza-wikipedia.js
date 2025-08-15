import { ICommand, IPluginModule } from '../../types/plugin';
import axios from 'axios';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { WIKIPEDIA_NO_TEXT, WIKIPEDIA_RESULTS_HEADER, WIKIPEDIA_NO_RESULTS, WIKIPEDIA_ERROR } from '../../content/busqueda/wikipedia-responses';
async function wikipediaSearch(query) {
    try {
        const link = await axios.get(`https://es.wikipedia.org/wiki/${query}`);
        const $ = cheerio.load(link.data);
        const judul = $('#firstHeading').text().trim();
        const thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
        const isi = [];
        $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
            const penjelasan = $(Ra).find('p').text().trim();
            isi.push(penjelasan);
        });
        const data = {
            status: link.status,
            result: {
                judul: judul,
                thumb: 'https:' + thumb,
                isi: isi[0] || 'No se encontró información.'
            }
        };
        return data;
    }
    catch (err) {
        console.error("Error en wikipediaSearch:", err);
        return { status: 500, Pesan: WIKIPEDIA_ERROR };
    }
}
class WikipediaPlugin {
    name = "WikipediaPlugin";
    commands = [
        {
            name: "wikipedia",
            alias: ["wiki"],
            desc: "Busca información en Wikipedia.",
            category: "Busqueda",
            react: "📚",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, WIKIPEDIA_NO_TEXT(usedPrefix, command), m);
                }
                try {
                    const res = await wikipediaSearch(text);
                    if (res.status !== 200 || !res.result.isi) {
                        return conn.reply(m.chat, WIKIPEDIA_NO_RESULTS, m);
                    }
                    conn.reply(m.chat, WIKIPEDIA_RESULTS_HEADER + res.result.isi, m);
                }
                catch (e) {
                    console.error("Error en WikipediaPlugin:", e);
                    conn.reply(m.chat, WIKIPEDIA_ERROR, m);
                }
            }
        }
    ];
}
export default WikipediaPlugin;
//# sourceMappingURL=barboza-wikipedia.js.map