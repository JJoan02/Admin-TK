export default handler;
declare function handler(m: any, { conn, args, usedPrefix, text, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    text: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=dl-mega.d.ts.map