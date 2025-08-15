export default handler;
declare function handler(m: any, { conn, usedPrefix, command, args, users, setting }: {
    conn: any;
    usedPrefix: any;
    command: any;
    args: any;
    users: any;
    setting: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let help: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-mediafire.d.ts.map