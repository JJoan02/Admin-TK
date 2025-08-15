export default handler;
declare function handler(m: any, { command, usedPrefix, conn, args, text }: {
    command: any;
    usedPrefix: any;
    conn: any;
    args: any;
    text: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let limit: number;
}
//# sourceMappingURL=descargas-yt_playV2.d.ts.map