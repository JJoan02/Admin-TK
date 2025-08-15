export default handler;
declare function handler(m: any, { conn, args, command, participants }: {
    conn: any;
    args: any;
    command: any;
    participants: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let tag: string[];
    let admin: boolean;
    let group: boolean;
}
//# sourceMappingURL=tools-restrict.d.ts.map