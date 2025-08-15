import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { LYRICS_NO_TITLE, LYRICS_NOT_FOUND, LYRICS_HEADER, LYRICS_TITLE, LYRICS_ARTIST, LYRICS_BODY, LYRICS_ERROR } from '../../content/busqueda/lyrics-responses';
class LyricsPlugin {
    name = "LyricsPlugin";
    commands = [
        {
            name: "lyrics",
            alias: [],
            desc: "Busca letras de canciones.",
            category: "Busqueda",
            react: "🎶",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text) {
                    return conn.sendMessage(m.chat, { text: LYRICS_NO_TITLE });
                }
                try {
                    const apiUrl = `https://some-random-api.com/lyrics?title=${encodeURIComponent(text)}`;
                    const res = await fetch(apiUrl);
                    if (!res.ok) {
                        throw await res.text();
                    }
                    const json = await res.json();
                    if (!json.lyrics) {
                        return conn.sendMessage(m.chat, { text: LYRICS_NOT_FOUND(text) });
                    }
                    let messageText = LYRICS_HEADER;
                    messageText += LYRICS_TITLE(json.title || text);
                    messageText += LYRICS_ARTIST(json.author || 'Unknown');
                    messageText += LYRICS_BODY(json.lyrics);
                    await conn.sendMessage(m.chat, { text: messageText });
                }
                catch (error) {
                    console.error('Error in lyrics command:', error);
                    await conn.sendMessage(m.chat, { text: LYRICS_ERROR(text) });
                }
            }
        }
    ];
}
export default LyricsPlugin;
//# sourceMappingURL=lyrics.js.map