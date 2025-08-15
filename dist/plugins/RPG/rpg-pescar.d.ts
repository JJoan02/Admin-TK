export default handler;
declare function handler(m: any, { conn, command, args, usedPrefix }: {
    conn: any;
    command: any;
    args: any;
    usedPrefix: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
}
//# sourceMappingURL=rpg-pescar.d.ts.map