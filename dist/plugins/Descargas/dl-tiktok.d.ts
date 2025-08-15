export default handler;
declare function handler(m: any, { conn, text, args, usedPrefix, command }: {
    conn: any;
    text: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=dl-tiktok.d.ts.map