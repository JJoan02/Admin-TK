export default handler;
declare function handler(m: any, { conn, args, command, usedPrefix }: {
    conn: any;
    args: any;
    command: any;
    usedPrefix: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let group: boolean;
    let admin: boolean;
}
//# sourceMappingURL=ff-scrim.d.ts.map