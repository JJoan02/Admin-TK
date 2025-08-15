import { ICommand, IPluginModule } from '../../types/plugin';
import google from 'google-it';
import axios from 'axios';
import fetch from 'node-fetch';
import { GOOGLE_SEARCH_NO_QUERY, GOOGLE_SEARCH_NOT_FOUND, GOOGLE_SEARCH_RESULTS_HEADER_NEW, GOOGLE_SEARCH_RESULT_FORMAT, GOOGLE_SEARCH_EXTERNAL_AD_REPLY_TITLE, GOOGLE_SEARCH_EXTERNAL_AD_REPLY_BODY, GOOGLE_SEARCH_ERROR_SEARCH, GOOGLE_SEARCH_ERROR_GENERIC } from '../../content/busqueda/google-search-responses';
class GoogleSearchPlugin {
    name = "GoogleSearchPlugin";
    commands = [
        {
            name: "google",
            alias: ["googlef"],
            desc: "Realiza una búsqueda en Google.",
            category: "Busqueda",
            react: "🔍",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                const query = args.join ` `;
                if (!query) {
                    return conn.reply(m.chat, GOOGLE_SEARCH_NO_QUERY(global.lenguajeTK.smsAvisoMG(), usedPrefix, command), m);
                }
                try {
                    await m.react(global.AdminTK_rwait);
                    let results = [];
                    try {
                        const res = await fetch(`https://api.alyachan.dev/api/google?q=${encodeURIComponent(query)}&apikey=Gata-Dios`);
                        const data = await res.json();
                        if (data.status && data.data && data.data.length > 0) {
                            results = data.data.map((result) => ({
                                title: result.title,
                                url: result.formattedUrl || result.url,
                                description: result.snippet || result.description,
                            }));
                        }
                    }
                    catch (apiError) {
                        console.warn(`Fallo en API alyachan.dev: ${apiError.message}`);
                    }
                    if (results.length === 0) {
                        try {
                            const googleItResults = await google({ 'query': query });
                            results = googleItResults.map((result) => ({
                                title: result.title,
                                url: result.link,
                                description: result.snippet,
                            }));
                        }
                        catch (googleItError) {
                            console.warn(`Fallo en google-it: ${googleItError.message}`);
                        }
                    }
                    if (results.length === 0) {
                        await conn.reply(m.chat, GOOGLE_SEARCH_NOT_FOUND(query), m);
                        await m.react(global.AdminTK_error);
                        return;
                    }
                    let teks = GOOGLE_SEARCH_RESULTS_HEADER_NEW(query) + '\n\n';
                    for (let result of results) {
                        teks += GOOGLE_SEARCH_RESULT_FORMAT(result.title, result.url, result.description);
                    }
                    const screenshotUrl = `https://image.thum.io/get/fullpage/https://google.com/search?q=${encodeURIComponent(query)}`;
                    await conn.sendFile(m.chat, screenshotUrl, 'result.png', teks, m, false, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: GOOGLE_SEARCH_EXTERNAL_AD_REPLY_TITLE, body: GOOGLE_SEARCH_EXTERNAL_AD_REPLY_BODY, previewType: 0, thumbnail: global.AdminTK_imagen4, sourceUrl: global.AdminTK_accountsgb } } });
                    await m.react(global.AdminTK_done);
                }
                catch (e) {
                    console.error(`${GOOGLE_SEARCH_ERROR_SEARCH} ${e.message}`);
                    await conn.reply(m.chat, GOOGLE_SEARCH_ERROR_GENERIC(global.lenguajeTK.smsMalError3(), global.lenguajeTK.smsMensError2(), usedPrefix, command, global.AdminTK_wm), m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default GoogleSearchPlugin;
//# sourceMappingURL=GoogleSearchCommand.js.map