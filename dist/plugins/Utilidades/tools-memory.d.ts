export default handler;
declare function handler(m: any, { conn, command, args, isPremium }: {
    conn: any;
    command: any;
    args: any;
    isPremium: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
}
//# sourceMappingURL=tools-memory.d.ts.map