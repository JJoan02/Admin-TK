export default handler;
declare function handler(m: any, { conn, text, args, usedPrefix, command }: {
    conn: any;
    text: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let rowner: boolean;
}
//# sourceMappingURL=propietario(a)-add-owner.d.ts.map