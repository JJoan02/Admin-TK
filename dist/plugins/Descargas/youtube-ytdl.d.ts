export default handler;
declare function handler(m: any, { conn, args, command }: {
    conn: any;
    args: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let premium: boolean;
}
//# sourceMappingURL=youtube-ytdl.d.ts.map