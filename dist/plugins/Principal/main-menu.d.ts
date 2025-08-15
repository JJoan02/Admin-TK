export default handler;
declare function handler(m: any, { conn, usedPrefix: _p, __dirname, args, command }: {
    conn: any;
    usedPrefix: any;
    __dirname: any;
    args: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
    let exp: number;
}
//# sourceMappingURL=main-menu.d.ts.map