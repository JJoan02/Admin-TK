export default handler;
declare function handler(m: any, { conn, usedPrefix, text, args, command }: {
    conn: any;
    usedPrefix: any;
    text: any;
    args: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=info-creadora.d.ts.map