import { ICommand, IPluginModule } from '../../types/plugin';
import google from 'google-it';
import { GOOGLE_SEARCH_NO_TEXT, GOOGLE_SEARCH_RESULTS_HEADER, GOOGLE_SEARCH_RESULT_ITEM } from '../../content/busqueda/google-search-responses';
class GoogleSearchPlugin {
    name = "GoogleSearchPlugin";
    commands = [
        {
            name: "google",
            alias: [],
            desc: "Realiza una búsqueda en Google.",
            category: "Busqueda",
            react: "🔍",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text)
                    return conn.reply(m.chat, GOOGLE_SEARCH_NO_TEXT, m);
                google({ 'query': text }).then((res) => {
                    let teks = GOOGLE_SEARCH_RESULTS_HEADER(text);
                    for (let g of res) {
                        teks += GOOGLE_SEARCH_RESULT_ITEM(g.title, g.snippet, g.link);
                    }
                    conn.reply(m.chat, teks, m);
                });
            }
        }
    ];
}
export default GoogleSearchPlugin;
//# sourceMappingURL=buscador-google.js.map