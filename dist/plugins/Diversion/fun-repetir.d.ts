export default handler;
declare function handler(m: any, { conn, args, participants, isAdmin, isBotAdmin }: {
    conn: any;
    args: any;
    participants: any;
    isAdmin: any;
    isBotAdmin: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let group: boolean;
    let admin: boolean;
}
//# sourceMappingURL=fun-repetir.d.ts.map