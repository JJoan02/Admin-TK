export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let tags: string[];
    let help: string[];
}
//# sourceMappingURL=tools-setmenu.d.ts.map