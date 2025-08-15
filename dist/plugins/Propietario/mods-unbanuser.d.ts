export default handler;
declare function handler(m: any, { conn, args, text, usedPrefix, command }: {
    conn: any;
    args: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let command: string[];
    let tags: string[];
    let rowner: boolean;
}
//# sourceMappingURL=mods-unbanuser.d.ts.map