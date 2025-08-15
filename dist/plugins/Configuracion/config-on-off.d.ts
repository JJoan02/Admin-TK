export default handler;
declare function handler(m: any, { conn, args, isAdmin, isBotAdmin, command }: {
    conn: any;
    args: any;
    isAdmin: any;
    isBotAdmin: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: string[];
    let group: boolean;
    let admin: boolean;
}
//# sourceMappingURL=config-on-off.d.ts.map