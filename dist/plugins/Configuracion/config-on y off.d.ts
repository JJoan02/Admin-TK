export default handler;
declare function handler(m: any, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text }: {
    conn: any;
    usedPrefix: any;
    command: any;
    args: any;
    isOwner: any;
    isAdmin: any;
    isROwner: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=config-on%20y%20off.d.ts.map