import BuscarLetra from '../../lib/lyricsgg.js';
import { GOOGLE_LYRICS_NO_TEXT, GOOGLE_LYRICS_HEADER, GOOGLE_LYRICS_TITLE, GOOGLE_LYRICS_ARTIST, GOOGLE_LYRICS_ALBUM, GOOGLE_LYRICS_DATE, GOOGLE_LYRICS_GENRES, GOOGLE_LYRICS_ERROR_REPORT } from '../../content/busqueda/google-lyrics-responses';
class GoogleLyricsPlugin {
    name = "GoogleLyricsPlugin";
    commands = [
        {
            name: "google-lyrics",
            alias: ["lyricsgoogle", "googlelyrics"],
            desc: "Busca letras de canciones en Google.",
            category: "Busqueda",
            react: "🎶",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
                if (!teks) {
                    return m.reply(GOOGLE_LYRICS_NO_TEXT(global.lenguajeGB.smsAvisoMG(), global.mid.smsMalused));
                }
                try {
                    let res = await BuscarLetra(text);
                    let { titulo, artista, albulm, fecha, Generos, letra } = res;
                    let txt = GOOGLE_LYRICS_HEADER;
                    txt += GOOGLE_LYRICS_TITLE(titulo);
                    txt += GOOGLE_LYRICS_ARTIST(artista);
                    txt += GOOGLE_LYRICS_ALBUM(albulm);
                    txt += GOOGLE_LYRICS_DATE(fecha);
                    txt += GOOGLE_LYRICS_GENRES(Generos);
                    txt += `${letra}`;
                    m.reply(txt);
                }
                catch (e) {
                    console.error(e);
                    await conn.reply(m.chat, GOOGLE_LYRICS_ERROR_REPORT(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), global.fkontak, m);
                }
            }
        }
    ];
}
export default GoogleLyricsPlugin;
//# sourceMappingURL=GoogleLyricsCommand.js.map