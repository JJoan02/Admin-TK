import { ICommand, IPluginModule } from '../../types/plugin';
import fetch from "node-fetch";
import { ARTIST_DOWNLOAD_ALREADY_DOWNLOADING, ARTIST_DOWNLOAD_NO_ARTIST_NAME, ARTIST_DOWNLOAD_STARTING, ARTIST_DOWNLOAD_NO_RESULTS, ARTIST_DOWNLOAD_SEARCH_ERROR, ARTIST_DOWNLOAD_TRACK_CAPTION, ARTIST_DOWNLOAD_SUCCESS, ARTIST_DOWNLOAD_ERROR_DOWNLOAD_TRACK, ARTIST_DOWNLOAD_ERROR_FETCH_AUDIO } from '../../content/descargas/artist-download-responses';
let isDownloadingArtist = false;
async function downloadTrack(youtubeUrl) {
    const encodedUrl = encodeURIComponent(youtubeUrl);
    const primaryAPI = `https://mahiru-shiina.vercel.app/download/ytmp3?url=${encodedUrl}`;
    const backupAPI = `https://api.vreden.my.id/api/ytmp3?url=${encodedUrl}`;
    let resultJson = null;
    let lastError = null;
    const maxAttempts = 2;
    let usedAPI = 'primary';
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response = await fetch(primaryAPI);
            const json = await response.json();
            if (!json.status || !json.data) {
                throw new Error("Primary API: No se pudo obtener el enlace de descarga.");
            }
            resultJson = json;
            break;
        }
        catch (error) {
            lastError = error;
            if (attempt < maxAttempts)
                continue;
        }
    }
    if (!resultJson) {
        usedAPI = 'backup';
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const response = await fetch(backupAPI);
                const json = await response.json();
                if (json.status !== 200 || !json.result || !json.result.download) {
                    throw new Error("Backup API: No se encontró el enlace de descarga.");
                }
                resultJson = json;
                break;
            }
            catch (error) {
                lastError = error;
                if (attempt < maxAttempts)
                    continue;
            }
        }
    }
    if (!resultJson) {
        throw lastError;
    }
    let downloadUrl, title;
    if (resultJson.data) {
        downloadUrl = resultJson.data.author?.download || resultJson.data.download;
        title = resultJson.data.title || "audio";
    }
    else if (resultJson.result) {
        downloadUrl = resultJson.result.download?.url;
        title = resultJson.result.metadata?.title || "audio";
    }
    else {
        throw new Error(ARTIST_DOWNLOAD_ERROR_DOWNLOAD_TRACK);
    }
    if (!downloadUrl) {
        throw new Error(ARTIST_DOWNLOAD_ERROR_DOWNLOAD_TRACK);
    }
    title = title.replace(/[^\w\s]/gi, '').substring(0, 60);
    let audioBuffer;
    const maxAudioAttempts = 2;
    let audioError = null;
    for (let attempt = 1; attempt <= maxAudioAttempts; attempt++) {
        try {
            const audioResponse = await fetch(downloadUrl);
            if (!audioResponse.ok) {
                throw new Error(ARTIST_DOWNLOAD_ERROR_FETCH_AUDIO(audioResponse.status));
            }
            audioBuffer = await audioResponse.buffer();
            break;
        }
        catch (error) {
            audioError = error;
            if (attempt < maxAudioAttempts) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
    if (!audioBuffer && usedAPI === 'primary') {
        usedAPI = 'backup';
        resultJson = null;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const response = await fetch(backupAPI);
                const json = await response.json();
                if (json.status !== 200 || !json.result || !json.result.download) {
                    throw new Error("Backup API: No se encontró el enlace de descarga.");
                }
                resultJson = json;
                break;
            }
            catch (error) {
                lastError = error;
                if (attempt < maxAttempts)
                    continue;
            }
        }
        if (resultJson && resultJson.result) {
            downloadUrl = resultJson.result.download?.url;
            title = resultJson.result.metadata?.title || "audio";
            if (!downloadUrl)
                throw new Error("No se encontró el enlace de descarga.");
            title = title.replace(/[^\w\s]/gi, '').substring(0, 60);
            for (let attempt = 1; attempt <= maxAudioAttempts; attempt++) {
                try {
                    const audioResponse = await fetch(downloadUrl);
                    if (!audioResponse.ok) {
                        throw new Error(ARTIST_DOWNLOAD_ERROR_FETCH_AUDIO(audioResponse.status));
                    }
                    audioBuffer = await audioResponse.buffer();
                    break;
                }
                catch (error) {
                    audioError = error;
                    if (attempt < maxAudioAttempts) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                }
            }
        }
    }
    if (!audioBuffer) {
        throw audioError;
    }
    return { audioBuffer, title };
}
class ArtistDownloadPlugin {
    name = "ArtistDownloadPlugin";
    commands = [
        {
            name: "artista",
            alias: [],
            desc: "Busca y descarga música por artista.",
            category: "Descargas",
            react: "🎤",
            execute: async (Yaka, m, { conn, text, usedPrefix, command }) => {
                if (command.toLowerCase() !== "artista")
                    return;
                if (isDownloadingArtist) {
                    return conn.sendMessage(m.chat, { text: ARTIST_DOWNLOAD_ALREADY_DOWNLOADING });
                }
                if (!text || text.trim().length === 0) {
                    return conn.sendMessage(m.chat, { text: ARTIST_DOWNLOAD_NO_ARTIST_NAME(usedPrefix) });
                }
                isDownloadingArtist = true;
                await conn.sendMessage(m.chat, { text: ARTIST_DOWNLOAD_STARTING });
                const searchUrl = `https://delirius-apiofc.vercel.app/search/searchtrack?q=${encodeURIComponent(text)}`;
                let searchResults;
                try {
                    const response = await fetch(searchUrl);
                    searchResults = await response.json();
                    if (!Array.isArray(searchResults) || searchResults.length === 0) {
                        isDownloadingArtist = false;
                        return conn.sendMessage(m.chat, { text: ARTIST_DOWNLOAD_NO_RESULTS });
                    }
                }
                catch (error) {
                    isDownloadingArtist = false;
                    return conn.sendMessage(m.chat, { text: ARTIST_DOWNLOAD_SEARCH_ERROR(error.message || "Desconocido") });
                }
                const tracks = searchResults.slice(0, 10);
                for (let i = 0; i < tracks.length; i++) {
                    const track = tracks[i];
                    try {
                        const { audioBuffer, title } = await downloadTrack(track.url);
                        await conn.sendMessage(m.chat, {
                            document: audioBuffer,
                            mimetype: "audio/mpeg",
                            fileName: `${title}.mp3`,
                            caption: ARTIST_DOWNLOAD_TRACK_CAPTION(track.title, track.artist, track.album)
                        }, { quoted: m });
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                    catch (error) {
                        console.error(`Error al descargar "${track.title}":`, error);
                        continue;
                    }
                }
                isDownloadingArtist = false;
                await conn.sendMessage(m.chat, { text: ARTIST_DOWNLOAD_SUCCESS });
            }
        }
    ];
}
export default ArtistDownloadPlugin;
//# sourceMappingURL=descargas-artis.js.map