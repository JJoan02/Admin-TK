export default handler;
declare function handler(m: any, { conn, args, usedPrefix, command, DevMode }: {
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
    DevMode: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=fun-casino.d.ts.map