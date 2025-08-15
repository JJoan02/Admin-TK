export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let help: string[];
    let command: RegExp;
}
//# sourceMappingURL=group-unbanurse.d.ts.map