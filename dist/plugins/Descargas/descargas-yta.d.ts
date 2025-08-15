export default handler;
declare function handler(m: any, { text, conn, args, usedPrefix, command }: {
    text: any;
    conn: any;
    args: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=descargas-yta.d.ts.map