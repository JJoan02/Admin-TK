import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { PLAYSTORE_NO_TEXT, PLAYSTORE_NO_RESULTS, PLAYSTORE_RESULTS_HEADER, PLAYSTORE_LINK_UNAVAILABLE, PLAYSTORE_ERROR } from '../../content/busqueda/playstore-responses';
class PlaystoreSearchPlugin {
    name = "PlaystoreSearchPlugin";
    commands = [
        {
            name: "playstore",
            alias: [],
            desc: "Busca aplicaciones en Google Play Store.",
            category: "Busqueda",
            react: "📱",
            execute: async (Yaka, m, { conn, args }) => {
                if (!args[0]) {
                    return conn.reply(m.chat, PLAYSTORE_NO_TEXT, m);
                }
                const query = args.join(' ');
                const apiUrl = `https://api.vreden.my.id/api/playstore?query=${encodeURIComponent(query)}`;
                try {
                    await m.react('⏳');
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (!data || !data.result || data.result.length === 0) {
                        return conn.reply(m.chat, PLAYSTORE_NO_RESULTS, m);
                    }
                    let results = PLAYSTORE_RESULTS_HEADER(query);
                    data.result.forEach((app, index) => {
                        results += `🔗 [Enlace ${index + 1}](${app.link || PLAYSTORE_LINK_UNAVAILABLE})\n`;
                    });
                    await conn.reply(m.chat, results.trim(), m);
                    await m.react('✅');
                }
                catch (error) {
                    console.error('Error al realizar la búsqueda:', error);
                    await m.react('❌');
                    conn.reply(m.chat, PLAYSTORE_ERROR(error.message), m);
                }
            }
        }
    ];
}
export default PlaystoreSearchPlugin;
//# sourceMappingURL=buscador-playstore.js.map