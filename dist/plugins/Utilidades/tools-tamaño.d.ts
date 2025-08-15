export default handler;
declare function handler(m: any, { conn, usedPrefix, command, args, text }: {
    conn: any;
    usedPrefix: any;
    command: any;
    args: any;
    text: any;
}): Promise<any>;
declare namespace handler {
    let tags: string[];
    let help: string[];
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=tools-tama%C3%B1o.d.ts.map