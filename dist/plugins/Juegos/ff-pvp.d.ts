export default handler;
declare function handler(m: any, { conn, command, args, usedPrefix }: {
    conn: any;
    command: any;
    args: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    function reaction(reaction: any, { conn }: {
        conn: any;
    }): Promise<void>;
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=ff-pvp.d.ts.map