export default handler;
declare function handler(m: any, { conn, args, usedPrefix }: {
    conn: any;
    args: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: string[];
    let register: boolean;
}
//# sourceMappingURL=start-unreg.d.ts.map