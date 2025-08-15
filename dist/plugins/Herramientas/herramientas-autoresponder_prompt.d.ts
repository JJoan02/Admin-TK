export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command, isOwner, isAdmin, isROwner }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
    isOwner: any;
    isAdmin: any;
    isROwner: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
}
//# sourceMappingURL=herramientas-autoresponder_prompt.d.ts.map