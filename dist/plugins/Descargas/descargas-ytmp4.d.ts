export default handler;
declare function handler(m: any, { conn, command, text, usedPrefix }: {
    conn: any;
    command: any;
    text: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=descargas-ytmp4.d.ts.map