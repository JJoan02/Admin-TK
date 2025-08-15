export default handler;
declare function handler(m: any, { conn, usedPrefix, command }: {
    conn: any;
    usedPrefix: any;
    command: any;
}): Promise<any>;
declare namespace handler {
    let command: RegExp;
    let admin: boolean;
    let group: boolean;
}
//# sourceMappingURL=grupo-nsfwHora.d.ts.map