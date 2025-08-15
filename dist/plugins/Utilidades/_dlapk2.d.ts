export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command, isOwner }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
    isOwner: any;
}): Promise<void>;
declare namespace handler {
    let command: string[];
    let group: boolean;
}
//# sourceMappingURL=_dlapk2.d.ts.map