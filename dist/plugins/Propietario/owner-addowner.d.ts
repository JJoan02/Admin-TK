export default handler;
declare function handler(m: any, { conn, text, args, usedPrefix, command }: {
    conn: any;
    text: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-addowner.d.ts.map