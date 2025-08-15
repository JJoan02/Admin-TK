export default handler;
declare function handler(m: any, { conn, usedPrefix, command, isOwner, isAdmin, isBotAdmin, isPremium, isGroup }: {
    conn: any;
    usedPrefix: any;
    command: any;
    isOwner: any;
    isAdmin: any;
    isBotAdmin: any;
    isPremium: any;
    isGroup: any;
}): Promise<any>;
declare namespace handler {
    function before(m: any, context: any): Promise<void>;
}
//# sourceMappingURL=restrict-commands.d.ts.map