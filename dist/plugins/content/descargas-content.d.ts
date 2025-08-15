export namespace instagramStalkMessages {
    function noUsername(usedPrefix: any, command: any): string;
    function noProfileFound(username: any): string;
    function profileInfo(profileData: any): string;
    function errorGeneral(usedPrefix: any, command: any): string;
    let downloadError: string;
    let processError: string;
}
export namespace tiktokMessages {
    function usage(usedPrefix: any, command: any): string;
    let noDownload: string;
    let noVideoNoWatermark: string;
    let errorProcessing: string;
    function noSearchResults(query: any): string;
    let errorSearching: string;
}
export namespace apkDownload {
    export function noText(usedPrefix: any, command: any): string;
    export let downloading: string;
    export let name: string;
    export let size: string;
    let _package: string;
    export { _package as package };
    export let lastUpdate: string;
}
export namespace spotifyDownload {
    export function noText_1(usedPrefix: any, command: any): string;
    export { noText_1 as noText };
    export function notFound(text: any): string;
    export let title: string;
    export let artist: string;
    export let duration: string;
    export let spotifyLink: string;
    let errorProcessing_1: string;
    export { errorProcessing_1 as errorProcessing };
}
//# sourceMappingURL=descargas-content.d.ts.map