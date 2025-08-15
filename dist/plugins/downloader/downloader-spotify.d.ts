export default handler;
declare function handler(m: any, { conn, text }: {
    conn: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=downloader-spotify.d.ts.map