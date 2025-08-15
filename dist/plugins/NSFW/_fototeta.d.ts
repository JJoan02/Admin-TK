export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let customPrefix: RegExp;
    let command: RegExp;
}
//# sourceMappingURL=_fototeta.d.ts.map