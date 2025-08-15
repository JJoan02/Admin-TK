export default handler;
declare function handler(m: any, { text, args, usedPrefix, command, conn }: {
    text: any;
    args: any;
    usedPrefix: any;
    command: any;
    conn: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=afk-afk.d.ts.map