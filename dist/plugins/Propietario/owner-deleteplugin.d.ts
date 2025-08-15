export default handler;
declare function handler(m: any, { conn, usedPrefix: _p, command, __dirname, args, text }: {
    conn: any;
    usedPrefix: any;
    command: any;
    __dirname: any;
    args: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=owner-deleteplugin.d.ts.map