export default handler;
declare function handler(m: any, { args, conn, command, usedPrefix }: {
    args: any;
    conn: any;
    command: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let owner: boolean;
}
//# sourceMappingURL=owner-setppbot.d.ts.map