export default handler;
declare function handler(m: any, { conn, text, command }: {
    conn: any;
    text: any;
    command: any;
}): Promise<void>;
declare namespace handler {
    let command: RegExp;
    let group: boolean;
    let owner: boolean;
}
//# sourceMappingURL=propietario(a)-leavegc.d.ts.map