import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import axios from 'axios';
import { load } from 'cheerio';
import { MOVIE_SEARCH_NO_TEXT, MOVIE_SEARCH_NO_RESULTS, MOVIE_SEARCH_RESULT_TITLE, MOVIE_SEARCH_RESULT_LINK, MOVIE_SEARCH_ADS } from '../../content/busqueda/movie-search-responses';
const safeLoad = async (url, options = {}) => {
    try {
        const { data: pageData } = await axios.get(url, options);
        const $ = load(pageData);
        return $;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.statusText);
        }
        throw err;
    }
};
async function searchC(query, numberPage = 1) {
    const $ = await safeLoad(`https://cuevana3.mu/page/${numberPage}/`, {
        params: { s: query }
    });
    const resultSearch = [];
    $('.results-post > article').each((_, e) => {
        const element = $(e);
        const title = element.find('header > h2').text();
        const link = element.find('.lnk-blk').attr('href');
        resultSearch.push({ title: title, link: link });
    });
    return resultSearch;
}
async function searchP(query, numberPage = 1) {
    const $ = await safeLoad(`https://pelisplushd.cx/search/`, {
        params: { s: query, page: numberPage }
    });
    const resultSearch = [];
    $('a[class^=\'Posters\']').each((_, e) => {
        const element = $(e);
        const title = element.find('.listing-content > p').text();
        const link = element.attr('href');
        resultSearch.push({ title: title, link: link });
    });
    return resultSearch;
}
class MovieSearchPlugin {
    name = "MovieSearchPlugin";
    commands = [
        {
            name: "cuevana",
            alias: ["pelisplus"],
            desc: "Busca películas en Cuevana3 o PelisplusHD.",
            category: "Busqueda",
            react: "🎬",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, MOVIE_SEARCH_NO_TEXT(global.lenguajeGB.smsAvisoMG(), global.mid.smsMalused7), m);
                }
                let aaaa;
                let img;
                try {
                    aaaa = await searchC(text);
                    img = 'https://cinefilosoficial.com/wp-content/uploads/2021/07/cuevana.jpg';
                }
                catch {
                    aaaa = await searchP(text);
                    img = 'https://elcomercio.pe/resizer/RJM30xnujgfmaODGytH1rRVOrAA=/400x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BJ2L67XNRRGHTFPKPDOEQ2AH5Y.jpg';
                }
                if (aaaa.length === 0) {
                    throw MOVIE_SEARCH_NO_RESULTS(global.lenguajeGB.smsAvisoFG(), global.mid.buscador10);
                }
                const res = aaaa.map((v) => `${MOVIE_SEARCH_RESULT_TITLE} ${v.title}\n${MOVIE_SEARCH_RESULT_LINK} ${v.link}`).join('\n\n───────────────\n\n');
                const ads = MOVIE_SEARCH_ADS;
                conn.sendMessage(m.chat, { image: { url: img }, caption: ads + res }, { quoted: m });
            }
        }
    ];
}
export default MovieSearchPlugin;
//# sourceMappingURL=buscador-peliculas.js.map