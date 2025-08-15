export default handler;
declare function handler(m: any, { conn, usedPrefix, command, args }: {
    conn: any;
    usedPrefix: any;
    command: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-instagram.d.ts.map