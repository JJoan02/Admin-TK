export default handler;
declare function handler(m: any, { conn, args, command, usedPrefix }: {
    conn: any;
    args: any;
    command: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=tools-sticker.d.ts.map