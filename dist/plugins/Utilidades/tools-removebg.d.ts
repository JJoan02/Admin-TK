export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
}
//# sourceMappingURL=tools-removebg.d.ts.map