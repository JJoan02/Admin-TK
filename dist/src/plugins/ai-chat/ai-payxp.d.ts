declare function handler(m: any, { conn, args, usedPrefix, command }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    var before: (m: any) => Promise<any>;
    var help: string[];
    var tags: string[];
    var command: string[];
    var register: boolean;
}
export default handler;
//# sourceMappingURL=ai-payxp.d.ts.map