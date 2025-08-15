export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let rowner: boolean;
    let command: RegExp;
}
//# sourceMappingURL=herramientas-nowa.d.ts.map