export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-add.d.ts.map