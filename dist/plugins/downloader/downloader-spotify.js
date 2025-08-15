import pkg from 'sanzy-spotifydl';
let { downloadTrack, downloadAlbum, search } = pkg;
import fetch from 'node-fetch';
import pkg2 from 'fluid-spotify.js';
let { Spotify } = pkg2;
import { downloaderMessages } from '../../content/downloader-content.js';
import config from '../../../config/config.js';
let handler = async (m, { conn, text }) => {
    if (!text)
        return m.reply(downloaderMessages.spotifyUsage, m);
    let isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+)/i);
    if (!isSpotifyUrl && !text)
        return m.reply(downloaderMessages.spotifyUsage, m);
    let user = global.AdminTK_db.data.users[m.sender];
    await m.react('🕓');
    try {
        if (isSpotifyUrl) {
            if (isSpotifyUrl[2] === 'album') {
                let album = await downloadAlbum(isSpotifyUrl[0]);
                let img = await (await fetch(`${album.metadata.cover}`)).buffer();
                let txt = `${downloaderMessages.spotifyDownloadHeader}\n\n`;
                txt += `\t✩  ${downloaderMessages.spotifyAlbum} : ${album.metadata.title}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyArtist} :${album.metadata.artists}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyPublished} : ${album.metadata.releaseDate}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyTotalTracks} : ${album.trackList.length}\n\n`;
                txt += `${downloaderMessages.spotifySendingAudio}`;
                await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);
                for (let i = 0; i < album.trackList.length; i++) {
                    await m.conn.sendFile(m.chat, album.trackList[i].audioBuffer, album.trackList[i].metadata.name + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
                    await m.react('✅');
                }
            }
            else if (isSpotifyUrl[2] === 'track') {
                let track = await downloadTrack(isSpotifyUrl[0]);
                let dlspoty = track.audioBuffer;
                let img = await (await fetch(`${track.imageUrl}`)).buffer();
                let txt = `${downloaderMessages.spotifyDownloadHeader}\n\n`;
                txt += `\t✩   ${downloaderMessages.spotifyTitle} : ${track.title}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyArtist} : ${track.artists}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyDuration} : ${track.duration}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyAlbum} : ${track.album.name}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyPublished} : ${track.album.releasedDate}\n\n`;
                txt += `${downloaderMessages.spotifySendingAudio}`;
                await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);
                await m.conn.sendFile(m.chat, dlspoty, track.title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
                await m.react('✅');
            }
            else if (isSpotifyUrl[2] === 'playlist') {
                let infos = new Spotify({
                    clientID: config.api.spotifyClientId,
                    clientSecret: config.api.spotifyClientSecret,
                });
                let playlistId = isSpotifyUrl[0].split('/').pop();
                let playlistInfoByID = await infos.getPlaylist(playlistId);
                let tracks = playlistInfoByID.tracks.items;
                let img = await (await fetch(`${playlistInfoByID.images[0].url}`)).buffer();
                let txt = `${downloaderMessages.spotifyDownloadHeader}\n\n`;
                txt += `\t✩   ${downloaderMessages.spotifyPlaylist} : ${playlistInfoByID.name}\n`;
                txt += `\t✩   ${downloaderMessages.spotifyTotalTracks} : ${tracks.length}\n\n`;
                txt += `${downloaderMessages.spotifySendingAudio}`;
                await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);
                let target = m.chat;
                if (m.isGroup && tracks.length > 20) {
                    target = m.sender;
                }
                for (let i = 0; i < tracks.length; i++) {
                    let track = await downloadTrack(tracks[i].track.external_urls.spotify);
                    await m.conn.sendFile(m.chat, track.audioBuffer, tracks[i].track.name + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
                    await m.react('✅');
                }
            }
        }
        else {
            let searchTrack = await downloadTrack(text);
            let dlspoty = searchTrack.audioBuffer;
            let img = await (await fetch(`${searchTrack.imageUrl}`)).buffer();
            let txt = `${downloaderMessages.spotifyDownloadHeader}\n\n`;
            txt += `\t✩   ${downloaderMessages.spotifyTitle} : ${searchTrack.title}\n`;
            txt += `\t✩   ${downloaderMessages.spotifyArtist} : ${searchTrack.artists}\n`;
            txt += `\t✩   ${downloaderMessages.spotifyDuration} : ${searchTrack.duration}\n`;
            txt += `\t✩   ${downloaderMessages.spotifyAlbum} : ${searchTrack.album.name}\n`;
            txt += `\t✩   ${downloaderMessages.spotifyPublished} : ${searchTrack.album.releasedDate}\n\n`;
            txt += `${downloaderMessages.spotifySendingAudio}`;
            await m.conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);
            await m.conn.sendFile(m.chat, dlspoty, searchTrack.title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
            await m.react('✅');
        }
    }
    catch (e) {
        console.error(e);
        await m.react('✖️');
    }
};
handler.tags = ['downloader'];
handler.help = ['spotify'];
handler.command = ['spotify'];
handler.register = true;
export default handler;
//# sourceMappingURL=downloader-spotify.js.map