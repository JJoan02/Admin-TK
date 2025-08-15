export default handler;
declare function handler(m: any, { conn, args, participants, usedPrefix, command }: {
    conn: any;
    args: any;
    participants: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=owner-delpremsub.d.ts.map