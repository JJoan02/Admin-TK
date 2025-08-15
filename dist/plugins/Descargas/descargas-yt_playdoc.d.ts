export default handler;
declare function handler(m: any, { conn, command, args, text, usedPrefix }: {
    conn: any;
    command: any;
    args: any;
    text: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=descargas-yt_playdoc.d.ts.map