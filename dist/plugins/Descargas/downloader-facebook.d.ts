export default handler;
declare function handler(m: any, { text, conn, args, usedPrefix, command }: {
    text: any;
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let estrellas: number;
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=downloader-facebook.d.ts.map