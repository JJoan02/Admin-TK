import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { NPM_SEARCH_NO_TEXT, NPM_SEARCH_SEARCHING_MESSAGE, NPM_SEARCH_NO_RESULTS, NPM_SEARCH_RESULT_HEADER, NPM_SEARCH_RESULT_ITEM, NPM_SEARCH_ERROR } from '../../content/busqueda/npm-search-responses';
class NpmSearchPlugin {
    name = "NpmSearchPlugin";
    commands = [
        {
            name: "npmjs",
            alias: [],
            desc: "Busca paquetes en npmjs.com.",
            category: "Busqueda",
            react: "📦",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (!text)
                    return conn.reply(m.chat, NPM_SEARCH_NO_TEXT(usedPrefix, command), m);
                try {
                    await m.react(global.rwait);
                    conn.reply(m.chat, NPM_SEARCH_SEARCHING_MESSAGE, m, {
                        contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                                title: global.packname,
                                body: global.dev,
                                previewType: 0, thumbnail: global.icons,
                                sourceUrl: global.channel } }
                    });
                    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
                    let { objects } = await res.json();
                    if (!objects.length)
                        return conn.reply(m.chat, NPM_SEARCH_NO_RESULTS(text), m, global.fake);
                    let txt = objects.map((pkg) => {
                        return NPM_SEARCH_RESULT_ITEM(pkg.package);
                    }).join `\n\n`;
                    await conn.reply(m.chat, txt, m, global.fake);
                    await m.react(global.done);
                }
                catch (e) {
                    await conn.reply(m.chat, NPM_SEARCH_ERROR, m, global.fake);
                    await m.react(global.error);
                }
            }
        }
    ];
}
export default NpmSearchPlugin;
//# sourceMappingURL=internet-npm.js.map