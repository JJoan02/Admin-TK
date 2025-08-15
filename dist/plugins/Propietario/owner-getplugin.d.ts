export default handler;
declare function handler(m: any, { conn, isROwner, usedPrefix, command, text }: {
    conn: any;
    isROwner: any;
    usedPrefix: any;
    command: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let rowner: boolean;
}
//# sourceMappingURL=owner-getplugin.d.ts.map