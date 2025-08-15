export default handler;
declare function handler(m: any, { conn, isAdmin, isOwner, args, usedPrefix, command }: {
    conn: any;
    isAdmin: any;
    isOwner: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: RegExp;
    let botAdmin: boolean;
    let group: boolean;
    let admin: boolean;
}
//# sourceMappingURL=grupo-config_time.d.ts.map