export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
}
//# sourceMappingURL=dl-gitclone.d.ts.map