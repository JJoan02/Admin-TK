export default handler;
declare function handler(m: any, { conn, text, command }: {
    conn: any;
    text: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-leavegc.d.ts.map