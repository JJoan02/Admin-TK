export default handler;
declare function handler(m: any, { conn, usedPrefix, command, text, args }: {
    conn: any;
    usedPrefix: any;
    command: any;
    text: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=search-tiktok.d.ts.map