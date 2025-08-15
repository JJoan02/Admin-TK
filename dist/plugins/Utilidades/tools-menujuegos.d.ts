export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: RegExp;
    let register: boolean;
}
//# sourceMappingURL=tools-menujuegos.d.ts.map