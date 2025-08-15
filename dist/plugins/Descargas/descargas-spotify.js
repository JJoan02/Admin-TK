import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { SPOTIFY_NO_URL, SPOTIFY_INFO, SPOTIFY_ERROR } from '../../content/descargas/spotify-download-responses';
class SpotifyDownloadPlugin {
    name = "SpotifyDownloadPlugin";
    commands = [
        {
            name: "spotify",
            alias: [],
            desc: "Descarga una canción de Spotify.",
            category: "Descargas",
            react: "🎶",
            execute: async (Yaka, m, { conn, text }) => {
                if (!text)
                    return conn.reply(m.chat, SPOTIFY_NO_URL, m);
                await m.react('🕓');
                try {
                    let api = await fetch(`https://api.giftedtech.my.id/api/download/spotifydl?apikey=gifted&url=${text}`);
                    let json = await api.json();
                    let { quality, title, duration, thumbnail, download_url: dl_url } = json.result;
                    let songInfo = SPOTIFY_INFO(title, quality, duration);
                    await m.react('✅');
                    await conn.sendFile(m.chat, thumbnail, 'SpotifyThumbnail.jpg', songInfo, m);
                    await conn.sendMessage(m.chat, {
                        audio: { url: dl_url },
                        fileName: `${title}.mp3`,
                        mimetype: 'audio/mp4'
                    }, { quoted: m });
                }
                catch (error) {
                    console.error(error);
                    conn.reply(m.chat, SPOTIFY_ERROR, m);
                }
            }
        }
    ];
}
export default SpotifyDownloadPlugin;
//# sourceMappingURL=descargas-spotify.js.map