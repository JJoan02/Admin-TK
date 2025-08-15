export default handler;
declare function handler(m: any, { conn, command, args }: {
    conn: any;
    command: any;
    args: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let tags: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=tools-ssweb.d.ts.map