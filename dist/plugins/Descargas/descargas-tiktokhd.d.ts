export default handler;
declare function handler(m: any, { conn, usedPrefix, command, text, args }: {
    conn: any;
    usedPrefix: any;
    command: any;
    text: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=descargas-tiktokhd.d.ts.map