import { Command } from '../../core/CommandBus.js';
import { busquedaContent } from '../content/busqueda-content.js';
async function spotifyxv(query) {
    console.warn("Using placeholder for spotifyxv. Original implementation needed.");
    return [];
}
async function obtenerAlbumInfo(albumName) {
    console.warn("Using placeholder for obtenerAlbumInfo. Original implementation needed.");
    return { imagen: null };
}
function timestamp(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${(parseInt(seconds) < 10 ? '0' : '')}${seconds}`;
}
export class SpotifySearchCommand extends Command {
    constructor() {
        super();
        this.name = 'spotifysearch';
        this.description = 'Busca canciones en Spotify o descarga desde un enlace.';
        this.commands = ['spotifysearch'];
        this.tags = ['buscador'];
        this.help = ['spotifysearch <name> or spotify <url>'];
        this.limit = 1;
        this.level = 3;
        this.register = true;
    }
    async execute(context) {
        const { conn, m, text, usedPrefix, command } = context;
        if (!text) {
            return conn.reply(m.chat, busquedaContent.spotifySearch.noText(usedPrefix, command), m);
        }
        try {
            let resultados = await spotifyxv(text);
            if (!resultados || resultados.length === 0) {
                return conn.reply(m.chat, busquedaContent.spotifySearch.notFound(text), m);
            }
            let res = resultados.map((v, i) => {
                let duracion = timestamp(v.duracion);
                return `[${i + 1}]
❤️꙰༻ *TÍTULO:* ${v.nombre}
⁖👤༻ *ARTISTAS:* ${v.artistas.join(', ')}
⁖🗂️༻ *ÁLBUM:* ${v.album}
⁖⏰༻ *DURACIÓN:* ${duracion}
📎꙰༻ *LINK:* ${v.url}

••••••••••••••••••••••••••••••••••••
`;
            }).join('\n');
            if (res) {
                if (!global.spotifyList) {
                    global.spotifyList = [];
                }
                if (global.spotifyList[0]?.from == m.sender) {
                    global.spotifyList.splice(0, global.spotifyList.length);
                }
                global.spotifyList = resultados.map((v) => `${v.nombre} - ${v.artistas.join(', ')}`);
                const albumInfo = await obtenerAlbumInfo(resultados[0].album);
                conn.sendMessage(m.chat, { image: { url: albumInfo.imagen }, caption: res }, { quoted: m });
            }
        }
        catch (e) {
            console.error(e);
            await conn.reply(m.chat, busquedaContent.spotifySearch.error(global.lenguajeGB.smsMalError3(), global.lenguajeGB.smsMensError2(), usedPrefix, command, global.wm), m);
        }
    }
}
//# sourceMappingURL=SpotifySearchCommand.js.map