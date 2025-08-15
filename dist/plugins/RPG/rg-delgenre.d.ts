export default handler;
declare function handler(m: any, { conn, command, usedPrefix }: {
    conn: any;
    command: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
}
//# sourceMappingURL=rg-delgenre.d.ts.map