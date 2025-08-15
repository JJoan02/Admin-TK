export default handler;
declare function handler(m: any, { conn, text, usedPrefix, command }: {
    conn: any;
    text: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-banuser.d.ts.map