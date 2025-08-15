import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from 'node-fetch';
import { TIKTOK_MP3_NO_URL, TIKTOK_MP3_INVALID_URL, TIKTOK_MP3_API_ERROR, TIKTOK_MP3_API_ERROR_DETAILS, TIKTOK_MP3_NO_AUDIO_FOUND, TIKTOK_MP3_DOWNLOAD_ERROR } from '../../content/descargas/tiktok-mp3-responses';
class TiktokMp3Plugin {
    name = "TiktokMp3Plugin";
    commands = [
        {
            name: "tiktokmp3",
            alias: ["ttmp3"],
            desc: "Descarga el audio de un video de TikTok.",
            category: "Descargas",
            react: "🎵",
            execute: async (Yaka, m, { conn, args, usedPrefix, command }) => {
                if (!args[0]) {
                    return m.reply(TIKTOK_MP3_NO_URL(usedPrefix, command));
                }
                const tiktokUrl = args[0];
                if (!tiktokUrl.match(/tiktok\.com\//i)) {
                    return m.reply(TIKTOK_MP3_INVALID_URL);
                }
                try {
                    m.react('🕑');
                    const internalApiUrl = `http://localhost:3000/api/tiktok/audio?url=${encodeURIComponent(tiktokUrl)}`;
                    const response = await fetch(internalApiUrl);
                    if (!response.ok) {
                        const errorJson = await response.json();
                        return m.reply(TIKTOK_MP3_DOWNLOAD_ERROR(errorJson.error || 'Error desconocido'));
                    }
                    const json = await response.json();
                    const aud = json.result.audioUrl;
                    const title = json.result.title || 'Audio de TikTok';
                    await conn.sendMessage(m.chat, {
                        audio: { url: aud },
                        mimetype: 'audio/mpeg',
                        fileName: `${title}.mp3`,
                        ptt: false
                    }, { quoted: m });
                    m.react('✅');
                }
                catch (e) {
                    console.error('Error al obtener el audio de TikTok:', e);
                    m.reply(TIKTOK_MP3_DOWNLOAD_ERROR(e.message));
                    m.react('✖️');
                }
            }
        }
    ];
}
export default TiktokMp3Plugin;
//# sourceMappingURL=barboza-tiktok_mp3.js.map