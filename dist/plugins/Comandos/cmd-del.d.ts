export default handler;
declare function handler(m: any, { conn, usedPrefix, text, command }: {
    conn: any;
    usedPrefix: any;
    text: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=cmd-del.d.ts.map