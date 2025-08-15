import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { GITHUB_SEARCH_NO_TEXT, GITHUB_SEARCH_NO_RESULTS, GITHUB_SEARCH_ERROR, GITHUB_SEARCH_RESULT_HEADER, GITHUB_SEARCH_RESULT_ITEM } from '../../content/busqueda/github-search-responses';
function formatDate(n, locale = 'es') {
    const d = new Date(n);
    return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}
class GithubSearchPlugin {
    name = "GithubSearchPlugin";
    commands = [
        {
            name: "githubsearch",
            alias: [],
            desc: "Busca repositorios en GitHub.",
            category: "Busqueda",
            react: "🔍",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text) {
                    return conn.reply(m.chat, GITHUB_SEARCH_NO_TEXT(usedPrefix, command), m);
                }
                try {
                    await m.react(global.AdminTK_rwait);
                    const res = await fetch(global.API('https://api.github.com', '/search/repositories', {
                        q: text,
                    }));
                    const json = await res.json();
                    if (res.status !== 200)
                        throw json;
                    if (!json.items || json.items.length === 0) {
                        await conn.reply(m.chat, GITHUB_SEARCH_NO_RESULTS(text), m, global.fake);
                        await m.react('✖️');
                        return;
                    }
                    let str = json.items.map((repo, index) => {
                        return GITHUB_SEARCH_RESULT_ITEM(index, repo);
                    }).join('\n\n─────────────────\n\n');
                    let img = await (await fetch(json.items[0].owner.avatar_url)).buffer();
                    await conn.sendMini(m.chat, GITHUB_SEARCH_RESULT_HEADER, global.dev, str, img, img, global.redes, global.estilo);
                    await m.react(global.AdminTK_done);
                }
                catch (e) {
                    console.error("Error en GithubSearchPlugin:", e);
                    await m.react(global.error);
                    conn.reply(m.chat, GITHUB_SEARCH_ERROR, m, global.fake);
                }
            }
        }
    ];
}
export default GithubSearchPlugin;
//# sourceMappingURL=buscador-githubsearch.js.map