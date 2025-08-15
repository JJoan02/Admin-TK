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
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let botAdmin: boolean;
    let group: boolean;
}
//# sourceMappingURL=gc-config_time.d.ts.map