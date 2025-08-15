export namespace busquedaContent {
    namespace animeFLVSearch {
        let description: string;
        let noText: string;
        let notFound: string;
        function resultTitle(animeTitle: any): string;
        function resultScore(animeScore: any): string;
        let resultScoreUnavailable: string;
        function resultId(animeId: any): string;
        function carouselBody(text: any): string;
        let carouselFooter: string;
        function error(e: any): string;
        let errorSearch: string;
    }
    namespace appleMusicSearch {
        let description_1: string;
        export { description_1 as description };
        export function noText_1(usedPrefix: any, command: any): string;
        export { noText_1 as noText };
        export function notFound_1(text: any): string;
        export { notFound_1 as notFound };
        export function resultFormat(index: any, title: any, link: any): string;
        let error_1: string;
        export { error_1 as error };
        let errorSearch_1: string;
        export { errorSearch_1 as errorSearch };
        export let appleMusicSearchError: string;
    }
    namespace dafontSearch {
        let description_2: string;
        export { description_2 as description };
        export function usageError(usedPrefix: any): string;
        export let noQuery: string;
        export function searchResults(query: any, results: any): string;
        export let invalidUrl: string;
        export let urlInaccessible: string;
        export let noDownloadLink: string;
        export let zipFailed: string;
        export let fontSent: string;
        export let noFontsFound: string;
        let errorSearch_2: string;
        export { errorSearch_2 as errorSearch };
        export let errorDownload: string;
        export let errorGetDownloadUrl: string;
        export let errorDownloadFont: string;
        export let errorSendFont: string;
    }
    namespace driveFolderSearch {
        let description_3: string;
        export { description_3 as description };
        export function noUrl(smsAvisoMG: any): string;
        export function invalidUrl_1(smsAvisoMG: any): string;
        export { invalidUrl_1 as invalidUrl };
        let notFound_2: string;
        export { notFound_2 as notFound };
        export let sendingLinks: string;
        let error_2: string;
        export { error_2 as error };
        let errorSearch_3: string;
        export { errorSearch_3 as errorSearch };
    }
    namespace gitHubSearch {
        let description_4: string;
        export { description_4 as description };
        export function noText_2(usedPrefix: any, command: any): string;
        export { noText_2 as noText };
        export function notFound_3(text: any): string;
        export { notFound_3 as notFound };
        export function resultFormat_1(index: any, repo: any): string;
        export { resultFormat_1 as resultFormat };
        export let carouselTitle: string;
        let error_3: string;
        export { error_3 as error };
        let errorSearch_4: string;
        export { errorSearch_4 as errorSearch };
    }
    namespace googleSearch {
        export namespace gitHubSearch_1 {
            let description_5: string;
            export { description_5 as description };
            export function noText_3(usedPrefix: any, command: any): string;
            export { noText_3 as noText };
            export function notFound_4(text: any): string;
            export { notFound_4 as notFound };
            export function resultFormat_2(index: any, repo: any): string;
            export { resultFormat_2 as resultFormat };
            let carouselTitle_1: string;
            export { carouselTitle_1 as carouselTitle };
            let error_4: string;
            export { error_4 as error };
            let errorSearch_5: string;
            export { errorSearch_5 as errorSearch };
        }
        export { gitHubSearch_1 as gitHubSearch };
        export namespace googleSearch_1 {
            let description_6: string;
            export { description_6 as description };
            export function noQuery_1(smsAvisoMG: any, usedPrefix: any, command: any): string;
            export { noQuery_1 as noQuery };
            export function notFound_5(query: any): string;
            export { notFound_5 as notFound };
            export function resultsHeader(query: any): string;
            export function resultFormat_3(title: any, url: any, description: any): string;
            export { resultFormat_3 as resultFormat };
            export let externalAdReplyTitle: string;
            export let externalAdReplyBody: string;
            export function error_5(smsMalError3: any, smsMensError2: any, usedPrefix: any, command: any, wm: any): string;
            export { error_5 as error };
            let errorSearch_6: string;
            export { errorSearch_6 as errorSearch };
        }
        export { googleSearch_1 as googleSearch };
        export namespace lyrics {
            let description_7: string;
            export { description_7 as description };
            export function noQuery_2(smsAvisoMG: any, smsMalused3: any, usedPrefix: any, command: any): string;
            export { noQuery_2 as noQuery };
            export function caption(smsYT1: any, title: any, smsYT2: any, artist: any, smsYT3: any, lyrics: any): string;
            export let downloadButton: string;
            export let searchMenuButton: string;
            export let backToMenuButton: string;
            export function error_6(smsMalError3: any, smsMensError2: any, usedPrefix: any, command: any, wm: any): string;
            export { error_6 as error };
            let errorSearch_7: string;
            export { errorSearch_7 as errorSearch };
        }
        export namespace mangaDexSearch {
            let description_8: string;
            export { description_8 as description };
            let noText_4: string;
            export { noText_4 as noText };
            let notFound_6: string;
            export { notFound_6 as notFound };
            export function resultTitle_1(mangaTitle: any): string;
            export { resultTitle_1 as resultTitle };
            export function resultId_1(mangaId: any): string;
            export { resultId_1 as resultId };
            export function carouselBody_1(mangaName: any): string;
            export { carouselBody_1 as carouselBody };
            let carouselFooter_1: string;
            export { carouselFooter_1 as carouselFooter };
            export let copyIdButton: string;
            export function error_7(e: any): string;
            export { error_7 as error };
            let errorSearch_8: string;
            export { errorSearch_8 as errorSearch };
        }
        export namespace movieSearch {
            let description_9: string;
            export { description_9 as description };
            export function noText_5(smsAvisoMG: any, smsMalused7: any, usedPrefix: any, command: any): string;
            export { noText_5 as noText };
            export function notFound_7(smsAvisoFG: any, buscador10: any): string;
            export { notFound_7 as notFound };
            export function resultFormat_4(smsYT1: any, title: any, smsYT4: any, link: any): string;
            export { resultFormat_4 as resultFormat };
            export function ads(buscador11: any): string;
            let error_8: string;
            export { error_8 as error };
            let errorSearch_9: string;
            export { errorSearch_9 as errorSearch };
        }
        export namespace spotifySearch {
            let description_10: string;
            export { description_10 as description };
            export function noText_6(smsAvisoMG: any, usedPrefix: any, command: any): string;
            export { noText_6 as noText };
            export function notFound_8(query: any): string;
            export { notFound_8 as notFound };
            export function trackInfo(track: any): string;
            let downloadButton_1: string;
            export { downloadButton_1 as downloadButton };
            export function carouselBody_2(query: any): string;
            export { carouselBody_2 as carouselBody };
            let carouselFooter_2: string;
            export { carouselFooter_2 as carouselFooter };
            export let noAudioFile: string;
            export function songInfo(title: any, quality: any, duration: any): string;
            export let noAlbum: string;
            export function albumInfo(title: any, artists: any, releaseDate: any, totalTracks: any): string;
            export let noPlaylist: string;
            export function playlistInfo(name: any, totalTracks: any): string;
            export function error_9(smsMalError3: any, smsMensError2: any, usedPrefix: any, command: any, wm: any): string;
            export { error_9 as error };
            export let errorGeneral: string;
            export let errorDownloadTrack: string;
            export let errorDownloadAlbum: string;
            export let errorDownloadPlaylist: string;
        }
        export namespace tiktokSearch {
            let description_11: string;
            export { description_11 as description };
            export function noText_7(usedPrefix: any, command: any): string;
            export { noText_7 as noText };
            export function carouselBody_3(text: any): string;
            export { carouselBody_3 as carouselBody };
            let carouselFooter_3: string;
            export { carouselFooter_3 as carouselFooter };
            export function albumCaption(text: any): string;
            export let textListHeader: string;
            export function textListFormat(index: any, title: any, author: any, url: any): string;
            export function notFound_9(text: any): string;
            export { notFound_9 as notFound };
            let error_10: string;
            export { error_10 as error };
            let errorSearch_10: string;
            export { errorSearch_10 as errorSearch };
        }
        export namespace twitterSearch {
            let description_12: string;
            export { description_12 as description };
            let noText_8: string;
            export { noText_8 as noText };
            let notFound_10: string;
            export { notFound_10 as notFound };
            export let header: string;
            export function resultFormat_5(index: any, user: any, post: any, profile: any, user_link: any): string;
            export { resultFormat_5 as resultFormat };
            let error_11: string;
            export { error_11 as error };
            let errorSearch_11: string;
            export { errorSearch_11 as errorSearch };
        }
        export namespace wikipedia {
            let description_13: string;
            export { description_13 as description };
            export function noText_9(smsAvisoMG: any, smsMalused: any, usedPrefix: any, command: any): string;
            export { noText_9 as noText };
            export function notFound_11(text: any): string;
            export { notFound_11 as notFound };
            export function caption_1(buscador9: any, isi: any): string;
            export { caption_1 as caption };
            let externalAdReplyTitle_1: string;
            export { externalAdReplyTitle_1 as externalAdReplyTitle };
            let externalAdReplyBody_1: string;
            export { externalAdReplyBody_1 as externalAdReplyBody };
            export function error_12(smsMalError3: any, smsMensError2: any, usedPrefix: any, command: any, wm: any): string;
            export { error_12 as error };
            let errorSearch_12: string;
            export { errorSearch_12 as errorSearch };
        }
        export namespace youtubeSearch {
            let description_14: string;
            export { description_14 as description };
            export function noUrl_1(smsAvisoMG: any, smsMalused7: any, usedPrefix: any, command: any): string;
            export { noUrl_1 as noUrl };
            export let invalidLink: string;
            export function noTextYts(smsAvisoMG: any): string;
            export let noResults: string;
            export let playTitle: string;
            export function playInfo(title: any, duration: any, published: any, author: any, url: any): string;
            export let playFooter: string;
            export let audioButton: string;
            export let videoButton: string;
            export function listResultsHeader(htki: any, htka: any): string;
            export function listSearchOf(text: any): string;
            export let listAudioHeader: string;
            export let listVideoHeader: string;
            export let listAudioDocHeader: string;
            export let listVideoDocHeader: string;
            export let errorDownloadAudio: string;
            export let errorProcessAudio: string;
            export function docAudioWait(smsAvisoEG: any, additionalText: any): string;
            export let docAudioFail: string;
            export function docAudioCaption(wm: any, smsYT1: any, title: any, smsYT11: any, fileSize: any, vs: any): string;
            export function docVideoWait(smsAvisoEG: any, additionalText: any): string;
            export let docVideoFail: string;
            export function docVideoCaption(wm: any, smsYT1: any, title: any, selectedQuality: any, vs: any): string;
            export let errorDownloadVideo: string;
            export let errorProcessVideo: string;
            let errorGeneral_1: string;
            export { errorGeneral_1 as errorGeneral };
            export function errorReport(smsMalError3: any, smsMensError2: any, usedPrefix: any, command: any, wm: any): string;
            export let errorVideoInfo: string;
            export let errorDetermineLink: string;
            export function errorVideoList(smsAvisoFG: any, smsYT: any, length: any): string;
            export function errorPlaylist(smsAvisoMG: any, smsY2: any, usedPrefix: any, command: any): string;
            export function errorSearch_13(query: any): string;
            export { errorSearch_13 as errorSearch };
            export function ytPlayNoFormat(usedPrefix: any, command: any): string;
            export function ytPlayNoQuery(usedPrefix: any, command: any): string;
            export function ytPlayNoResults(query: any): string;
            export function ytPlayInfo(title: any, duration: any, views: any, author: any, published: any, url: any): string;
            export let ytPlayDownloadError: string;
        }
        export namespace yahooSearch {
            let noText_10: string;
            export { noText_10 as noText };
            export let resultHeader: string;
            export function resultItem(title: any, link: any, snippet: any): string;
            export let errorApi: string;
        }
    }
}
//# sourceMappingURL=busqueda-content.d.ts.map